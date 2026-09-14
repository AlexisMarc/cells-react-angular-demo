import { defineConfig } from 'vite';

const externals = ['@open-cells/core', '@awesome.me/webawesome'];

export default defineConfig({
  optimizeDeps: {
    exclude: externals,
  },
  build: {
    rollupOptions: {
      external: externals,
    },
  },
  plugins: [
    {
      name: 'externalize-cells-shared',
      enforce: 'pre',
      resolveId(source) {
        if (externals.includes(source)) {
          return { id: source, external: true };
        }
        return null;
      },
    },
  ],
});
