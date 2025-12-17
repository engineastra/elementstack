import * as esbuild from 'esbuild-wasm';

function normalizePath(path: string) {
  return path.replace(/^\/+/, '').replace(/\\/g, '/');
}

export function virtualFsPlugin(files: Record<string, string>): esbuild.Plugin {
  console.log(files);
  return {
    name: 'virtual-fs',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        let resolvedPath: string;

        if (args.kind === 'entry-point') {
          resolvedPath = normalizePath(args.path);
        } else if (args.path.startsWith('.')) {
          resolvedPath = normalizePath(
            new URL(args.path, `file:///${encodeURI(args.resolveDir || '')}/`)
              .pathname
          );
        } else {
          return { external: true };
        }

        if (files[resolvedPath]) {
          return { path: resolvedPath, namespace: 'virtual' };
        }

        return {
          errors: [{ text: `File not found: ${resolvedPath}` }],
        };
      });

      // CSS → injected as <style>
      build.onLoad({ filter: /\.css$/, namespace: 'virtual' }, (args) => {
        return {
          contents: `
            const style = document.createElement("style");
            style.textContent = ${JSON.stringify(files[args.path])};
            document.head.appendChild(style);
          `,
          loader: 'js',
        };
      });

      // JS / TS / JSX / TSX
      build.onLoad(
        { filter: /\.(js|ts|jsx|tsx)$/, namespace: 'virtual' },
        (args) => ({
          contents: files[args.path],
          loader: args.path.split('.').pop() as esbuild.Loader,
        })
      );
    },
  };
}
