// const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// ../libs/buttons/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// !../libs/buttons/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    //     ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      colors: {
        primary: '#71f163',
        backgroundAccent: '#050816',
        backgroundAccentTransparent: '#050816af',
        card: '#0B1020',
        pannel: '#111827',
        primaryText: '#F9FAFB',
        secondaryText: '#9CA3AF',
        disabled: '#4B5563',
        divider: '#1F2933',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        project: { 500: '#FFCA9B', 600: '#fb9840' },
        machine: { 500: '#B69FE9' },
        problems: { 500: '#7EBBF8' },
        peer: { 500: '#22C55E' },
        greenishgrey: '#1F2933',
        codeMirrorBg: '#002351',
      },
    },
  },
  plugins: [],
  safelist: [
    // Gradients
    'theme-grad',
    'feature-grad',
    'project-grad',
    'machine-grad',
    'problems-grad',
    'peer-grad',
    // Colors
    'text-project-500',
    'text-machine-500',
    'text-problems-500',
    'text-peer-500',
    'text-project-600',
    'text-machine-600',
    'text-problems-600',
    'text-peer-600',
    'border-project-500',
    'border-machine-500',
    'border-problems-500',
    'border-peer-500',
  ],
};
