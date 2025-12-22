import { deleteProjectFromLocalStorageById } from '@web-app/utils/projectUtils';
import { Dispatch, SetStateAction, useState } from 'react';

export const useProject = ({
  selectedProjects,
  setSelectedProjects,
}: {
  selectedProjects: Array<string>;
  setSelectedProjects: Dispatch<Array<string> | SetStateAction<Array<string>>>;
}) => {
  const [enableCreateModel, setEnableCretateModel] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);

  const onDeleteProjects = () => {
    selectedProjects.forEach((id) => {
      deleteProjectFromLocalStorageById(id);
    });
    setDeletePopUp(false);
    setSelectedProjects([]);
  };

  const onDiscardProjects = () => {
    setDeletePopUp(false);
    setSelectedProjects([]);
  };

  return {
    deletePopUp,
    enableCreateModel,
    onOpenCreateModel: () => setEnableCretateModel(true),
    onCloseCreateModel: () => setEnableCretateModel(false),
    onDeleteProjects,
    onDiscardProjects,
    setDeletePopUp,
  };
};
