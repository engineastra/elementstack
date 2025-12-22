import ProjectBoxSVG from './icons/ProjectBox.svg';
import MachineCodeSVG from './icons/MachineCode.svg';
import ProblemIdeaSVG from './icons/ProblemIdea.svg';
import PeerSVG from './icons/Peer.svg';
import tsxSVG from './icons/tsx.svg';
import tsSVG from './icons/ts.svg';
import jsxSVG from './icons/jsx.svg';
import jsSVG from './icons/js.svg';
import htmlSVG from './icons/html.svg';
import cssSVG from './icons/css.svg';
import jsonSVG from './icons/json.svg';

export type OptionCardConfig = {
  id: number;
  icon: string;
  title: string;
  bgGrad: string;
  textColor: string;
  pathName: string;
};

export const OPTION_CARDS: Record<string, OptionCardConfig> = {
  project: {
    id: 1,
    icon: ProjectBoxSVG,
    title: 'Projects',
    bgGrad: 'project-grad',
    textColor: 'project',
    pathName: 'projects',
  },
  machine: {
    id: 2,
    icon: MachineCodeSVG,
    title: 'Machine Coding',
    bgGrad: 'machine-grad',
    textColor: 'machine',
    pathName: 'machine-code',
  },
  problems: {
    id: 3,
    icon: ProblemIdeaSVG,
    title: 'Problems',
    bgGrad: 'problems-grad',
    textColor: 'problems',
    pathName: 'problems',
  },
  peer: {
    id: 4,
    icon: PeerSVG,
    title: 'Peer Code',
    bgGrad: 'peer-grad',
    textColor: 'peer',
    pathName: 'peercode',
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
    title: 'React(TS)',
  },
  jsx: {
    id: 2,
    icon: jsxSVG,
    title: 'React(JS)',
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
};

export const FILE_TYPE_TO_ICON: Record<string, string> = {
  tsx: tsxSVG,
  jsx: jsxSVG,
  ts: tsSVG,
  js: jsSVG,
  html: htmlSVG,
  css: cssSVG,
  json: jsonSVG,
};

export const FILE_TYPE_TO_LANGUAGE: Record<string, string> = {
  tsx: 'typescript',
  jsx: 'javascript',
  ts: 'typescript',
  js: 'javascript',
  html: 'html',
  css: 'css',
  json: 'json',
};

export const EmptyFile = {
  id: '',
  name: '',
  value: '',
  parentFolderId: '',
  type: '',
  language: '',
};

export const PROJECT_THEME_BY_TYPE: Record<
  string,
  { bg: string; text: string; shadow: string }
> = {
  tsx: {
    bg: '',
    text: '#2cbef5',
    shadow: 'inset 0 0 10px #2cbef5',
  },
  jsx: {
    bg: '',
    text: '#f99e04',
    shadow: 'inset 0 0 10px #f99e04',
  },
  ts: {
    bg: '',
    text: '#2c78c7',
    shadow: 'inset 0 0 10px #2c78c7',
  },
  js: {
    bg: '',
    text: '#F6DE22',
    shadow: 'inset 0 0 10px rgba(246, 223, 29, 0.6)',
  },
  other: {
    bg: '',
    text: '#ff9700',
    shadow: 'inset 0 0 10px #ff9700',
  },
};
