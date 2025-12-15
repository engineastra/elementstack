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
import { Controller } from 'react-hook-form';

const FolderTree = ({ folder }: { folder: Folder }) => {
  const {
    inputRef,
    control,
    newInputData,
    expanded,
    currentSelectedId,
    handleFileOrFolderSelection,
    onNewFileInputEnter,
    onDragStartFileOrFolder,
    onDragOverFileOrFolder,
    onDropFileOrFolder,
  } = useFolderTree({
    folder,
  });
  return (
    <div
      className={`flex flex-col ${folder.isRoot ? 'flex-1' : ''}`}
      onDrop={(e) => onDropFileOrFolder(e, folder.id)}
      onDragOver={onDragOverFileOrFolder}
    >
      <div
        draggable={!folder.isRoot}
        className="flex items-center gap-2 pt-1 cursor-pointer"
        onClick={() =>
          handleFileOrFolderSelection(folder.id, FsItemType.FOLDER)
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
        <p
          className={`text-[12px] ${
            currentSelectedId === folder.id ? 'text-primary' : ''
          }`}
        >
          {folder.name}
        </p>
      </div>
      {newInputData.isEnabled && newInputData.folderId === folder.id && (
        <div className="flex my-[4px] ml-4 px-1 py-[2px] bg-greenishgrey border border-primary gap-1">
          <Image
            src={newInputData.type === FsItemType.FILE ? fileSvg : folderSvg}
            alt={newInputData.type as string}
            className="w-3 mb-auto pt-[2px]"
          />
          <Controller
            name="newInputName"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <input
                  {...field}
                  ref={inputRef}
                  type="text"
                  className="text-[12px] text-white  outline-none bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onNewFileInputEnter();
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
                onClick={() =>
                  handleFileOrFolderSelection(
                    file.id,
                    FsItemType.FILE,
                    folder.id
                  )
                }
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
                <p
                  className={`text-[12px] ${
                    currentSelectedId === file.id ? 'text-primary' : ''
                  }`}
                >
                  {file.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FolderTree;
