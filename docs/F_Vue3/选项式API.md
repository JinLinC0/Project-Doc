## 选项式`API`

在`vue2`中，选项式`API`是非常常用的，选项式`API`中，在一个组件中会有很多个属性，数据，方法，计算属性和侦听器都作为选项式`API`的属性

***

### 数据

`vue`中的数据在语法中使用：`{{data}}`

```js
// 在<script>中需要进行数据的返回，提供给html中的标签使用
// 不管是数据，还是在方法/侦听器中的数据，都需要进行return出去
data(){
    return {
        name: 'jlc',  // 只有放到这个里面的数据才是响应式的数据
    }
},
// 外面的数据不是响应式数据
// 响应式的数据需要在data中进行声明，后续提供setup语法可以进行简化
```

在数据中使用以下两种方式是没有什么区别的：但是更加推荐使用后者

- `<div v-text="name"></div>`
- `<div>{{name}}</div>`

数据是双向绑定的：在模板中展示的数据，如果后续在逻辑中将数据进行改变，那模板中的数据值也会对应的自动发生变化；如果在模板中将数据改变，在`js`逻辑代码中的数据也会发生改变

`{{}}`中不止可以放数据，还可以放表达式，但是只能放单个表达式

`{{ n === 1 ? 'jlc' : 'JLC'}}`

#### 从外部文件中引入数据

我们可以对数据库的调用进行模拟的操作，将自定义的数据放到一个文件中，以供我们进行调用，数据文件可以使用`.js`或者`.json`的后缀，数组文件形式为：

```js
export default [
    { title: 'jlc', isDelete: true },
    { title: 'Jlc', isDelete: true },
]
```

在组件文件中进行引入和使用：

```vue
<template>
	<div class="classList">
    	<div v-for="(lesson, index) in lessons" :key="index">
            <span :class="{ isDelete: lesson.isDelete }">
                {{ lessons.title }}
    		</span>
            <button @click="lesson.isDelete = !lesson.isDelete">
                {{ lesson.isDelete ? '取消' : '删除' }}
    		</button>
        </div>
    </div>
</template>

<script>
    import lessons from "../..data/lessons"
	export default {
        data() {
            return {
                lessons   // 当key和value一致时，我们可以进行简写
            }
        }
    }
</script>

<style lang="scss">
    .classList {
        div {
            display: flex;
            justify-content: space-between;
            span {
                &.isDelete {
                    text-decoration: line-through;
                    background-color: red;
                }
            }
        }
    }
</style>
```

实现功能：当点击删除按钮时，给`<span>`标签中的内容加上删除线

`Vue`对数组的方法，如：`push`、`shift`、`unshift`、`pop`、`splice`、`sort`、`reverse`

进行了一些修改，通过原型进行了修改，可以在响应式对象中进行使用

***

### 方法

在逻辑代码中需要定义方法，以供使用

```js
methods: {
    add(event){
        this.error = ''
        if(this.num < 10){
            this.num++
        }else {
            this.error = '其值不能超过10'
        }
    }
},
```

方法在`html`标签中，一般是提供`v-on`指令进行调用的：

`<div v-on:click="add">{{name}}<div>`，其中`v-on`是可以进行省略的，简写形式：

`<div @click="add">{{name}}<div>`

如果事件函数没有进行参数的传递，我们在调用的时候可以将括号进行省略

#### 事件修饰符

`vue`提供了一下快速定义的修饰符，用来对事件进行修饰

对事件的默认行为进行阻止：`<div @click.prevent="add">{{name}}<div>`，这个行为添加后，点击事件就会被进行阻止，点击后不会在触发方法函数

***

### 计算属性

在计算属性中可以进行相应方法的书写：

计算属性的使用和普通的数据`data()`中值的使用方式是一样的，都是用{{}}进行调用的，但是`computed`相比于`data()`有一个缓存的特性，页面其他的变化不会对它造成影响

计算属性，只有当其内部的响应式数据发生变化时，计算属性才进行计算

```js
computed:{
    error(){
        return this.num === 0 ? '不能小于0' : this.num === 10 ? '不能超过10' : ''
    }
},

methods: {
    add(event){
        if(this.num < 10) this.num++
    },
    desc(event){
        if(this.num > 0) this.num--
    },
},
```

***

### 侦听器

`watch`侦听器是用于监测一个数据的改变，当数据发生变化时，我们要做一系列的业务

在选项式`API`中，`watch`侦听器的基本语法为：

```js
watch: {
    num(newValue, oldValue){
        console.log(newValue, oldValue)  // 侦听新值和旧值
        this.error = newValue === 0 ? '不能小于0' : newValue === 10 ? '不能超过10' : ''
    }
},
```

