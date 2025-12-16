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
    selectedFolderId,
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
      if (selectedFolderId === folder.id) setExpanded(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [newInputData.isEnabled, selectedFolderId]);

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

  const getFolderById = (fldId: string, root = rootFolder): Folder | null => {
    // base condition
    if (root.id === fldId) {
      return root;
    }
    let output: Folder | null = null;
    root.folders.forEach((nextFld) => {
      if (output === null) {
        output = getFolderById(fldId, nextFld);
      }
    });
    return output;
  };

  const onNewFileInputEnter = (folderObj: Folder) => {
    if (!getValues().newInputName || errors.newInputName?.message) {
      if (!getValues().newInputName) {
        setProjectDetails({
          payload: {
            newInputData: {
              isEnabled: false,
              type: undefined,
            },
          },
        }); // empty input handelling
      }
      return;
    }

    const newId =
      folderObj.id.split(':')[0] +
      folderObj.totalItems +
      '-' +
      getValues().newInputName;
    const newTabs = [...tabs];
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
          parentFolderId: folderObj.id,
        };
      } else {
        const fileExt = fileAttrs.at(-1);
        newFile = {
          id: newId,
          name: getValues().newInputName,
          type: fileExt as string,
          language: FILE_TYPE_TO_LANGUAGE[fileExt as string] || 'text',
          value: '',
          parentFolderId: folderObj.id,
        };
      }
      newTabs.push(newFile);
      folderObj.files.push(newFile); // push new file
    } else if (newInputData.type === FsItemType.FOLDER) {
      const newFolderName = getValues().newInputName;
      const newFolder: Folder = {
        id: newId,
        name: newFolderName,
        files: [],
        folders: [],
        totalItems: 0,
        parentFolderId: folderObj.id,
      };
      folderObj.folders.push(newFolder);
    }
    folderObj.totalItems++; // update items count in the folder
    setProjectDetails({
      payload: {
        currentSelectedId: newId,
        rootFolder: { ...rootFolder },
        multipleItemsSelected: [newId],
        selectedFolderId:
          newInputData.type === FsItemType.FOLDER ? newId : folderObj.id,
        newInputData: {
          ...newInputData,
          isEnabled: false,
          type: undefined,
        },
        tabs: newTabs,
      },
    }); // setting current file

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
    dropFolder: Folder
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const movableData: MovableFileOrFolderType = JSON.parse(
      e.dataTransfer.getData('application/json')
    );
    const { movableFileOrFolderId, movableFileOrFolderParentFolderId, type } =
      movableData;
    const prevFolder = getFolderById(movableFileOrFolderParentFolderId);
    if (type === FsItemType.FILE && prevFolder) {
      // 1. get file from previous folder
      const movingFile: FileData | undefined = prevFolder.files.find(
        (file) => file.id === movableFileOrFolderId
      );
      // 2. remove file from previous folder files
      prevFolder.files = prevFolder.files.filter(
        (file) => file.id != movableFileOrFolderId
      );
      // 3. updating the files inside new dropFolderId
      if (movingFile) {
        movingFile.id =
          dropFolder.id + dropFolder.totalItems + ':' + movingFile.name;
        movingFile.parentFolderId = dropFolder.id;
        dropFolder.files.push(movingFile);
        setProjectDetails({
          payload: { rootFolder: { ...rootFolder } },
        });
      }
    } else if (type === FsItemType.FOLDER && prevFolder) {
      // 1. get folder from its current parent folder
      const movingFolder: Folder | undefined = prevFolder.folders.find(
        (file) => file.id === movableFileOrFolderId
      );
      // 2. remove folder from fld.folders
      prevFolder.folders = prevFolder.folders.filter(
        (file) => file.id != movableFileOrFolderId
      );
      // 3. updating the folders inside new dropFolderId
      if (movingFolder) {
        movingFolder.id =
          dropFolder.id + dropFolder.totalItems + ':' + movingFolder.name;
        movingFolder.parentFolderId = dropFolder.id;
        dropFolder.folders.push(movingFolder);
        setProjectDetails({
          payload: { rootFolder: { ...rootFolder } },
        });
      }
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
    selectedFolderId,
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
