## 动作（`Actions`）

动作是一种修改`store` 状态的方法，在 `Pinia` 中，可以在 `actions` 属性中定义动作

```js
import { defineStore } from 'pinia';

const useStore = defineStore({
  id: 'myStore',
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

其中，`increment` 就是一个动作，它将 `count` 的值增加 1