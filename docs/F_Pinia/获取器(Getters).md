## 获取器（`Getters`）

获取器是一种依赖于 `store` 状态并产生计算值的函数，这些值将被缓存，直到依赖的状态改变。在 `Pinia` 中，可以在 `getters` 属性中定义获取器：

```js
import { defineStore } from 'pinia';

const useStore = defineStore({
  id: 'myStore',
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount() {
      return this.count * 2;
    },
  },
});
```

其中，`doubleCount` 就是一个获取器，它返回 `count` 的两倍

具体使用：当`state`中的数据，需要经过处理后再使用时，可以使用`getters`配置

```ts
// 引入defineStore用于创建store
import {defineStore} from 'pinia'
 
// 定义并暴露一个store
export const useCountStore = defineStore('count',{
  // 动作
  actions:{
    /************/
  },
  // 状态
  state(){
    return {
      sum:1,
      school:'atguigu'
    }
  },
  // 计算
  getters:{
    bigSum:(state):number => state.sum *10,
    upperSchool():string{
      return this. school.toUpperCase()
    }
  }
})
```

组件中读取数据；

```js
const {increment,decrement} = countStore
let {sum,school,bigSum,upperSchool} = storeToRefs(countStore)
```

