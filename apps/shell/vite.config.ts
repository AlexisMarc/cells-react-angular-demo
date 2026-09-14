import { defineConfig } from 'vite';

const externals: Record<string, string> = {
  '@open-cells/core': '/vendor/cells-core.js',
  '@awesome.me/webawesome': '/vendor/webawesome.js',
};

export default defineConfig({
  server: {
    preTransformRequests: false,
  },
  optimizeDeps: {
    exclude: Object.keys(externals),
  },
  build: {
    rollupOptions: {
      external: Object.keys(externals),
    },
  },
  plugins: [
    {
      name: 'externalize-cells-shared',
      enforce: 'pre',
      resolveId(source) {
        if (externals[source]) {
          return { id: externals[source], external: true };
        }
        return null;
      },
    },
  ],
});
