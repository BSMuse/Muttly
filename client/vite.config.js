import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiBaseUrl = process.env.VITE_APP_API_BASE_URL || 'http://localhost:8088';

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: apiBaseUrl,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api', ''),
      }
    }
  },
});
