'use client';
import { FILE_TYPE_TO_ICON } from '@elementstack/shared-assets/Constants';
import { FileData, Folder } from '@elementstack/shared-assets/Types';
import fileSvg from '@elementstack/shared-assets/icons/file.svg';
import folderSvg from '@elementstack/shared-assets/icons/folder.svg';
import chevDownSvg from '@elementstack/shared-assets/icons/chevDownWhite.svg';
import chevRightSvg from '@elementstack/shared-assets/icons/chevRightWhite.svg';
import Image from 'next/image';
import { FsItemType } from '@elementstack/shared-assets/Enums';
import { useFolderTree } from '@web-app/hooks/useFolderTree';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Ref } from 'react';

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
  } = useFolderTree({
    folder,
  });
  return (
    <div
      className={`flex flex-col ${folder.isRoot ? 'flex-1' : ''}`}
      onDrop={(e) => onDropFileOrFolder(e, folder)}
      onDragOver={onDragOverFileOrFolder}
    >
      <div
        draggable={!folder.isRoot}
        className="flex items-center gap-2 pt-1 cursor-pointer"
        onClick={(e) =>
          handleFileOrFolderSelection(e, folder.id, FsItemType.FOLDER)
        }
        onDragStart={(e) =>
          onDragStartFileOrFolder(e, {
            movableFileOrFolderId: folder.id,
            movableFileOrFolderParentFolderId: folder.parentFolderId,
            type: FsItemType.FOLDER,
          })
        }
      >
        {!folder.isRoot && (
          <Image
            src={expanded ? chevDownSvg : chevRightSvg}
            alt={`${folder.name}-chev`}
            className="h-[8px] w-[8px]"
          />
        )}
        <Image src={folderSvg} alt={folder.name} />
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
        <div className="flex my-[4px] ml-4 px-1 py-[2px] bg-greenishgrey border border-primary gap-1">
          <Image
            src={newInputData.type === FsItemType.FILE ? fileSvg : folderSvg}
            alt={newInputData.type as string}
            className="w-3 mb-auto pt-[2px]"
          />
          <NewInputField
            name="newInputName"
            ref={inputRef}
            control={control}
            onInputEnter={() => onNewFileInputEnter(folder)}
          />
        </div>
      )}
      {(expanded || folder.isRoot) && (
        <div className="flex flex-col pl-4 h-full">
          {folder.folders.map((subFolder) => {
            return <FolderTree key={subFolder.id} folder={subFolder} />;
          })}
          {folder.files.map((file: FileData) => {
            return (
              <div
                key={file.id}
                draggable
                className="flex gap-2 pt-1 cursor-pointer"
                onClick={(e) => {
                  handleFileOrFolderSelection(
                    e,
                    file.id,
                    FsItemType.FILE,
                    folder.id,
                    file
                  );
                }}
                onDragStart={(e) =>
                  onDragStartFileOrFolder(e, {
                    movableFileOrFolderId: file.id,
                    movableFileOrFolderParentFolderId: file.parentFolderId,
                    type: FsItemType.FILE,
                  })
                }
              >
                <Image
                  src={FILE_TYPE_TO_ICON[file.type] || fileSvg}
                  alt={file.id}
                  className="w-3"
                />
                {renameFileOrFolderObj &&
                renameFileOrFolderObj.id === file.id ? (
                  <div className="flex my-[4px] px-1 py-[2px] bg-greenishgrey border border-primary gap-1">
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
