import * as esbuild from 'esbuild-wasm';

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

type Files = Record<string, string>;

function normalize(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

function resolveRelative(resolveDir: string, importPath: string, files: Files) {
  const base = resolveDir || '/';
  const fullPath = join(base, importPath);
  return resolveWithExtensions(fullPath, files);
}

function resolveWithExtensions(path: string, files: Files) {
  if (files[path] != null) return path;

  for (const ext of extensions) {
    const withExt = path + ext;
    if (files[withExt] != null) return withExt;
  }

  return null;
}

function join(a: string, b: string) {
  const stack = a.split('/');

  if (!a.endsWith('/')) stack.pop();

  b.split('/').forEach((part) => {
    if (part === '.' || part === '') return;
    if (part === '..') stack.pop();
    else stack.push(part);
  });

  return stack.join('/') || '/';
}

function getLoader(path: string): esbuild.Loader {
  if (path.endsWith('.tsx')) return 'tsx';
  if (path.endsWith('.ts')) return 'ts';
  if (path.endsWith('.jsx')) return 'jsx';
  if (path.endsWith('.json')) return 'json';
  return 'js';
}

export function virtualFsPlugin(files: Files): esbuild.Plugin {
  return {
    name: 'virtual-fs',
    setup(build) {
      /* ---------------------------------
         Resolve imports
      ----------------------------------*/
      build.onResolve({ filter: /.*/ }, (args) => {
        // Entry point
        if (args.kind === 'entry-point') {
          return {
            path: normalize(args.path),
            namespace: 'virtual',
          };
        }

        // Relative imports
        if (args.path.startsWith('.')) {
          const resolved = resolveRelative(args.resolveDir, args.path, files);

          if (resolved) {
            return {
              path: resolved,
              namespace: 'virtual',
            };
          }
        }

        // Absolute virtual paths (/src/App)
        if (args.path.startsWith('/')) {
          const resolved = resolveWithExtensions(args.path, files);

          if (resolved) {
            return {
              path: resolved,
              namespace: 'virtual',
            };
          }
        }

        // npm modules → CDN
        return {
          path: `https://esm.sh/${args.path}`,
          namespace: 'http',
        };
      });

      /* ---------------------------------
         Load virtual files
      ----------------------------------*/
      build.onLoad({ filter: /.*/, namespace: 'virtual' }, async (args) => {
        const contents = files[args.path];

        if (contents == null) {
          throw new Error(`Virtual file not found: ${args.path}`);
        }

        return {
          contents,
          loader: getLoader(args.path),
        };
      });

      /* ---------------------------------
         Load CDN modules
      ----------------------------------*/
      build.onLoad({ filter: /.*/, namespace: 'http' }, async (args) => {
        const res = await fetch(args.path);
        return {
          contents: await res.text(),
          loader: 'js',
        };
      });
    },
  };
}

export function cssPlugin(files: Record<string, string>): esbuild.Plugin {
  return {
    name: 'css-inject',
    setup(build) {
      build.onLoad({ filter: /\.css$/ }, async (args) => {
        const path = args.path.startsWith('/') ? args.path : `/${args.path}`;

        const css = files[path] ?? files[path.slice(1)];

        if (!css) return;

        const escaped = css.replace(/\n/g, '').replace(/"/g, '\\"');

        return {
          loader: 'js',
          contents: `
            const style = document.createElement("style");
            style.innerText = "${escaped}";
            document.head.appendChild(style);
          `,
        };
      });
    },
  };
}
