// sandbox/initEsbuild.ts
'use client';

import * as esbuild from 'esbuild-wasm';

let initPromise: Promise<void> | null = null;

export function initEsbuild() {
  if (typeof window === 'undefined') {
    // SSR safety
    return Promise.resolve();
  }

  if (!initPromise) {
    initPromise = esbuild.initialize({
      wasmURL: '/esbuild.wasm', // MUST be local
      worker: true,
    });
  }

  return initPromise;
}
