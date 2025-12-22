import {
  DragEvent,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
import { getFolderById } from '@web-app/utils/projectUtils';

type MovableFileOrFolderType = {
  movableFileOrFolderId: string;
  movableFileOrFolderParentFolderId: string;
  type: FsItemType;
};

const createSchema = (folder: Folder) => {
  return z.object({
    newInputName: z
      .string()
      .min(1, 'Enter valid file name')
      .regex(
        Regex.FILE_OR_FOLDER_NAME,
        'Invalid name, only use (a–z, A–Z, 0–9, _, -, .)'
      )
      .refine(
        (value) =>
          !(
            folder.files.some(
              (file) =>
                file.name.toLocaleLowerCase() ===
                value.trim().toLocaleLowerCase()
            ) ||
            folder.folders.some(
              (fld) =>
                fld.name.toLocaleLowerCase() ===
                value.trim().toLocaleLowerCase()
            )
          ), // ✅ Duplicate check
        { message: 'Name already exists' }
      ),

    renameFileOrFolder: z
      .string()
      .min(1, 'Enter valid file name')
      .regex(
        Regex.FILE_OR_FOLDER_NAME,
        'Invalid name, only use (a–z, A–Z, 0–9, _, -, .)'
      )
      .refine(
        (value) =>
          !(
            folder.files.some(
              (file) =>
                file.name.toLocaleLowerCase() ===
                value.trim().toLocaleLowerCase()
            ) ||
            folder.folders.some(
              (fld) =>
                fld.name.toLocaleLowerCase() ===
                value.trim().toLocaleLowerCase()
            )
          ), // ✅ Duplicate check
        { message: 'Name already exists' }
      ),
  });
};

export const useFolderTree = (folder: Folder) => {
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
    type: projectType,
  } = projectDetails;

  const zodSchema = useMemo(() => createSchema(folder), [folder]);

  const {
    control,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: { newInputName: '' },
    mode: 'onChange',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const renameFileOrFolderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newInputData.isEnabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newInputData]);

  useEffect(() => {
    if (renameFileOrFolderRef.current) {
      renameFileOrFolderRef.current.focus();
    }
  }, [renameFileOrFolderObj]);

  const handleFileOrFolderSelection = (args: {
    e: MouseEvent<HTMLDivElement>;
    fileObj?: FileData | undefined;
    folderObj?: Folder | undefined;
  }) => {
    const { e, fileObj, folderObj } = args;
    const payload: Partial<ProjectDetailsSchema> = {};
    if (folderObj) {
      folderObj.isExpanded = folderObj.isRoot ? true : !folderObj.isExpanded;
      payload.selectedFolderId = folderObj.id;
      payload.currentSelectedId = folderObj.id;
    } else if (fileObj) {
      payload.selectedFolderId = fileObj.parentFolderId;
      payload.currentSelectedId = fileObj.id;
      const isOpened = tabs.some((file: FileData) => fileObj.id === file.id);
      payload.selectedFileId = fileObj.id;
      if (!isOpened) {
        payload.tabs = [...tabs, fileObj];
      }
    }
    // Multiple Selection on Command Click
    if (e.ctrlKey || e.metaKey) {
      if (multipleItemsSelected.includes(payload.currentSelectedId as string)) {
        payload.multipleItemsSelected = multipleItemsSelected.filter(
          (mid) => mid != (payload.currentSelectedId as string)
        );
      } else {
        payload.multipleItemsSelected = [
          ...multipleItemsSelected,
          payload.currentSelectedId as string,
        ];
      }
    } else {
      payload.multipleItemsSelected = [payload.currentSelectedId as string];
    }
    setProjectDetails({ payload });
  };

  const onNewFileOrFolderInputEnter = (folderObj: Folder) => {
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
      ':' +
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
          extention: 'txt',
          language: 'text',
          value: '',
          parentFolderId: folderObj.id,
        };
      } else {
        const fileExt = fileAttrs.at(-1);
        newFile = {
          id: newId,
          name: getValues().newInputName,
          extention: fileExt as string,
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
        isExpanded: true,
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
    if (dropFolder.id.startsWith(movableFileOrFolderId.split(':')[0])) return;
    const prevFolder = getFolderById(
      movableFileOrFolderParentFolderId,
      rootFolder
    );
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
        dropFolder.isExpanded = true;
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
        dropFolder.isExpanded = true;
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
      file.extention = file.name.split('.').at(-1) || 'txt';
      file.language = FILE_TYPE_TO_LANGUAGE[file.extention];
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
    currentSelectedId,
    renameFileOrFolderObj,
    renameFileOrFolderRef,
    multipleItemsSelected,
    selectedFolderId,
    projectType,
    handleFileOrFolderSelection,
    handleFileRenameEnter,
    handleFolderRenameEnter,
    onNewFileOrFolderInputEnter,
    onDragStartFileOrFolder,
    onDragOverFileOrFolder,
    onDropFileOrFolder,
    onFileOrFolderNameDoubleClick,
  };
};
