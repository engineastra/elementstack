import {
  DragEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import {
  FileData,
  Folder,
  ProjectDetailsSchema,
} from '@elementstack/shared-assets/Types';
import { FsItemType } from '@elementstack/shared-assets/Enums';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Regex from '@elementstack/shared-assets/Regex';
import { FILE_TYPE_TO_LANGUAGE } from '@elementstack/shared-assets/Constants';

const zodSchema = z.object({
  newInputName: z
    .string()
    .min(1, 'Enter valid file name')
    .regex(
      Regex.FILE_OR_FOLDER_NAME,
      'Invalid name, only use (a–z, A–Z, 0–9, _, -, .)'
    ),
  renameFileOrFolder: z
    .string()
    .min(1, 'Enter valid file name')
    .regex(
      Regex.FILE_OR_FOLDER_NAME,
      'Invalid name, only use (a–z, A–Z, 0–9, _, -, .)'
    ),
});

type FormData = z.infer<typeof zodSchema>;

type MovableFileOrFolderType = {
  movableFileOrFolderId: string;
  movableFileOrFolderParentFolderId: string;
  type: FsItemType;
};

export const useFolderTree = ({ folder }: { folder: Folder }) => {
  const [expanded, setExpanded] = useState(false);
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const {
    newInputData,
    currentSelectedId,
    rootFolder,
    tabs,
    renameFileOrFolderObj,
    multipleItemsSelected,
  } = projectDetails;
  const {
    control,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(zodSchema),
    defaultValues: { newInputName: '' },
    mode: 'onChange',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const renameFileOrFolderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (folder.isRoot) {
      setProjectDetails({
        payload: {
          currentSelectedId: rootFolder.id,
          selectedFolderId: rootFolder.id,
        },
      });
    }
  }, [folder.isRoot]);

  useEffect(() => {
    setExpanded(folder.isRoot || false);
  }, [folder.isRoot]);

  useEffect(() => {
    if (newInputData.isEnabled) {
      if (newInputData.folderId === folder.id) setExpanded(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [newInputData.isEnabled, newInputData.folderId]);

  useEffect(() => {
    if (renameFileOrFolderRef.current) {
      renameFileOrFolderRef.current.focus();
    }
  }, [renameFileOrFolderObj]);

  const handleFileOrFolderSelection = (
    e: MouseEvent<HTMLDivElement>,
    id: string,
    type: FsItemType,
    parentFolderId?: string,
    fileObj?: FileData
  ) => {
    const payload: Partial<ProjectDetailsSchema> = { currentSelectedId: id };
    if (type === FsItemType.FOLDER) {
      setExpanded((prev) => !prev);
      payload.selectedFolderId = id;
    } else if (type === FsItemType.FILE && fileObj) {
      payload.selectedFolderId = parentFolderId;
      const isOpened = tabs.some((file: FileData) => fileObj.id === file.id);
      payload.selectedFile = fileObj;
      if (!isOpened) {
        payload.tabs = [...tabs, fileObj];
      }
    }
    // Multiple Selection on Command Click
    if (e.ctrlKey || e.metaKey) {
      if (multipleItemsSelected.includes(id)) {
        payload.multipleItemsSelected = multipleItemsSelected.filter(
          (mid) => mid != id
        );
      } else {
        payload.multipleItemsSelected = [...multipleItemsSelected, id];
      }
    } else {
      payload.multipleItemsSelected = [id];
    }
    setProjectDetails({ payload });
  };

  const updateFolder = (
    fld: Folder,
    prevId: string,
    searcFolderId: string,
    updateCallback: (fldArg: Folder, prevIdArg: string) => void
  ) => {
    // base condition
    if (fld.id === searcFolderId) {
      updateCallback(fld, prevId);
    }
    fld.folders.forEach((nextFld) => {
      updateFolder(nextFld, fld.id, searcFolderId, updateCallback); // id is in formal '001:file-name'
    });
  };

  const onNewFileInputEnter = () => {
    if (!getValues().newInputName || errors.newInputName?.message) return;
    const newRootFolder = { ...rootFolder };
    updateFolder(
      newRootFolder,
      '',
      newInputData.folderId,
      (fld: Folder, prevId: string) => {
        const newId =
          prevId.split(':')[0] +
          fld.totalItems +
          '-' +
          getValues().newInputName;
        if (newInputData.type === FsItemType.FILE) {
          let newFile: FileData;
          const fileAttrs = getValues().newInputName.split('.');
          if (fileAttrs.length === 1) {
            // text file
            newFile = {
              id: newId,
              name: getValues().newInputName,
              type: 'txt',
              language: 'text',
              value: '',
              parentFolderId: prevId,
            };
          } else {
            const fileExt = fileAttrs.at(-1);
            newFile = {
              id: newId,
              name: getValues().newInputName,
              type: fileExt as string,
              language: FILE_TYPE_TO_LANGUAGE[fileExt as string] || 'text',
              value: '',
              parentFolderId: prevId,
            };
          }
          fld.files.push(newFile); // push new file
        } else if (newInputData.type === FsItemType.FOLDER) {
          const newFolderName = getValues().newInputName;
          const newFolder: Folder = {
            id: newId,
            name: newFolderName,
            files: [],
            folders: [],
            totalItems: 0,
            parentFolderId: prevId,
          };
          fld.folders.push(newFolder);
        }
        fld.totalItems++; // update items count in the folder
        setProjectDetails({
          payload: {
            currentSelectedId: newId,
            rootFolder: newRootFolder,
            newInputData: {
              ...newInputData,
              isEnabled: false,
              type: undefined,
              folderId: '',
            },
          },
        }); // setting current file
      }
    );
    setValue('newInputName', '');
  };

  const onDragStartFileOrFolder = (
    e: DragEvent<HTMLDivElement>,
    movableObj: MovableFileOrFolderType
  ) => {
    e.dataTransfer.setData('application/json', JSON.stringify(movableObj));
  };

  const onDragOverFileOrFolder = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropFileOrFolder = (
    e: DragEvent<HTMLDivElement>,
    dropFolderId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const movableData: MovableFileOrFolderType = JSON.parse(
      e.dataTransfer.getData('application/json')
    );
    const { movableFileOrFolderId, movableFileOrFolderParentFolderId, type } =
      movableData;
    if (type === FsItemType.FILE) {
      updateFolder(
        rootFolder,
        '',
        movableFileOrFolderParentFolderId,
        (fld: Folder, prevId: string) => {
          // fld is the parent folder in from which the dragged file or folder will be removed
          // 1. get file from folder
          const movingFile: FileData | undefined = fld.files.find(
            (file) => file.id === movableFileOrFolderId
          );
          // 2. remove file from fld.files
          fld.files = fld.files.filter(
            (file) => file.id != movableFileOrFolderId
          );
          setProjectDetails({ payload: { rootFolder: { ...rootFolder } } });
          // 3. updating the files inside new dropFolderId
          updateFolder(
            rootFolder,
            '',
            dropFolderId,
            (dropFld: Folder, dropPrev: string) => {
              if (movingFile) {
                movingFile.id =
                  dropPrev + dropFld.totalItems + ':' + movingFile.name;
                movingFile.parentFolderId = dropFolderId;
                dropFld.files.push(movingFile);
                setProjectDetails({
                  payload: { rootFolder: { ...rootFolder } },
                });
              }
            }
          );
        }
      );
    } else if (type === FsItemType.FOLDER) {
      updateFolder(
        rootFolder,
        '',
        movableFileOrFolderParentFolderId,
        (fld: Folder, prevId: string) => {
          // fld is the parent folder in from which the dragged folder will be removed
          // 1. get folder from its current parent folder
          const movingFolder: Folder | undefined = fld.folders.find(
            (file) => file.id === movableFileOrFolderId
          );
          // 2. remove folder from fld.folders
          fld.folders = fld.folders.filter(
            (file) => file.id != movableFileOrFolderId
          );
          setProjectDetails({ payload: { rootFolder: { ...rootFolder } } });
          // 3. updating the folders inside new dropFolderId
          updateFolder(
            rootFolder,
            '',
            dropFolderId,
            (dropFld: Folder, dropPrev: string) => {
              if (movingFolder) {
                movingFolder.id =
                  dropPrev + dropFld.totalItems + ':' + movingFolder.name;
                movingFolder.parentFolderId = dropFolderId;
                dropFld.folders.push(movingFolder);
                setProjectDetails({
                  payload: { rootFolder: { ...rootFolder } },
                });
              }
            }
          );
        }
      );
    }
  };

  const onFileOrFolderNameDoubleClick = (fileOrFolder: FileData | Folder) => {
    setValue('renameFileOrFolder', fileOrFolder.name);
    setProjectDetails({ payload: { renameFileOrFolderObj: fileOrFolder } });
  };

  const handleFileRenameEnter = (file: FileData) => {
    if (getValues().renameFileOrFolder && !errors.renameFileOrFolder?.message) {
      file.name = getValues().renameFileOrFolder;
      file.type = file.name.split('.').at(-1) || 'txt';
      file.language = FILE_TYPE_TO_LANGUAGE[file.type];
      setValue('renameFileOrFolder', '');
      setError('renameFileOrFolder', { message: '' });
      setProjectDetails({
        payload: { renameFileOrFolderObj: null, rootFolder: { ...rootFolder } },
      });
    }
  };

  const handleFolderRenameEnter = (fld: Folder) => {
    if (getValues().renameFileOrFolder && !errors.renameFileOrFolder?.message) {
      fld.name = getValues().renameFileOrFolder;
      setValue('renameFileOrFolder', '');
      setError('renameFileOrFolder', { message: '' });
      setProjectDetails({
        payload: { renameFileOrFolderObj: null, rootFolder: { ...rootFolder } },
      });
    }
  };

  return {
    inputRef,
    control,
    newInputData,
    expanded,
    currentSelectedId,
    renameFileOrFolderObj,
    renameFileOrFolderRef,
    multipleItemsSelected,
    handleFileOrFolderSelection,
    handleFileRenameEnter,
    handleFolderRenameEnter,
    onNewFileInputEnter,
    onDragStartFileOrFolder,
    onDragOverFileOrFolder,
    onDropFileOrFolder,
    onFileOrFolderNameDoubleClick,
  };
};
