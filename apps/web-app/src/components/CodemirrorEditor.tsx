'use client';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { editorEssentials } from '@web-app/utils/editorEssentials';
import { tomorrowNightBlue } from '@uiw/codemirror-theme-tomorrow-night-blue';
import { getConfigsByExtension } from '@web-app/utils/languageRegistry';
import { autocompletion } from '@codemirror/autocomplete';
import { useRef } from 'react';
import { debounce } from 'lodash';

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

  const debouncedUpdate = debounce((val) => {
    if (setValue) {
      setValue(val as string);
    }
  }, 1200);

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
      onChange={debouncedUpdate}
    />
  );
};

export default CodemirrorEditor;
