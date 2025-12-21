import * as esbuild from 'esbuild-wasm';
import { version } from 'esbuild-wasm/package.json';

let initialized = false;

self.onmessage = async (e) => {
  const { files, entryPoint } = e.data as {
    files: Record<string, string>;
    entryPoint: string;
  };

  if (!initialized) {
    await esbuild.initialize({
      wasmURL: `https://unpkg.com/esbuild-wasm@${version}/esbuild.wasm`,
    });
    initialized = true;
  }

  try {
    const result = await esbuild.build({
      entryPoints: [entryPoint], // e.g. "/src/index.jsx"
      bundle: true,
      write: false,
      outdir: 'out',
      minify: false,
      treeShaking: false,
      format: 'esm',
      target: ['es2022'],
      // Use classic JSX transform so JSX becomes React.createElement(...)
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      define: {
        'process.env.NODE_ENV': '"development"',
        global: 'window',
      },
      pure: [], // disable intrinsic call-pure marking
      plugins: [vfsPlugin(files, entryPoint)],
    });

    self.postMessage({ code: result.outputFiles[0].text });
  } catch (err: any) {
    self.postMessage({ error: err.message });
  }
};

const vfsPlugin = (files: Record<string, string>, entryPoint: string) => ({
  name: 'vfs-plugin',
  setup(build: esbuild.PluginBuild) {
    // Helper to find file in VFS with extension probing
    const resolveInVFS = (path: string) => {
      // 1. Exact match or extension match
      const extensions = ['', '.jsx', '.tsx', '.js', '.ts', '.css', '.json'];
      for (const ext of extensions) {
        const probe = path + ext;
        if (files[probe]) return probe;
      }
      // 2. Directory match (index files)
      for (const ext of extensions) {
        if (!ext) continue;
        const probe = `${path}/index${ext}`;
        if (files[probe]) return probe;
      }
      return null;
    };

    // 0. Special-case the entry point so it always comes from VFS
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.importer === '' && args.path === entryPoint) {
        // esbuild is resolving the top-level entry
        return { path: entryPoint, namespace: 'vfs' };
      }
      return null;
    });

    // --- UNIVERSAL RESOLVER ---
    // Catch everything else to avoid touching real FS
    build.onResolve({ filter: /.*/ }, (args) => {
      // 1. Pass through HTTP namespace imports
      if (args.namespace === 'http') {
        return {
          path: new URL(args.path, args.importer).toString(),
          namespace: 'http',
        };
      }

      // 2. Handle External URLs
      if (args.path.startsWith('http://') || args.path.startsWith('https://')) {
        return { path: args.path, namespace: 'http' };
      }

      // 3. Handle Bare Imports (packages)
      if (!args.path.startsWith('.') && !args.path.startsWith('/')) {
        return {
          path: `https://esm.sh/${args.path}?bundle`,
          namespace: 'http',
        };
      }

      // 4. Handle VFS Paths (absolute or relative)
      let resolvedPath = args.path;

      if (args.path.startsWith('.')) {
        const base = args.resolveDir
          ? `file://${args.resolveDir}/`
          : 'file:///';
        const url = new URL(args.path, base);
        resolvedPath = url.pathname;
      }

      // Check VFS
      const vfsMatch = resolveInVFS(resolvedPath);
      if (vfsMatch) {
        return { path: vfsMatch, namespace: 'vfs' };
      }

      // 5. Blocking error for missing files
      return { errors: [{ text: `File not found in VFS: ${resolvedPath}` }] };
    });

    // --- LOADERS ---

    // VFS Loader
    build.onLoad({ filter: /.*/, namespace: 'vfs' }, (args) => {
      const contents = files[args.path] ?? '';
      const ext = args.path.split('.').pop() || 'js';

      const lastSlash = args.path.lastIndexOf('/');
      const resolveDir =
        lastSlash <= 0 ? '/' : args.path.substring(0, lastSlash);

      if (ext === 'css') {
        // Use JSON.stringify to produce a valid JS string
        const cssToJs = `
          const style = document.createElement('style');
          style.textContent = ${JSON.stringify(contents)};
          document.head.appendChild(style);
        `;
        return { contents: cssToJs, loader: 'js', resolveDir };
      }

      const loaderMap: Record<string, esbuild.Loader> = {
        js: 'jsx',
        jsx: 'jsx',
        ts: 'ts',
        tsx: 'tsx',
        json: 'json',
      };

      return {
        contents,
        loader: loaderMap[ext] || 'js',
        resolveDir,
      };
    });

    // HTTP Loader
    build.onLoad({ filter: /.*/, namespace: 'http' }, async (args) => {
      const response = await fetch(args.path);
      if (!response.ok) throw new Error(`Failed to fetch: ${args.path}`);
      return {
        contents: await response.text(),
        loader: 'js',
        resolveDir: new URL('.', response.url).href,
      };
    });
  },
});
