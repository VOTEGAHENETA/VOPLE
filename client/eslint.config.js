import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import airbnb from 'eslint-config-airbnb';

const baseConfig = {
  languageOptions: {
    globals: globals.browser,
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
    react: pluginReact,
    prettier: pluginPrettier,
    '@tanstack/query': tanstackQuery, // TanStack Query 플러그인 추가
  },
  rules: {
    ...pluginJs.configs.recommended.rules, // 기본 JS 규칙
    ...tseslint.configs.recommended.rules, // TypeScript 규칙
    ...pluginReact.configs.flat.recommended.rules, // React 규칙
    ...airbnb.rules, // airbnb 규칙 사용
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // Prettier 규칙을 ESLint에서 에러로 처리
    'react/react-in-jsx-scope': 'off', // React 17+에서 불필요한 규칙 비활성화
    ...tanstackQuery.configs.recommended.rules, // TanStack Query 권장 규칙 추가
  },
};

const storybookConfig = {
  files: ['.storybook/main.ts'],
  rules: {
    '@typescript-eslint/no-require-imports': 'off', // require사용 허용
  },
};

const prettierAndReactConfig = {
  rules: {
    ...configPrettier.rules, // Prettier와 충돌하는 규칙 비활성화
    'react/jsx-props-no-spreading': 'off', // JSX에서 prop 전파 허용
  },
  ignores: ['node_modules', 'dist'], // 무시할 디렉토리
};

export default [
  {
    ...baseConfig,
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // 검사 대상 파일
  },
  storybookConfig,
  prettierAndReactConfig,
];
