import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'zw',
  mode: 'site',
  exportStatic: {},
  // mfsu: {},
  webpack5: {},
  targets: {
    chrome: '92',
  },
  dynamicImport: {},
  // more config: https://d.umijs.org/config
});
