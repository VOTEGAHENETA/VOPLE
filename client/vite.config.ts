import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { env } from 'process';
<<<<<<< HEAD

=======
// const { VITE_PUBLIC_URL } = import.meta.env;
>>>>>>> 477ef2affd4f121630767ba93d43e080c177da58
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    global: 'window', // global을 window로 대체
  },
  server: {
    proxy: {
      '/ws': {
        target: env.VITE_PUBLIC_URL,
        ws: true, // WebSocket 프록시 활성화
      },
    },
  },
});
