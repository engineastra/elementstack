'use client';
import {
  COMMON_COLORS,
  FILE_TYPE_TO_ICON,
} from '@elementstack/shared-assets/Constants';
import { FileData, Folder } from '@elementstack/shared-assets/Types';
import {
  ChevronRight,
  ExpandMore,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import { FsItemType } from '@elementstack/shared-assets/Enums';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Ref } from 'react';
import { iconColor } from '@web-app/utils/commonUtils';
import { useMachineFileSystem } from '@web-app/hooks/useMachineFileSystem';

type NewInputFieldPropType<T extends FieldValues> = {
  name: Path<T>;
  ref?: Ref<HTMLInputElement>;
  control: Control<T>;
  onInputEnter: () => void;
};

const NewInputField = <T extends FieldValues>({
  name,
  ref,
  control,
  onInputEnter,
}: NewInputFieldPropType<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <div className="flex flex-col bg-greenishgrey px-2 py-1 rounded-md">
        <input
          {...field}
          ref={ref}
          type="text"
          className="text-[12px] text-white  outline-none bg-transparent"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onInputEnter();
            }
          }}
        />
        {fieldState.error && (
          <p className="text-error text-[8px] italic font-medium">
            {fieldState.error.message}
          </p>
        )}
      </div>
    )}
  />
);

const MachineFolderTree = ({ folder }: { folder: Folder }) => {
  const {
    inputRef,
    control,
    multipleItemsSelected,
    treeItemSelectionId,
    selectedFolderId,
    nameChangeInputData,
    handleFileOrFolderSelection,
    onDragStartFileOrFolder,
    onDragOverFileOrFolder,
    onDropFileOrFolder,
    onFileOrFolderNameDoubleClick,
    onNameChangeEnter,
  } = useMachineFileSystem({ folder });
  return (
    <div
      className={`flex flex-col ${folder.isRoot ? 'flex-1' : ''}`}
      onDrop={(e) => onDropFileOrFolder(e, folder)}
      onDragOver={onDragOverFileOrFolder}
    >
      <div
        draggable={!folder.isRoot}
        className="flex items-center pt-1 cursor-pointer"
        onClick={(e) => handleFileOrFolderSelection({ e, folderObj: folder })}
        onDragStart={(e) =>
          onDragStartFileOrFolder(e, {
            movableFileOrFolderId: folder.id,
            movableFileOrFolderParentFolderId: folder.parentFolderId,
            type: FsItemType.FOLDER,
          })
        }
      >
        {!folder.isRoot && (
          <>
            {folder.isExpanded ? (
              <ExpandMore color="warning" sx={{ fontSize: 15 }} />
            ) : (
              <ChevronRight sx={{ fontSize: 15 }} />
            )}
          </>
        )}
        <FolderIcon
          color="warning"
          sx={{
            fontSize: 15,
            marginRight: '0.5rem',
            ...iconColor(COMMON_COLORS.machine[500]),
          }}
        />
        {nameChangeInputData.toggle && nameChangeInputData.id === folder.id ? (
          <NewInputField
            name="nameChangeInput"
            ref={inputRef}
            control={control}
            onInputEnter={onNameChangeEnter}
          />
        ) : (
          <p
            className={`text-[12px] ${
              treeItemSelectionId === folder.id ||
              multipleItemsSelected.includes(folder.id)
                ? 'text-machine-500'
                : ''
            }`}
            onDoubleClick={() =>
              onFileOrFolderNameDoubleClick(
                folder.id,
                FsItemType.FOLDER,
                folder.name
              )
            }
          >
            {folder.name}
          </p>
        )}
      </div>
      {nameChangeInputData.toggle &&
        nameChangeInputData.isNew &&
        selectedFolderId === folder.id && (
          <div className="flex my-[4px] ml-4 px-2 py-[2px] bg-greenishgrey rounded-xl gap-1 items-center">
            {nameChangeInputData.type === FsItemType.FILE ? (
              <FileIcon
                sx={{ fontSize: 15, ...iconColor(COMMON_COLORS.machine[500]) }}
              />
            ) : (
              <FolderIcon
                sx={{ fontSize: 15, ...iconColor(COMMON_COLORS.machine[500]) }}
              />
            )}
            <NewInputField
              name="nameChangeInput"
              ref={inputRef}
              control={control}
              onInputEnter={onNameChangeEnter}
            />
          </div>
        )}
      {folder.isExpanded && (
        <div className="flex flex-col pl-4 h-full">
          {folder.folders.map((subFolder) => {
            return <MachineFolderTree key={subFolder.id} folder={subFolder} />;
          })}
          {folder.files.map((file: FileData) => {
            return (
              <div
                key={file.id}
                draggable
                className="flex pl-[15px] gap-2 pt-1 cursor-pointer items-center"
                onClick={(e) => {
                  handleFileOrFolderSelection({ e, fileObj: file });
                }}
                onDragStart={(e) =>
                  onDragStartFileOrFolder(e, {
                    movableFileOrFolderId: file.id,
                    movableFileOrFolderParentFolderId: file.parentFolderId,
                    type: FsItemType.FILE,
                  })
                }
              >
                {FILE_TYPE_TO_ICON[file.extention] ? (
                  <Image
                    src={FILE_TYPE_TO_ICON[file.extention]}
                    alt={file.id}
                    className="w-[15px] h-[12px]"
                  />
                ) : (
                  <FileIcon
                    color="warning"
                    sx={{
                      fontSize: 15,
                      ...iconColor(COMMON_COLORS.machine[500]),
                    }}
                  />
                )}
                {nameChangeInputData.toggle &&
                nameChangeInputData.id === file.id ? (
                  <NewInputField
                    name="nameChangeInput"
                    ref={inputRef}
                    control={control}
                    onInputEnter={onNameChangeEnter}
                  />
                ) : (
                  <p
                    className={`text-[12px] ${
                      treeItemSelectionId === file.id ||
                      multipleItemsSelected.includes(file.id)
                        ? 'text-machine-500'
                        : ''
                    }`}
                    onDoubleClick={() =>
                      onFileOrFolderNameDoubleClick(
                        file.id,
                        FsItemType.FILE,
                        file.name
                      )
                    }
                  >
                    {file.name}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MachineFolderTree;
