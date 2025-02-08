import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    global: 'window', // global을 window로 대체
  },
  server: {
    proxy: {
      '/ws': {
        target: 'http://i12b102.p.ssafy.io:8000', // 스프링 부트 서버 주소
        ws: true, // WebSocket 프록시 활성화
      },
      '/api': {
        target: 'http://i12b102.p.ssafy.io:8000',
      },
    },
  },
});
