import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, '../public');
const vendorDir = resolve(publicDir, 'vendor');

mkdirSync(vendorDir, { recursive: true });

await build({
  entryPoints: [require.resolve('@open-cells/core')],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  outfile: resolve(vendorDir, 'cells-core.js'),
  logLevel: 'info',
});

const webAwesomeDist = dirname(require.resolve('@awesome.me/webawesome/package.json')) + '/dist';
const webAwesomeOut = resolve(vendorDir, 'webawesome');
rmSync(webAwesomeOut, { recursive: true, force: true });
cpSync(webAwesomeDist, webAwesomeOut, { recursive: true });

console.log('Vendor bundles ready in public/vendor');
