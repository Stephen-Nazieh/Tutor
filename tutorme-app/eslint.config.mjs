import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'coverage/',
      'playwright-report/',
      'playwright-report/**',
      'test-results/',
      'test-results/**',
      'node_modules/',
      'node_modules/**',
      'next-env.d.ts',
      'public/**',
      'prisma/migrations/**',
      '*.min.js',
      '*.min.mjs',
      'package.json.tmp',
      'pkg_head.json',
      'pkg_head2.json',
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
  },
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'import/no-anonymous-default-export': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-assign-module-variable': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-no-undef': 'off',
      'react/no-children-prop': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/static-components': 'off',
      'jsx-a11y/alt-text': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-console': 'off',
      'prefer-const': 'off',
      'no-var': 'off',
    },
  },
  {
    files: ['scripts/**/*.{js,ts}', 'src/scripts/**/*.{js,ts}', 'prisma/**/*.{js,ts}'],
    rules: {
      '@next/next/no-assign-module-variable': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['public/**/*.{js,mjs}'],
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
    },
  },
];

export default [
  ...config,
];
