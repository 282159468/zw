import React, { useState } from 'react';
import { ConfigProvider, App as AntdApp, Menu, GetProps } from 'antd';
import { PlaygroundSandbox } from 'react-exercise-playground';
import { MDXProvider } from '@mdx-js/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';

import { routers } from './routers';
import { CODE_PREVIEW_COMPONENT_NAME, CODE_VALUE_PROP } from '../config/codePlugin';
import './style/index.css';
const router = createBrowserRouter(routers);

const components = {
  [CODE_PREVIEW_COMPONENT_NAME](properties) {
    const files = {
      'App.tsx': `${properties[CODE_VALUE_PROP]}
  `,
    };
    return (
      <PlaygroundSandbox
        showHeader={false}
        showCompileOutput={false}
        fileSelectorReadOnly
        width={'100%'}
        height={400}
        files={files}
        border
        theme="dark"
        options={
          {
            // lineNumbers: false,
          }
        }
      />
    );
  },
};

const generateMenus = (data): GetProps<typeof Menu>['items'] => {
  return data.map((item) => {
    return {
      key: item.path,
      label: item.name,
      children: item.children ? generateMenus(item.children) : undefined,
    };
  });
};
const menus = generateMenus(routers[0].children);
const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <AntdApp>
        <MDXProvider components={components}>
          <Menu
            mode="horizontal"
            items={menus}
            onClick={(info) => {
              router.navigate(info.key);
            }}
          />
          <RouterProvider router={router} />
        </MDXProvider>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
