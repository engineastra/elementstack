import ProjectBoxSVG from './icons/ProjectBox.svg';
import MachineCodeSVG from './icons/MachineCode.svg';
import ProblemIdeaSVG from './icons/ProblemIdea.svg';
import PeerSVG from './icons/Peer.svg';

export type OptionCardConfig = {
  id: number;
  icon: string;
  title: string;
  bgGrad: string;
  textColor: string;
};

export const OPTION_CARDS: Record<string, OptionCardConfig> = {
  project: {
    id: 1,
    icon: ProjectBoxSVG,
    title: 'Projects',
    bgGrad: 'project-grad',
    textColor: 'project',
  },
  machine: {
    id: 2,
    icon: MachineCodeSVG,
    title: 'Machine Coding',
    bgGrad: 'machine-grad',
    textColor: 'machine',
  },
  problems: {
    id: 3,
    icon: ProblemIdeaSVG,
    title: 'Problems',
    bgGrad: 'problems-grad',
    textColor: 'problems',
  },
  peer: {
    id: 4,
    icon: PeerSVG,
    title: 'Peer Code',
    bgGrad: 'peer-grad',
    textColor: 'peer',
  },
};
