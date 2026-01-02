import type { Extension } from '@codemirror/state';
import { Completion } from '@codemirror/autocomplete';
import {
  javascript,
  scopeCompletionSource as jsScopeCS,
  javascriptLanguage,
} from '@codemirror/lang-javascript';
import {
  python,
  pythonLanguage,
  globalCompletion as pygc,
} from '@codemirror/lang-python';
import { java, javaLanguage } from '@codemirror/lang-java';
import { cpp, cppLanguage } from '@codemirror/lang-cpp';
import { go, goLanguage } from '@codemirror/lang-go';
import { rust, rustLanguage } from '@codemirror/lang-rust';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { php } from '@codemirror/lang-php';
import { completeFromList } from '@codemirror/autocomplete';
import { LANGUAGE_COMPLETION_MAP, LanguageKey } from './smartAutocoplete';

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

    loader: () => {
      let configs: any = [
        javascript({
          jsx: true,
        }),
      ];
      if (typeof window !== 'undefined') {
        configs = [
          ...configs,
          javascriptLanguage.data.of({
            autocomplete: jsScopeCS(window),
          }), // This returns an Extension (Facet), NOT LanguageSupport
        ];
      }
      return configs;
    },
  },

  typescript: {
    key: 'typescript',
    label: 'TypeScript',
    extensions: ['ts', 'tsx'],
    aliases: ['ts', 'tsx'],
    loader: () => {
      let configs: any = [
        javascript({
          typescript: true,
          jsx: true,
        }),
      ];
      if (typeof window !== 'undefined') {
        configs = [
          ...configs,
          javascriptLanguage.data.of({
            autocomplete: jsScopeCS(window),
          }), // This returns an Extension (Facet), NOT LanguageSupport
        ];
      }
      return configs;
    },
  },

  python: {
    key: 'python',
    label: 'Python',
    extensions: ['py'],
    loader: () => [
      python(),
      pythonLanguage.data.of({
        autocomplete: pygc,
      }),
    ],
  },

  java: {
    key: 'java',
    label: 'Java',
    extensions: ['java'],
    loader: () => [
      java(),
      javaLanguage.data.of({
        autocomplete: completeFromList(
          LANGUAGE_COMPLETION_MAP[LanguageKey.Java] as Completion[]
        ),
      }),
    ],
  },

  cpp: {
    key: 'cpp',
    label: 'C++',
    extensions: ['c', 'cpp', 'cc', 'cxx', 'h'],
    aliases: ['c++'],
    loader: () => [
      cpp(),
      cppLanguage.data.of({
        autocomplete: completeFromList(
          LANGUAGE_COMPLETION_MAP[LanguageKey.Cpp] as Completion[]
        ),
      }),
    ],
  },

  go: {
    key: 'go',
    label: 'Go',
    extensions: ['go'],
    loader: () => [
      go(),
      goLanguage.data.of({
        autocomplete: completeFromList(
          LANGUAGE_COMPLETION_MAP[LanguageKey.Go] as Completion[]
        ),
      }),
    ],
  },

  rust: {
    key: 'rust',
    label: 'Rust',
    extensions: ['rs'],
    loader: () => [
      rust(),
      rustLanguage.data.of({
        autocomplete: completeFromList(
          LANGUAGE_COMPLETION_MAP[LanguageKey.Rust] as Completion[]
        ),
      }),
    ],
  },

  html: {
    key: 'html',
    label: 'HTML',
    extensions: ['html', 'htm'],
    loader: () => [html()],
  },

  css: {
    key: 'css',
    label: 'CSS',
    extensions: ['css'],
    loader: () => [css()],
  },

  json: {
    key: 'json',
    label: 'JSON',
    extensions: ['json'],
    loader: () => [json()],
  },

  markdown: {
    key: 'markdown',
    label: 'Markdown',
    extensions: ['md', 'markdown'],
    loader: () => [markdown()],
  },

  sql: {
    key: 'sql',
    label: 'SQL',
    extensions: ['sql'],
    loader: () => [sql()],
  },

  xml: {
    key: 'xml',
    label: 'XML',
    extensions: ['xml'],
    loader: () => [xml()],
  },

  php: {
    key: 'php',
    label: 'PHP',
    extensions: ['php'],
    loader: () => [php()],
  },
};

export function getConfigsByExtension(ext: string) {
  const normalized = ext.replace('.', '').toLowerCase();
  return Object.values(LANGUAGES).find((lang) =>
    lang.extensions.includes(normalized)
  );
}

export function getLanguageByExtension(ext: string): string {
  const normalized = ext.replace('.', '').toLowerCase();
  const langData = Object.values(LANGUAGES).find((lang) =>
    lang.extensions.includes(normalized)
  );
  if (langData) return langData.key;
  return 'text';
}
