import nextEslintPluginNext from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import nxEnforceModuleBoundaries from '@nx/eslint-plugin/enforce-module-boundaries';
import baseConfig from '../../eslint.config.mjs';

export default [
  { plugins: { '@next/next': nextEslintPluginNext } },
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  {
    ignores: ['.next/**/*'],
  },
  {
    rules: {
      ...nxEnforceModuleBoundaries({
        enforceBuildableLibDependency: true,
        allow: [
          'apps/web-app/**', // Allow absolute imports within web-app
        ],
        depConstraints: [
          {
            sourceTag: '*',
            onlyDependOnLibsWithTags: ['*'],
          },
        ],
      }),
    },
  },
];
