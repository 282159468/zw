import { defineConfig } from 'vite';
import { join } from 'path';
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';
import react from '@vitejs/plugin-react';
import rehypeReact from 'rehype-react';
import { codePlugin } from './config/codePlugin';
const projectRootDir = __dirname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({
      providerImportSource: '@mdx-js/react',
      format: 'mdx',
      rehypePlugins: [rehypeHighlight, codePlugin],
      mdxExtensions: ['.md'],
    }),
  ],
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: join(projectRootDir, 'node_modules/$1'),
      },
      {
        find: '@',
        replacement: join(projectRootDir, 'src'),
      },
    ],
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    entries: [],
  },
});
