'use client';
import MonacoEditor from '@monaco-editor/react';

type EditorProp = {
  hideNumbering?: boolean;
  height?: string;
  selectedLanguageuage?: string;
  value: string;
  readOnly?: boolean;
  setValue?: (selectedLanguage: string, val: string) => void;
};

const Editor = ({
  height = '100%',
  selectedLanguageuage = 'javascript',
  value,
  readOnly = false,
  setValue,
}: EditorProp) => {
  return (
    <MonacoEditor
      key={selectedLanguageuage} // Stable key prevents remounts
      language={selectedLanguageuage}
      value={value}
      theme="vs-dark" // Match handleEditorMount theme
      width="100%"
      height={height}
      onChange={(val: string | undefined) => {
        if (setValue) return setValue(selectedLanguageuage, val ?? '');
      }}
      //   onMount={handleEditorMount}
      options={{
        readOnly,
        scrollBeyondLastLine: false,

        // IntelliSense - Full suite
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnCommitCharacter: true,
        acceptSuggestionOnEnter: 'on',
        tabCompletion: 'on',
        snippetSuggestions: 'inline',

        // Formatting
        formatOnType: true,
        formatOnPaste: true,
        autoIndent: 'full',

        // UI/UX
        minimap: { enabled: false },
        scrollbar: { verticalScrollbarSize: 6 },
        wordWrap: 'on',
        parameterHints: { enabled: true },
        matchBrackets: 'always',
        autoClosingBrackets: 'always',
        lineNumbersMinChars: 2,
        folding: false, // Removes folding margin space [web:4][web:6]
        glyphMargin: false, // Hides glyph/debugger margin [web:6]
        lineDecorationsWidth: 10, // Minimizes decoration space (undocumented but

        // Essential
        smoothScrolling: true,
        lineNumbers: 'on',
        cursorBlinking: 'smooth',
        automaticLayout: true,
        fontSize: 12,

        // Language server
        wordBasedSuggestions: true,
      }}
    />
  );
};

export default Editor;
