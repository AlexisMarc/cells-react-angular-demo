import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
      fileName: 'form-editor-react',
    },
    rollupOptions: {
      external: ['@open-cells/core', '@awesome.me/webawesome'],
    },
    outDir: '../shell/public/vendor',
    emptyOutDir: false,
  },
});
