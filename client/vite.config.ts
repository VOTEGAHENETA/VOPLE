import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/assets/styles/globals";`,
        // additionalData: `@use "./src/assets/styles/globals" as *;`,
        // additionalData: `@use '@/assets/styles/globals' as *;`,
      },
    },
  },
});
