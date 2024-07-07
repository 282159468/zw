# list tree

```tsx
const list = [
  { id: 2, parentId: 1, name: 'Child 1' },
  { id: 3, parentId: 1, name: 'Child 2' },
  { id: 4, parentId: 2, name: 'Child 1.1' },
  { id: 5, parentId: 2, name: 'Child 1.2' },
  { id: 6, parentId: 3, name: 'Child 2.1' },
  { id: 1, parentId: null, name: 'Root' },
];
const listToTree = (list) => {
  const map = list.reduce((acc, current) => {
    acc[current.id] = current;
    return acc;
  }, {});

  const result = [];
  list.forEach((item) => {
    if (item.parentId) {
      if (!map[item.parentId].children) {
        map[item.parentId].children = [];
      }
      map[item.parentId].children.push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

export default () => {
  const onClick = () => {
    const res = listToTree(list);

    console.log(res);
  };

  return <div onClick={onClick}>click</div>;
};
```

## tree to list

```tsx
const tree = [
  {
    id: 1,
    parentId: null,
    name: 'Root',
    children: [
      {
        id: 2,
        parentId: 1,
        name: 'Child 1',
        children: [
          {
            id: 4,
            parentId: 2,
            name: 'Child 1.1',
          },
          {
            id: 5,
            parentId: 2,
            name: 'Child 1.2',
          },
        ],
      },
      {
        id: 3,
        parentId: 1,
        name: 'Child 2',
        children: [
          {
            id: 6,
            parentId: 3,
            name: 'Child 2.1',
          },
        ],
      },
    ],
  },
];

const treeToList = (tree) => {
  const result = [];
  const children = [...tree];
  while (children.length) {
    const item = children.shift();
    result.push(item);
    if (item.children) {
      children.push(...item.children);
    }
  }
  return result;
};

export default () => {
  const onClick = () => {
    const res = treeToList(tree);
    console.log(res);
  };

  return <div onClick={onClick}>click</div>;
};
```
