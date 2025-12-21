'use client';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useCallback, useRef } from 'react';

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
  // eslin-disable next-line
  const editorRef = useRef(null);

  const handleEditorMount: OnMount = useCallback(function (editor, monaco) {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      allowJs: true,
      target: monaco.languages.typescript.ScriptTarget.Latest,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      allowNonTsExtensions: false,
      allowJs: true,
      target: monaco.languages.typescript.ScriptTarget.Latest,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    });

    // Set editor ref
    editorRef.current = editor;

    // Set theme
    monaco.editor.setTheme('vs-dark');

    // Ctrl+S: Format + Save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, async () => {
      await editor.getAction('editor.action.formatDocument').run();
      const updatedValue = editor.getValue();
      if (setValue) setValue(updatedValue);
    });

    // Ctrl+Space: Trigger IntelliSense
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () =>
      monaco.editor.trigger('keyboard', 'editor.action.triggerSuggest', {})
    );

    // Enable ALL essential IntelliSense features
    editor.updateOptions({
      // Core IntelliSense
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
      parameterHints: { enabled: true },
      matchBrackets: 'always',
      autoClosingBrackets: 'always',
      autoClosingOvertype: 'always',
      wordBasedSuggestions: true,

      // Enhanced suggestions
      suggest: {
        showWords: true,
        showFunctions: true,
        showClasses: true,
        showConstructors: true,
        showFields: true,
        showInterfaces: true,
        showModules: true,
        showProperties: true,
        showTypes: true,
        showVariables: true,
      },
    });
  }, []);

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
      onMount={handleEditorMount}
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
        wordWrap: 'off',
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
