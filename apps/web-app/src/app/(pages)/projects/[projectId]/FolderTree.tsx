'use client';
import {
  FILE_TYPE_TO_ICON,
  PROJECT_THEME_BY_TYPE,
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
import { useFolderTree } from '@web-app/hooks/useFolderTree';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Ref } from 'react';
import { iconColor } from '@web-app/utils/commonUtils';

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
      <div className="flex flex-col">
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

const FolderTree = ({ folder }: { folder: Folder }) => {
  const {
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
  } = useFolderTree(folder);
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
            ...iconColor(PROJECT_THEME_BY_TYPE[projectType].text),
          }}
        />
        {renameFileOrFolderObj && renameFileOrFolderObj.id === folder.id ? (
          <div className="flex my-[4px] px-1 py-[2px] bg-greenishgrey border border-primary gap-1">
            <NewInputField
              name="renameFileOrFolder"
              ref={renameFileOrFolderRef}
              control={control}
              onInputEnter={() => handleFolderRenameEnter(folder)}
            />
          </div>
        ) : (
          <p
            className={`text-[12px] ${
              currentSelectedId === folder.id ||
              multipleItemsSelected.includes(folder.id)
                ? 'text-primary'
                : ''
            }`}
            onDoubleClick={() => onFileOrFolderNameDoubleClick(folder)}
          >
            {folder.name}
          </p>
        )}
      </div>
      {newInputData.isEnabled && selectedFolderId === folder.id && (
        <div className="flex my-[4px] ml-4 px-1 py-[2px] bg-greenishgrey border border-primary gap-1 items-center rounded-sm">
          {newInputData.type === FsItemType.FILE ? (
            <FileIcon
              color="warning"
              sx={{
                fontSize: 15,
                ...iconColor(PROJECT_THEME_BY_TYPE[projectType].text),
              }}
            />
          ) : (
            <FolderIcon
              color="warning"
              sx={{
                fontSize: 15,
                ...iconColor(PROJECT_THEME_BY_TYPE[projectType].text),
              }}
            />
          )}
          <NewInputField
            name="newInputName"
            ref={inputRef}
            control={control}
            onInputEnter={() => onNewFileOrFolderInputEnter(folder)}
          />
        </div>
      )}
      {folder.isExpanded && (
        <div className="flex flex-col pl-4 h-full">
          {folder.folders.map((subFolder) => {
            return <FolderTree key={subFolder.id} folder={subFolder} />;
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
                      ...iconColor(PROJECT_THEME_BY_TYPE[projectType].text),
                    }}
                  />
                )}
                {renameFileOrFolderObj &&
                renameFileOrFolderObj.id === file.id ? (
                  <div className="flex my-[4px] px-1 py-[2px] bg-greenishgrey border border-primary gap-1 rounded-sm">
                    <NewInputField
                      name="renameFileOrFolder"
                      ref={renameFileOrFolderRef}
                      control={control}
                      onInputEnter={() => handleFileRenameEnter(file)}
                    />
                  </div>
                ) : (
                  <p
                    className={`text-[12px] ${
                      currentSelectedId === file.id ||
                      multipleItemsSelected.includes(file.id)
                        ? 'text-primary'
                        : ''
                    }`}
                    onDoubleClick={() => onFileOrFolderNameDoubleClick(file)}
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

export default FolderTree;
