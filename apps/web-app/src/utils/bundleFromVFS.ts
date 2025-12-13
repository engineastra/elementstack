import * as esbuild from 'esbuild-wasm';
import { initEsbuild } from './esbuildWasm';

export const bundleFromVFS = async (
  files: Record<string, string>,
  entry: string
) => {
  await initEsbuild();

  return esbuild.build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    format: 'esm',
    plugins: [
      {
        name: 'vfs',
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            return {
              path: args.path,
              namespace: 'vfs',
            };
          });

          build.onLoad({ filter: /.*/, namespace: 'vfs' }, (args) => {
            const contents = files[args.path];

            if (!contents) {
              throw new Error(`File not found: ${args.path}`);
            }

            return {
              contents,
              loader: args.path.endsWith('.ts') ? 'ts' : 'js',
            };
          });
        },
      },
    ],
  });
};
