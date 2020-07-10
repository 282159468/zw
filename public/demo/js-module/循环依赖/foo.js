console.log('foo开始执行');
import { bar } from './bar.js';
console.log('bar=', bar);
export const foo = () => {
  bar();
  console.log('foo()调用完毕');
};
foo();
