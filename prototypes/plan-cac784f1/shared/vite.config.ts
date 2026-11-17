import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ----------------------------------------------------------------------
// Prototype dev server: the app's own React plugin and `src` alias, served
// from the repository root, without the app's type/lint checker.

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

export default defineConfig({
  root: repoRoot,
  cacheDir: path.resolve(repoRoot, '.vite-cache'),
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(repoRoot, 'src/$1'),
      },
    ],
  },
  server: { host: '127.0.0.1', strictPort: true },
});
