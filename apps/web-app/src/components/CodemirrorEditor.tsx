'use client';
import CodeMirror from '@uiw/react-codemirror';
import { editorEssentials } from '@web-app/utils/editorEssentials';
import { tomorrowNightBlue } from '@uiw/codemirror-theme-tomorrow-night-blue';
import { getLanguageByExtension } from '@web-app/utils/languageRegistry';
import {
  LanguageKey,
  smartAutocomplete,
} from '@web-app/utils/smartAutocoplete';

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
  const projectConfig = getLanguageByExtension(extention);

  return (
    <CodeMirror
      value={value}
      style={{ height, width }}
      theme={tomorrowNightBlue}
      extensions={[
        editorEssentials({
          onSave: () => {
            // TODO: Save Functionality
          },
        }),
        smartAutocomplete((projectConfig?.key || '') as LanguageKey),
        ...[projectConfig ? [projectConfig.loader()] : []],
      ]}
      editable={!readOnly}
      onChange={(val) => {
        setValue?.(val);
      }}
    />
  );
};

export default CodemirrorEditor;
