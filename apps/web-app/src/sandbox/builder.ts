import * as esbuild from 'esbuild-wasm';
import type { BuildOptions } from 'esbuild-wasm';
import { virtualFsPlugin } from './plugin';
import { ProjectType } from '@elementstack/shared-assets/Types';

const BUILD_CONFIG: Record<ProjectType, BuildOptions> = {
  js: { bundle: true, platform: 'browser' },
  ts: { bundle: true, platform: 'browser' },
  jsx: { bundle: true, platform: 'browser', jsx: 'automatic' },
  tsx: { bundle: true, platform: 'browser', jsx: 'automatic' },
};

function getEntryPoint(
  files: Record<string, string>,
  projectType: ProjectType
): string {
  const map: Record<ProjectType, RegExp> = {
    js: /src\/main\.js$/,
    ts: /src\/main\.ts$/,
    jsx: /src\/main\.jsx$/,
    tsx: /src\/main\.tsx$/,
  };

  const entry = Object.keys(files).find((p) => map[projectType].test(p));

  if (!entry) {
    throw new Error('Entry file not found');
  }

  return entry;
}

export async function buildProject(
  files: Record<string, string>,
  projectType: ProjectType
): Promise<string> {
  const entryPoint = getEntryPoint(files, projectType);

  const result = await esbuild.build({
    ...BUILD_CONFIG[projectType],
    entryPoints: [entryPoint],
    absWorkingDir: '/',
    write: false,
    plugins: [virtualFsPlugin(files)],
  });

  return result.outputFiles[0].text;
}
