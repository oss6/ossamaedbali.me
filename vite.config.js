import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    // Keep CRA's output folder so `npm run deploy` and CI sync the same path
    outDir: 'build',
  },
});
