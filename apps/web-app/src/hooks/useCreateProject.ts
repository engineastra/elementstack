// useCreateProject.ts
import { useReducer, Reducer, useContext } from 'react';
import { defaultStateReducer } from '../utils/commonUtils';
import Regex from '@elementstack/shared-assets/Regex';
import { getFolderTemplate } from '@elementstack/shared-assets/Template';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Routes from '../constants/Routes';
import { v4 as uuidv4 } from 'uuid';
import {
  ProjectDetailsContext,
  ProjectDetailsInitialState,
} from '@web-app/contexts/ProjectDetailsProvider';
import { ProjectDetailsSchema } from '@elementstack/shared-assets/Types';

type InitialStateSchema = {
  projectType: string;
  isCreateEnable: boolean;
};

const initialState: InitialStateSchema = {
  projectType: '',
  isCreateEnable: false,
};

type Action = { payload: Partial<InitialStateSchema> };

export const useCreateProject = (
  onClose: () => void,
  projects: Array<ProjectDetailsSchema>
) => {
  const router = useRouter();
  const { setProjectDetails } = useContext(ProjectDetailsContext);
  const [state, dispatch] = useReducer(
    defaultStateReducer as Reducer<InitialStateSchema, Action>,
    initialState
  );
  const { projectType } = state;

  const zodSchema = z.object({
    projectName: z
      .string()
      .regex(Regex.PROJECT_NAME, 'Project name can only be alphanumeric')
      .refine(
        (value) =>
          !projects.some(
            (proj) =>
              proj.name.toLocaleLowerCase() === value.trim().toLocaleLowerCase()
          ), // ✅ Duplicate check
        { message: 'Project name already exists' }
      ),
  });

  const {
    control,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: { projectName: '' },
    mode: 'onChange', // ← ADD THIS
  });
  const projectName = useWatch({
    control,
    name: 'projectName',
  });

  const handleProjectTypeSelection = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const typeValue = e.currentTarget.dataset.type;
    dispatch({ payload: { projectType: typeValue } });
  };

  const handleCreateClick = () => {
    const payload = {
      ...ProjectDetailsInitialState,
      id: uuidv4(),
      name: projectName,
      type: projectType,
    };
    const newRootFolder = getFolderTemplate(projectType, projectName);
    if (!newRootFolder) {
      setError('projectName', {
        message: 'Something went wrong! please try again after some time',
      });
      return;
    }
    newRootFolder.isRoot = true;
    payload.rootFolder = newRootFolder;
    payload.currentSelectedId = payload.rootFolder.id;
    payload.selectedFolderId = payload.rootFolder.id;
    setProjectDetails({ payload });

    router.push(`${Routes.PROJECT}/${payload.id}`);
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
