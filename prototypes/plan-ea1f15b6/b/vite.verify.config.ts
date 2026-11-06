import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const root = path.resolve(import.meta.dirname, '../../..');

export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(root, 'src'),
    },
  },
  build: {
    outDir: '/tmp/plan-ea1f15b6-b',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        invoices: path.resolve(import.meta.dirname, 'invoices/index.html'),
        invoice: path.resolve(import.meta.dirname, 'invoice/index.html'),
      },
    },
  },
});
