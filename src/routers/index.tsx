import { Outlet } from 'react-router-dom';
import { Menu } from 'antd';
// @ts-ignore
// const modules = import.meta.glob('../../*.md', {
const modules = import.meta.glob('../pages/**/*.md', {
  eager: true,
  import: 'default',
});

let nextId = 0;
let todos = [{ id: nextId++, text: 'Todo #1' }];
let listeners = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'Todo #' + nextId }];
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

const root = {
  name: 'home',
  path: '/',
  element: <Outlet />,
  children: [],
};

export const routers = [root];

const pushRouter = (pathArr: string[], router) => {
  const paths = [...pathArr];
  let parent = root;
  while (true) {
    const name = paths.shift()?.replace('.md', '');

    let list = parent.children;
    const routerPath = `${parent.path === '/' ? '' : parent.path}`;
    if (paths.length === 0) {
      list.push({
        name,
        path: `${routerPath}/${name}`,
        ...router,
      });
      return;
    }
    const existRouter = list.find((item) => item.name === name);
    if (existRouter) {
      parent = existRouter;
    } else {
      parent = {
        name,
        path: `${routerPath}/${name}`,
        children: [],
        element: null,
      };
      list.push(parent);
    }
  }
};
const generateRouters = () => {
  Object.keys(modules).forEach((key) => {
    const Component = modules[key];
    const paths = key.split('/').slice(2);
    pushRouter(paths, { element: <Component /> });
  });
};
const webpackRouters = () => {
  // const context = require.context('../pages', true, /\.md$/);
  // context.keys().forEach((k) => {
  //   const paths = k.split('/').slice(1);
  //   console.log('context(k)', context(k));
  //   const Component = context(k).default;
  //   pushRouter(paths, { element: <Component /> });
  // });
};

generateRouters();

function prettyPrint(fn) {
  let formattedSource = fn.toString();
  formattedSource = formattedSource.replace(/([{};])/g, '$1\n');
  formattedSource = formattedSource.replace(/(\S)\{/g, '$1 {');
  formattedSource = formattedSource.replace(/^(.*?);/gm, '    $1;');
  console.log(formattedSource);
  return formattedSource;
}
