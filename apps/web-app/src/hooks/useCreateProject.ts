// useCreateProject.ts
import { useEffect, useReducer } from 'react';
import { defaultStateReducer } from '../utils/commonUtils';
import Regex from '@elementstack/shared-assets/Regex';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Routes from '../constants/Routes';

const zodSchema = z.object({
  projectName: z
    .string()
    .regex(Regex.PROJECT_NAME, 'Project name can only be alphanumeric'),
});

type FormData = z.infer<typeof zodSchema>;

const initialState: {
  projectType: string;
  isCreateEnable: boolean;
} = {
  projectType: '',
  isCreateEnable: false,
};

export const useCreateProject = (onClose: () => void) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(defaultStateReducer, initialState);
  const { projectType } = state;
  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(zodSchema),
    defaultValues: { projectName: '' },
    mode: 'onChange',
  });
  const { projectName } = getValues();

  const handleProjectNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    let nameValue = e.target.value;
    field.onChange(nameValue);
    return nameValue;
  };

  const handleProjectTypeSelection = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    let typeValue = e.currentTarget.dataset.type;
    dispatch({ payload: { projectType: typeValue } });
  };

  const handleCreateClick = () => {
    const params = new URLSearchParams();
    params.set('name', projectName);
    params.set('type', projectType);

    router.push(`${Routes.PROJECT}/${projectName}?${params.toString()}`);
    onClose();
  };

  return {
    control,
    projectType,
    projectName,
    errors,
    handleProjectNameChange,
    handleProjectTypeSelection,
    handleCreateClick,
  };
};
