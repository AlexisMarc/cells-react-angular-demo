import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, '../public');
const vendorDir = resolve(publicDir, 'vendor');

mkdirSync(vendorDir, { recursive: true });

const common = {
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  logLevel: 'info',
};

await build({
  ...common,
  entryPoints: [require.resolve('@open-cells/core')],
  outfile: resolve(vendorDir, 'cells-core.js'),
});

await build({
  ...common,
  entryPoints: [resolve(here, 'webawesome-entry.js')],
  outfile: resolve(vendorDir, 'webawesome.js'),
});

console.log('Vendor bundles ready in public/vendor');
