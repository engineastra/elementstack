import {
  DragEvent,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  FileData,
  Folder,
  MachineQuestionData,
} from '@elementstack/shared-assets/Types';
import { FsItemType } from '@elementstack/shared-assets/Enums';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Regex from '@elementstack/shared-assets/Regex';
import { getFolderById } from '@web-app/utils/projectUtils';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';

type MovableFileOrFolderType = {
  movableFileOrFolderId: string;
  movableFileOrFolderParentFolderId: string;
  type: FsItemType;
};

const createSchema = (folder: Folder) => {
  return z.object({
    nameChangeInput: z
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

export const useMachineFileSystem = ({ folder }: { folder: Folder }) => {
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  const {
    metaData,
    rootFolder,
    multipleItemsSelected,
    selectedFolderId,
    treeItemSelectionId,
    nameChangeInputData,
  } = machineQuestionDetails;

  const zodSchema = useMemo(() => createSchema(folder), [folder]);
  const formObj = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: { nameChangeInput: '' },
    mode: 'onChange',
  });

  const values = formObj.watch();
  const { errors } = formObj.formState;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const handleInputOutsideClick = (e: Event) => {
        if (e.target !== inputRef.current) {
          setMachineQuestionDetails({
            payload: {
              nameChangeInputData: {
                id: '',
                type: '',
                toggle: false,
                isNew: true,
              },
            },
          });
        }
      };
      document.body.addEventListener('click', handleInputOutsideClick);
      return () =>
        document.body.removeEventListener('click', handleInputOutsideClick);
    }
  }, [nameChangeInputData]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [nameChangeInputData]);

  const onFileOrFolderNameDoubleClick = (
    id: string,
    type: FsItemType,
    name: string
  ) => {
    formObj.setValue('nameChangeInput', name);
    setMachineQuestionDetails({
      payload: {
        nameChangeInputData: { id, type, toggle: true, isNew: false },
      },
    });
  };

  const onNameChangeEnter = () => {
    if (values.nameChangeInput && !errors.nameChangeInput) {
      if (nameChangeInputData.isNew) {
        if (nameChangeInputData.type === FsItemType.FILE) {
          const newFile: FileData = {
            id:
              (folder.id.split(':').at(-1) || '') +
              folder.totalItems +
              ':' +
              values.nameChangeInput,
            name: values.nameChangeInput,
            extention: 'txt',
            language: 'text',
            value: '',
            parentFolderId: folder.id,
            canBeRemoved: true,
          };
          folder.totalItems++; // Important
          folder.files.push(newFile);
        } else if (nameChangeInputData.type === FsItemType.FOLDER) {
          const newFolder: Folder = {
            id:
              (folder.id.split(':').at(-1) || '') +
              folder.totalItems +
              ':' +
              values.nameChangeInput,
            name: values.nameChangeInput,
            files: [],
            folders: [],
            totalItems: 0,
            parentFolderId: folder.id,
            isExpanded: true,
            canBeRemoved: true,
          };
          folder.folders.push(newFolder);
          folder.totalItems++; // Important
        }
      } else {
        if (nameChangeInputData.type === FsItemType.FILE) {
          const thisFile = folder.files.find(
            (file) => file.id === nameChangeInputData.id
          );
          if (thisFile) thisFile.name = values.nameChangeInput;
        } else if (nameChangeInputData.type === FsItemType.FOLDER) {
          const thisFolder = folder.folders.find(
            (fld) => fld.id === nameChangeInputData.id
          );
          if (thisFolder) thisFolder.name = values.nameChangeInput;
        }
      }
      setMachineQuestionDetails({ payload: { rootFolder: { ...rootFolder } } });
    }
    setMachineQuestionDetails({
      payload: {
        nameChangeInputData: { id: '', type: '', toggle: false, isNew: true },
      },
    });
  };

  const handleFileOrFolderSelection = (args: {
    e: MouseEvent<HTMLDivElement>;
    fileObj?: FileData | undefined;
    folderObj?: Folder | undefined;
  }) => {
    const { e, fileObj, folderObj } = args;
    const payload: Partial<MachineQuestionData> = {};
    let canItBeRemoved = false;
    if (folderObj) {
      folderObj.isExpanded = folderObj.isRoot ? true : !folderObj.isExpanded;
      payload.selectedFolderId = folderObj.id;
      payload.treeItemSelectionId = folderObj.id;
      canItBeRemoved = folderObj.canBeRemoved || false;
    } else if (fileObj) {
      payload.selectedFolderId = fileObj.parentFolderId;
      payload.treeItemSelectionId = fileObj.id;
      payload.selectedFileId = fileObj.id;
      canItBeRemoved = fileObj.canBeRemoved || false;
    }
    // Multiple Selection on Command Click
    if (e.ctrlKey || e.metaKey) {
      if (
        multipleItemsSelected.includes(payload.treeItemSelectionId as string)
      ) {
        payload.multipleItemsSelected = multipleItemsSelected.filter(
          (mid) => mid != (payload.treeItemSelectionId as string)
        );
      } else if (canItBeRemoved) {
        payload.multipleItemsSelected = [
          ...multipleItemsSelected,
          payload.treeItemSelectionId as string,
        ];
      }
    } else if (canItBeRemoved) {
      payload.multipleItemsSelected = [payload.treeItemSelectionId as string];
    }
    setMachineQuestionDetails({ payload });
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
        setMachineQuestionDetails({
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
        setMachineQuestionDetails({
          payload: { rootFolder: { ...rootFolder } },
        });
      }
    }
  };

  return {
    inputRef,
    control: formObj.control,
    metaData,
    multipleItemsSelected,
    selectedFolderId,
    treeItemSelectionId,
    nameChangeInputData,
    handleFileOrFolderSelection,
    onDragStartFileOrFolder,
    onDragOverFileOrFolder,
    onDropFileOrFolder,
    onFileOrFolderNameDoubleClick,
    onNameChangeEnter,
  };
};
