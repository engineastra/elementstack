// useCreateProject.ts
import { useReducer, Reducer } from 'react';
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

type InitialStateSchema = {
  projectType: string;
  isCreateEnable: boolean;
};

const initialState: InitialStateSchema = {
  projectType: '',
  isCreateEnable: false,
};

type Action = { payload: Partial<InitialStateSchema> };

export const useCreateProject = (onClose: () => void) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(
    defaultStateReducer as Reducer<InitialStateSchema, Action>,
    initialState
  );
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

  const handleProjectTypeSelection = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const typeValue = e.currentTarget.dataset.type;
    dispatch({ payload: { projectType: typeValue } });
  };

  const handleCreateClick = () => {
    const params = new URLSearchParams();
    params.set('type', projectType);

    router.push(`${Routes.PROJECT}/${projectName}?${params.toString()}`);
    onClose();
  };

  return {
    control,
    projectType,
    projectName,
    errors,
    handleProjectTypeSelection,
    handleCreateClick,
  };
};
