## `＜script setup＞`语法糖

该语法允许开发人员定义组件而无需从 `JavaScript `块中导出任何内容（不需要使用`export default`），只需定义变量并在模板中使用它们，该方法代码更少、更简洁的，不需要使用 `return {}` 暴露变量和方法了，使用组件时不需要主动注册

```vue
<template>
	{{ num }}
</template>

<script setup>
import { ref } from 'vue'
const num = ref(100)
</script>
```

***

### 获取后端数据

#### 使用生命周期构造函数异步获取

```vue
<template>
	<div>
        {{ todos }}
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const todos = ref([])
onMounted(async() => {
    todos.value = await fetch('后端数据地址').then(r => r.json())
})
</script>
```

#### `suspense`处理全局异步读取数据

在`setup`中，全局是异步的，具有全局的`async`，所有我们直接使用`await`是不报错的，但是我们这样模板是渲染不出来的，我们需要使用`<suspense>`标签进行包裹才行，这个标签表示当我们异步完成时，才会渲染我们标签中的内容

```vue
<template>
	<suspense>
        {{ todos }}
    </suspense>
</template>
<script setup>
import { ref } from 'vue'
const todos = ref([])
todos.value = await fetch('后端数据地址').then(r => r.json())
</script>
```

`<suspense>`标签有两个插槽：默认插槽`<template #default>`和请求过程中显示的插槽`<template #fallback>`，在异步请求的过程中渲染插槽的内容

***

### `defineProps`处理`props`数据

在父级组件通过`foo="qqq"`（传递表达式需要前面加冒号，传递字符串一般不需要）在子组件标签中进行向子组件传递数据

`Vue3`中的`props`是用于接收父组件传递的数据的属性，当使用 `<script setup>` 时，子组件中的`defineProps()` 宏函数支持从它的参数中推导类型，在`setup`语法糖中，不再需要对`defineProps`进行导入了，`vue`再运行的时候会自动的加载这个函数，传递给 `defineProps()` 的参数会作为运行时的 `props` 选项使用

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },  // 设置类型为字符串类型，且必须输入
  bar: Number
})
// 子组件中使用数据
props.foo
props.bar
</script>
```

在`Vue 3`和`TypeScript`中，如果要传递静态的`Props`，可以在父组件中直接在子组件的标签上使用`Props`的语法来传递静态值

#### `defineProps`结合`ts`接口`interface`的基本用法

`defineProps`的属性：

```ts
type: 定义数据的类型
reqiured: 是否必须
default: 默认值
validator: 自定义验证
```

父组件声明传值：

```vue
<template>
	<Child info="子组件" :age="age" name="name"></Child>
</template>

<script setup lang="ts">
//props:父子组件通信  props是只读的
import Child from "./Child.vue";
import { ref } from "vue";
let age = ref(24);
let name= ref('jlc');
</script>
```

子组件接收`props`

```vue
<template>
  <div>
    <h1>子组件</h1>
    <h3>姓名：{{name}}</h3>
    <h3>年龄：{{age}}</h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 方法一 通过数据方法接收
const props = defineProps(['name','age']);

// 放法二 通过对象接收
const props = defineProps({  
 name: String,
 age: {
  type: Number,
  default: 18,
  reqiured: true,
  validator: (val) => val > 18
 },
})
//props.name ='qqqq'//报错，props只读
</script>
```

### `defineEmits`处理`emit`自定义事件

自定义事件常用于：子 => 父，我们通常在父级组件中拿取数据，在子组件中对数据进行操作，如删除操作，子组件删除完数据后，在父组件中的数据是没有变化的因此我们需要通知一下父组件，告知父组件我已经完成删除动作了，通知父组件来完成数据的重新加载，所以我们需要在父组件中来向子组件传递自定义的事件：当删除数据后，父组件再把数据重新拉取一下：

```vue
<template>
	<item @del="del" v-for="todo of todos" :key="todo.id" />
</template>
<script setup>
import { ref } from 'vue'
import item from './components/item.vue'
const todos = ref([])
// 初始读取数据
todos.value = await fetch('后端数据地址').then(r => r.json()) 
const del = async() => {
    // 触发删除事件，重新读取一下数据
    todos.value = await fetch('后端数据地址').then(r => r.json())
}
</script>
```

在子组件中要调用这个事件：在触发删除后要调用一下这个删除功能

```vue
<template>
	<input type="text" :value="todo.tittle" />
	<button @click="del">删除</button>
</template>
<script setup>
const { todo } = defineProps({
    todo: { type: Object, required: true }
})
const emit = defineEmits(['del']);
const del = async() => {
    await fetch(`后端地址${todo.id}`, {
        method: 'delete'
    })
    emit('del')  // 调用父组件中的删除动作
}
</script>
```

在 `<script setup>` 中，`defineEmits`方法不需要手动的引入，系统在运行的时候会自动创建这个方法

***

### 封装`fetch`网络请求

我们一般创建一个`useRequest.js`文件夹，来封装我们的网络请求：

```js
export default () => ({
    async request(url = '', options = { method: 'get' }){
        return await fetch(`后端地址${url}`, options).then(r => r.json())
    },
    // 读取数据请求
    async get(url){
        return await this.request(url)
    },
    // 删除数据请求
    async delete(url){
        return await this.request(url, { method: 'delete' })
    },
})
```

封装完后，我们可以对之前的代码进行修改：父组件读取数据：

```vue
<template>
	<item @del="del" v-for="todo of todos" :key="todo.id" />
</template>

<script setup>
import { ref } from 'vue'
import item from './components/item.vue'
import useRequest from './composables/useRequest';
const request = useRequest();
const todos = ref([])
// 初始读取数据
todos.value = await request.get() 
const del = async() => {
    // 触发删除事件，重新读取一下数据
    todos.value = await request.get() 
}
</script>
```

子组件对数据进行操作：删除操作：

```vue
<template>
	<input type="text" :value="todo.tittle" />
	<button @click="del">删除</button>
</template>

<script setup>
import useRequest from './composables/useRequest';
const request = useRequest();

const { todo } = defineProps({
    todo: { type: Object, required: true }
})
const emit = defineEmits(['del']);
const del = async() => {
    await request.delect(todo.id)
    emit('del')  // 调用父组件中的删除动作
}
</script>
```

