## `setup`函数

`setup`函数是`Composition API`（组合`API`）的入口函数，是启动页面后会自动执行的函数（可以在网页的控制界面看到执行的结果），项目中定义的所有变量，方法等都需要在`setup`函数中，在`setup`函数中定义的变量和方法最后都需要`return`出去，否则无法在视图层中使用

***

### `props`在`setup`中的使用

在`setup`函数中的第一个参数中可以接收`props`的值

```vue
<script>
export default {
    props: {
        init: {
            type: Number,   // 数据类型
            default: 3  // 默认值
        }
    },
    setup(props){
        let num = ref(props.init)
    }
}
</script>
```

***

### 自定义事件调用

父组件通过`props`向子组件进行传递值，子组件修改值后，将值通过事件返回给父组件

父组件`App,vue`：

```vue
<template>
	<Count :init="3" @change="changeHandle" />
	<br />
	{{ count }}
</template>

<script>
import Count from './components/Count.vue' 
import { ref } from 'vue'
export default {
    components: { Count },
    setup(){
        let count = ref(0)
        const changeHandle = (v) => count.value = v
        return { count, changeHandle }
    }
}
</script>
```

子组件：`Count.vue`

```vue
<template>
	<button @click="sub">-</button>
	{{ num }}
	<button @click="add">+</button>
</template>
<script>
import { ref, watchEffect } from 'vue'
export default {
    props: {
        init: {
            type: Number,   // 数据类型
            default: 3  // 默认值
        }
    },
    emits: ['change'],
    setup(props, context){
        // context参数是一个对象，里面有emit方法，通过结构拿到这个方法
        const { emit } = context;  
        let num = ref(props.init)
        let add = () => {
            num.value++
            // 触发自定义事件，将变化的值返回给父组件
            emit('change', num.value) 
        }
        let sub = () => {
            num.value--
            emit('change', num.value)
        }
        watchEffect(() => {
            if(num.value < 0) num.value = 0
            // 在初始化的时候触发一下，使父组件中也为该值
            emit('change', num.value)  
        })
    }
}
</script>
```

***

### 父组件直接操作子组件的数据

```vue
<template>
	<count :init="3" ref="countComponent" />
</template>

<script>
import Count from './components/Count.vue';
import { ref, onMounted } from 'vue';
export default{
    components: { Count },
    setup(){
        const countComponent = ref()  // 找到子组件
        onMounted(() => {
            console.log(countComponent.value)  // 读取子组件中return的数据
        })
        retrun { countComponent }
    }
}
</script>
```

父组件能读取子组件中所有`return`的数据和方法，只要`return`的内容都可以进行读取，但是有的时候，我们不想要所有的内容都可以被读取，我们需要对其进行`expose`限制，在子组件中，只暴露一些内容以供读取：`Count.vue`的代码为：

```vue
<script>
import { ref, onMounted } from 'vue';
export default{
    setup(context){
        const { expose } = context;
        expose({ num })   // 只暴露num给父组件进行读取
        retrun { num, add, del }
    }
}
</script>
```

这样我们如果通过父组件去读取没有被暴露的内容，就会显示`undefined`

***

### 在`setup`中使用`provide`和`inject`

`Provider/Inject`发布/订阅通信可以实现任意组件间通信：如果两个组件不是父子组件关系，而是深度嵌套的组件，并且深层子组件只需要父组件的部分内容，这个时侯如果使用` Props` 属性逐级传下去，将会显得非常麻烦而且容易出错。针对这种情况，`Vue `推出了发布订阅进行通信，即`Provider/Inject` 通信，`Provider/Inject` 通信，需要有一个 `Provider` 和一个或者多个 `Inject`。在父组件中，`Provider` 负责提供数据，深层子组件里的 `Inject` 负责读取数据。这种通信方式，不管父子组件中间相隔多久，都是可以实现的

在`setup`中使用`provide`和`inject`，也需要在对应的组件中进行引入

数据发送组件：

```vue
<template>
</template>
<script>
import { provide } from 'vue';
export default {
    setup(){
        provide('user', '123')
    }
}
</script>
```

数据接收组件：

```vue
<template>
	{{ user }}
</template>
<script>
import { inject } from 'vue';
export default {
    setup(){
        // 如果传递的内容没有，即没有provide('user', '123')，使用默认值abc
        const user = inject('user', 'abc');   
        return { user }
    }
}    
</script>
```

如果要变成响应式数据，要求发送数据组件的数据变化影响到接收组件的数据变化，在发送端通过`ref`包裹即可：

```js
let user = ref('abc')
provide('user', user); 
```

如果我们要在接收组件中改变数据，我们可以在发送组件中穿透一个方法：

```js
let user = ref('abc')
provide('user', user); 
provide('updateUser', (newValue) => user.value = newValue)
```

在接受组件中接受这个方法：我们可以点击按钮时触发这个方法

```vue
<template>
	<button @click="updateUser('abc123')">{{ user }}</button>
</template>
<script>
import { inject } from 'vue';
export default {
    setup(){
        const user = inject('user', 'abc');   
        const updateUser = inject('updateUser');
        return { user }
    }
}    
</script>
```

改变数据的前提条件：这个数据一点要是响应式数据