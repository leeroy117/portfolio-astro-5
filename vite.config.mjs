// vite.config.mjs
import { defineConfig } from 'vite';
export default defineConfig({
  optimizeDeps: {
    include: ['react-spinners'],
  },
});
