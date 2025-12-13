import { useState } from 'react';

export const useProject = () => {
  const [enableCreateModel, setEnableCretateModel] = useState(false);
  return {
    enableCreateModel,
    onOpenCreateModel: () => setEnableCretateModel(true),
    onCloseCreateModel: () => setEnableCretateModel(false),
  };
};
