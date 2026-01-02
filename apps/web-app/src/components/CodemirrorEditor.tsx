'use client';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { editorEssentials } from '@web-app/utils/editorEssentials';
import { tomorrowNightBlue } from '@uiw/codemirror-theme-tomorrow-night-blue';
import { getConfigsByExtension } from '@web-app/utils/languageRegistry';
import { autocompletion } from '@codemirror/autocomplete';
import { useEffect, useRef } from 'react';

type CodemirrorEditorProp = {
  hideNumbering?: boolean;
  height?: string;
  width?: string;
  extention?: string;
  value: string;
  readOnly?: boolean;
  lineDecorationsWidth?: number;
  fontSize?: number;
  setValue?: (val: string) => void;
};

const CodemirrorEditor = ({
  extention = 'txt',
  value,
  readOnly = false,
  height = '100%',
  width = '100%',
  setValue,
}: CodemirrorEditorProp) => {
  // eslin-disable next-line
  const viewRef = useRef<ReactCodeMirrorRef>(null);
  const projectConfig = getConfigsByExtension(extention);

  useEffect(() => {
    if (viewRef.current && viewRef.current.view) {
      // EditorView instance, call focus on mount
      const view = viewRef.current.view;
      const docLength = view.state.doc.length;
      view.dispatch({
        selection: { anchor: docLength, head: docLength }, // cursor at absolute end
        scrollIntoView: true, // auto-scroll to show cursor
      });
      viewRef.current.view.focus();
    }
  }, [viewRef.current]);

  return (
    <CodeMirror
      value={value}
      style={{ height, width }}
      theme={tomorrowNightBlue}
      ref={viewRef}
      extensions={[
        editorEssentials({
          onSave: () => {
            // TODO: Save Functionality
          },
        }),
        autocompletion(),
        ...[projectConfig ? projectConfig.loader() : []],
      ]}
      editable={!readOnly}
      onChange={(val) => {
        setValue?.(val);
      }}
    />
  );
};

export default CodemirrorEditor;
