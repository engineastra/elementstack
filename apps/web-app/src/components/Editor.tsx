'use client';
import MonacoEditor from '@monaco-editor/react';

type EditorProp = {
  hideNumbering?: boolean;
  height?: string;
  width?: string;
  selectedLanguageuage?: string;
  value: string;
  readOnly?: boolean;
  lineDecorationsWidth?: number;
  fontSize?: number;
  setValue?: (val: string) => void;
};

const Editor = ({
  height = '100%',
  width = '100%',
  selectedLanguageuage = 'javascript',
  value,
  readOnly = false,
  lineDecorationsWidth = 10,
  fontSize = 12,
  setValue,
}: EditorProp) => {
  return (
    <MonacoEditor
      language={selectedLanguageuage}
      value={value}
      theme="vs-dark" // Match handleEditorMount theme
      width={width}
      height={height}
      onChange={(val: string | undefined) => {
        if (setValue) return setValue(val ?? '');
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
        lineDecorationsWidth, // Minimizes decoration space (undocumented but

        // Essential
        smoothScrolling: true,
        lineNumbers: 'on',
        cursorBlinking: 'smooth',
        automaticLayout: true,
        fontSize,

        // Language server
        wordBasedSuggestions: true,
      }}
    />
  );
};

export default Editor;
