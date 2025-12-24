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
    textColor: 'project-500',
    pathName: 'projects',
  },
  machine: {
    id: 2,
    icon: MachineCodeSVG,
    title: 'Machine Coding',
    bgGrad: 'machine-grad',
    textColor: 'machine-500',
    pathName: 'machine-code',
  },
  problems: {
    id: 3,
    icon: ProblemIdeaSVG,
    title: 'DSA Problems',
    bgGrad: 'problems-grad',
    textColor: 'problems-500',
    pathName: 'problems',
  },
  peer: {
    id: 4,
    icon: PeerSVG,
    title: 'Peer Code',
    bgGrad: 'peer-grad',
    textColor: 'peer-500',
    pathName: 'peercode',
  },
};

export const COMMON_COLORS = {
  primary: '#71f163',
  backgroundAccent: '#050816',
  backgroundAccentTransparent: '#050816af',
  card: '#0B1020',
  pannel: '#111827',
  primaryText: '#F9FAFB',
  secondaryText: '#9CA3AF',
  disabled: '#4B5563',
  divider: '#1F2933',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  project: { 500: '#f38a8d' },
  machine: { 500: '#B69FE9' },
  problems: { 500: '#7EBBF8' },
  peer: { 500: '#22C55E' },
  greenishgrey: '#1F2933',
  codeMirrorBg: '#002351',
  ts: '#2c78c7',
  js: '#F6DE22',
  tsx: '#2cbef5',
  jsx: '#f99e04',
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

export const TOPICS_TO_FEATURES: Array<{
  id: string;
  topic: string;
  features: string[];
}> = [
  {
    id: 't1-state-management',
    topic: 'State Management',
    features: [
      'State Management',
      'Complex State',
      'Global State',
      'Context API',
      'Field State Management',
      'Flexible State',
    ],
  },
  {
    id: 't2-data-persistence',
    topic: 'Data Persistence & Storage',
    features: [
      'Persistence',
      'Data Caching',
      'Offline Support',
      'Auto-save',
      'History',
    ],
  },
  {
    id: 't3-crud-data-ops',
    topic: 'CRUD & Data Operations',
    features: [
      'CRUD Operations',
      'Edit/Delete',
      'Category Management',
      'Cart Management',
      'Vote Tracking',
      'Quiz Management',
    ],
  },
  {
    id: 't4-ui-interactions',
    topic: 'User Interaction & Input Handling',
    features: [
      'Interactivity',
      'Hover Effects',
      'Click-outside Detection',
      'Touch Support',
      'Touch Gestures',
      'Swipe Gestures',
      'Smooth Dragging',
    ],
  },
  {
    id: 't5-keyboard-access',
    topic: 'Keyboard & Accessibility',
    features: [
      'Keyboard Navigation',
      'Keyboard Support',
      'Keyboard Shortcuts',
      'Accessibility',
      'Focus Trap',
      'ARIA Support',
    ],
  },
  {
    id: 't6-animations-motion',
    topic: 'Animations & Motion',
    features: [
      'Animations',
      'Smooth Animations',
      'Slide Animations',
      'Smooth Animation',
      'CSS Animation',
      'Backdrop',
    ],
  },
  {
    id: 't7-performance',
    topic: 'Performance Optimization',
    features: [
      'Performance',
      'Virtual Scrolling',
      'Lazy Loading',
      'IntersectionObserver',
      'Image Optimization',
    ],
  },
  {
    id: 't8-search-filtering',
    topic: 'Search, Filtering & Sorting',
    features: [
      'Filtering',
      'Search',
      'Search Filtering',
      'Advanced Search',
      'Sorting/Filtering',
      'Debounced Search',
      'Date Filtering',
    ],
  },
  {
    id: 't9-api-network',
    topic: 'API & Network Integration',
    features: [
      'API Integration',
      'WebSocket Integration',
      'Real-time Updates',
      'Geolocation',
      'Language Detection',
    ],
  },
  {
    id: 't10-error-loading',
    topic: 'Error & Loading Handling',
    features: [
      'Error Handling',
      'Loading States',
      'Error Display',
      'Progress Tracking',
    ],
  },
  {
    id: 't11-drag-drop',
    topic: 'Drag & Drop Systems',
    features: [
      'Drag & Drop',
      'Nested Items',
      'Smart Positioning',
      'Flexible Positioning',
    ],
  },
  {
    id: 't12-forms-validation',
    topic: 'Forms & Validation',
    features: [
      'Custom Hooks',
      'Async Validation',
      'Reusability',
      'Validation Schemas',
    ],
  },
  {
    id: 't13-navigation-layout',
    topic: 'Navigation & Layout',
    features: [
      'Responsive Design',
      'Responsive',
      'Smart Ellipsis',
      'Boundary Handling',
      'Dynamic Generation',
      'Multiple Directions',
    ],
  },
  {
    id: 't14-media',
    topic: 'Media & Rich Content',
    features: [
      'Video API',
      'Audio API',
      'Subtitles',
      'Visualization',
      'Image Gallery',
      'Full-screen Display',
    ],
  },
  {
    id: 't15-editor-tools',
    topic: 'Editors & Developer Tools',
    features: [
      'Syntax Highlighting',
      'Line Numbers',
      'Live Preview',
      'Toolbar',
      'Custom Styling',
    ],
  },
  {
    id: 't16-charts-analytics',
    topic: 'Charts & Analytics',
    features: [
      'Data Visualization',
      'Results Visualization',
      'Progress Charts',
      'Statistics',
      'Results Analysis',
    ],
  },
  {
    id: 't17-notifications',
    topic: 'Notifications & Feedback',
    features: ['Notifications', 'Auto-dismiss', 'Stacking', 'Message Status'],
  },
  {
    id: 't18-security-utils',
    topic: 'Security & Utilities',
    features: [
      'Password Generation',
      'Strength Indicator',
      'Copy Functionality',
      'File Validation',
    ],
  },
  {
    id: 't19-productivity',
    topic: 'Productivity Features',
    features: [
      'Undo/Redo',
      'Focus Mode',
      'Recurring Tasks',
      'Priority System',
      'Statistics',
    ],
  },
  {
    id: 't20-deployment-meta',
    topic: 'Export, Deployment & Meta',
    features: [
      'Export Functionality',
      'Export/Deploy',
      'Theme Support',
      'SEO Optimization',
      'Customization',
      'Multiple Templates',
    ],
  },
];
