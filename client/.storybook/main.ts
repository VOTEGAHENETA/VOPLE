import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// __dirname 설정
const require = createRequire(import.meta.url);
const dirName = dirname(fileURLToPath(import.meta.url));

function getAbsolutePath(value: string): string {
  const modulePath = require.resolve(join(value, 'package.json'));
  return dirname(modulePath);
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  // viteFinal 설정 추가
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': join(dirName, '../src'),
      };
    }

    // SCSS 전역 설정
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/_variable.scss" as *;`,
        },
      },
    };

    return config;
  },
};

export default config;
