import type { Extension } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';

import {
  defaultKeymap,
  historyKeymap,
  indentWithTab,
  indentMore,
  indentLess,
} from '@codemirror/commands';

import {
  completionKeymap,
  closeBracketsKeymap,
} from '@codemirror/autocomplete';

import { foldKeymap } from '@codemirror/language';

import { searchKeymap } from '@codemirror/search';

/**
 * Comprehensive editor essentials for CodeMirror 6
 */
export function editorEssentials(options?: {
  readOnly?: boolean;
  onSave?: (view: EditorView) => void;
}): Extension {
  const { onSave } = options ?? {};

  return [
    // ---------- Keymaps ----------
    keymap.of([
      // Tabs & indentation
      indentWithTab,
      { key: 'Mod-[', run: indentLess },
      { key: 'Mod-]', run: indentMore },

      // Save (Cmd+S / Ctrl+S)
      {
        key: 'Mod-s',
        preventDefault: true,
        run(view) {
          onSave?.(view);
          return true;
        },
      },

      // Default editor behavior
      ...completionKeymap,
      ...defaultKeymap,
      ...historyKeymap,
      ...closeBracketsKeymap,
      ...searchKeymap,
      ...foldKeymap,
    ]),
  ];
}
