import type { Extension } from '@codemirror/state';

import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { go } from '@codemirror/lang-go';
import { rust } from '@codemirror/lang-rust';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { php } from '@codemirror/lang-php';


export interface EditorLanguage {
  key: string;
  label: string;
  extensions: string[];
  aliases?: string[];
  mimeTypes?: string[];
  loader: () => Extension;
}

export const LANGUAGES: Record<string, EditorLanguage> = {
  javascript: {
    key: 'javascript',
    label: 'JavaScript',
    extensions: ['js', 'mjs', 'cjs', 'jsx'],
    aliases: ['js', 'jsx'],
    loader: () =>
      javascript({
        jsx: true,
      }),
  },

  typescript: {
    key: 'typescript',
    label: 'TypeScript',
    extensions: ['ts', 'tsx'],
    aliases: ['ts', 'tsx'],
    loader: () =>
      javascript({
        typescript: true,
        jsx: true,
      }),
  },

  python: {
    key: 'python',
    label: 'Python',
    extensions: ['py'],
    loader: () => python(),
  },

  java: {
    key: 'java',
    label: 'Java',
    extensions: ['java'],
    loader: () => java(),
  },

  cpp: {
    key: 'cpp',
    label: 'C++',
    extensions: ['c', 'cpp', 'cc', 'cxx', 'h'],
    aliases: ['c++'],
    loader: () => cpp(),
  },

  go: {
    key: 'go',
    label: 'Go',
    extensions: ['go'],
    loader: () => go(),
  },

  rust: {
    key: 'rust',
    label: 'Rust',
    extensions: ['rs'],
    loader: () => rust(),
  },

  html: {
    key: 'html',
    label: 'HTML',
    extensions: ['html', 'htm'],
    loader: () => html(),
  },

  css: {
    key: 'css',
    label: 'CSS',
    extensions: ['css'],
    loader: () => css(),
  },

  json: {
    key: 'json',
    label: 'JSON',
    extensions: ['json'],
    loader: () => json(),
  },

  markdown: {
    key: 'markdown',
    label: 'Markdown',
    extensions: ['md', 'markdown'],
    loader: () => markdown(),
  },

  sql: {
    key: 'sql',
    label: 'SQL',
    extensions: ['sql'],
    loader: () => sql(),
  },

  xml: {
    key: 'xml',
    label: 'XML',
    extensions: ['xml'],
    loader: () => xml(),
  },

  php: {
    key: 'php',
    label: 'PHP',
    extensions: ['php'],
    loader: () => php(),
  },
};

export function getLanguageByExtension(ext: string) {
  const normalized = ext.replace('.', '').toLowerCase();
  return Object.values(LANGUAGES).find((lang) =>
    lang.extensions.includes(normalized)
  );
}
