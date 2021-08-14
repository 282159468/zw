console.log('bar开始执行');
import { foo } from './foo.js';
console.log('foo=', foo);
export function bar() {
  console.log('bar()调用完毕');
}
console.log('bar结束执行');
