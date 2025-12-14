import nextEslintPluginNext from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  // 1. Register the Next.js plugin
  {
    plugins: {
      '@next/next': nextEslintPluginNext,
    },
  },
  // 2. Load base configs
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  // 3. App-specific ignores
  {
    ignores: ['.next/**/*'],
  },
  // 4. App-specific Rule Overrides
  {
    rules: {
      // ✅ ADDED: Standard rule configuration
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['apps/web-app/**', '../../eslint.config.mjs'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
];
