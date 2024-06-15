import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';
import react from '@vitejs/plugin-react';
import { codePlugin } from './config/codePlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({
      providerImportSource: '@mdx-js/react',
      rehypePlugins: [rehypeHighlight, codePlugin],
    }),
  ],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    entries: [],
  },
});
