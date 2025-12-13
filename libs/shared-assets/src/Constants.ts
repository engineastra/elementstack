import ProjectBoxSVG from './icons/ProjectBox.svg';
import MachineCodeSVG from './icons/MachineCode.svg';
import ProblemIdeaSVG from './icons/ProblemIdea.svg';
import PeerSVG from './icons/Peer.svg';
import tsxSVG from './icons/tsx.svg';
import tsSVG from './icons/ts.svg';
import jsxSVG from './icons/jsx.svg';
import jsSVG from './icons/js.svg';
// import htmlSVG from './icons/html.svg';
import nodeSVG from './icons/node.svg';

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

export type CreateProjectOptionsConfig = {
  id: number;
  icon: string;
  title: string;
};

export const CREATE_PROJECT_OPTIONS: Record<
  string,
  CreateProjectOptionsConfig
> = {
  tsx: {
    id: 1,
    icon: tsxSVG,
    title: 'React + Typescript',
  },
  jsx: {
    id: 2,
    icon: jsxSVG,
    title: 'React + Javascript',
  },
  ts: {
    id: 3,
    icon: tsSVG,
    title: 'Typescript',
  },
  js: {
    id: 4,
    icon: jsSVG,
    title: 'Javascript',
  },
  node: {
    id: 5,
    icon: nodeSVG,
    title: 'Node.js',
  },
};
