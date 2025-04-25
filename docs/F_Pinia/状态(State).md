## 状态（`State`）

状态是在 `store` 中存储的数据，每个 `Pinia store `都有自己的状态，这个状态是一个 `JavaScript` 对象，可以在定义 `store` 时初始化状态

```js
import { defineStore } from 'pinia';

const useStore = defineStore({
  id: 'myStore',
  state: () => ({
    count: 0,
    user: null,
  }),
});
```

其中，`count` 和 `user` 就是这个 `store` 的状态