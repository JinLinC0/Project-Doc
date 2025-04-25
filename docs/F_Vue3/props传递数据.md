## `props`传递数据

在`Vue`中，`props`是使用频率最高的一种通信方式，父组件通过子组件的 `props `属性将数据直接传递到子组件内部，供子组件调用处理

在`APP.vue`主组件中：将数据通过`:content`传到子组件中，前面加上`:`表示传递的是一个表达式（响应数据），如果只是想要传递一个字符串过去，可以前面不加`:`（但仅仅局限于字符串类型）

```vue
<template>
	<hd-button :content="btContent" type="success"/>
</template>

<script>
import hdButton from "./components/Button.vue"
export default{
    components: { hdButton },
    data(){
        return{
            btContent: "保存提交"
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
```

子组件`Button.vue`：将数据通过`props`进行接收

```vue
<template>
	<div :class="[type]">{{content}}</div>
</template>

<script>
export default{
    props: {
        content: {        
            type: String,  // 将传递的content的类型进行限制
            default: '保存'  // 如果父组件不传递内容，子组件就使用这个默认值
        },
        type: {
            type: String,
            default: 'info',
            validator(v){   // 可以将传递过来的参数进行验证
                console.log(v);
                // 如果内容不在这两个里面，则验证不通风
                retrun ['success', 'info'].includes(v) 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    div{
        display: inline-block;  // 改为行级块，使这个div不占据整行
        background-color: green;
        color: black;
        padding: 5px 10px;
        border-radius: 10px;  // 倒角
        opacity: 0.6;  // 透明度
        transition: 1s;  // 过度时间
        &:hover{
            opacity: 1;  // 鼠标放上时的透明度
        }
        &.info{
            background-color: gray;
        }
        &.success{
            background-color: green;
        }
    }
</style>
```

对于传入的内容进行类型限制，常见的右以下的类型：

- String：字符串
- Boolean：布尔类型
- Number：数值
- Function：函数
- Object：对象

***

### 批量设置`props`

单一进行设置传递参数的方式：

`<hd-button content="保存" type="success"/>`

批量设置进行参数的传递：

`<hd-button v-bind="{ content: '保存', type: 'success' }"/>`

***

### `required`验证

在我们之前的情况下，如果父组件不传入`content`内容，子组件就会使用默认值，如果我们要求某些`props`的数据在父组件传值的时候必须要进行设置，我们可以在子组件中使用以下的`required`验证方法，如果父组件不传递内容，就会报错

```js
props: {
    content: {        
        type: String,
        required: true
    },
}
```

***

### 单向数据流

单向数据流是指父组件内的数据变化，会影响子组件；但是反过来是不行的，它是单向的

在`APP.vue`父组件中，改变传入的`content`字符串，会影响子组件的数据内容变化：

```vue
<template>
	<hd-button :content="btContent" type="success"/>
	<button @click="btContent = '新保存'">父组件按钮</button>
</template>

<script>
import hdButton from "./components/Button.vue"
export default{
    components: { hdButton },
    data(){
        return{
            btContent: "保存提交"
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
```

点击父组件按钮，子组件按钮的`content`会变成新保存，所以父到子的数据流是流通的，但是子组件到父组件是不流通的（子组件只能影响自己的`content`，不能影响到父组件），因此该数据流是单项的

根据单向数据流，告诉我们不要修改子组件中的`props`，不要把`props`当成一个响应式数据进行使用，调用就行了，但是如果想要`props`变成响应式的，在某些情况下想要这些数据进行变化，我们需要定义一个`data`，将传递过来的`content`变成一个响应式数据：

```js
data(){
    return {
        text: this.content  // 将传递接受的数据赋值给了响应式数据
    }
}
```

后续想要使用`content`，都换成`text`响应式数据即可`{{text}}`，但是后续想要通过单向数据流使用父组件来改变子组件中的内容，子组件是不会发生变化的，因为这个时候子组件使用的是`text`，在第一次调用的时候，将`props`数据赋值给了`text`，子组件最终渲染的内容是`text`，而`props`，所以不会变化，实质上子组件的`props`是已经发生变化的，只是渲染的时候使用的是`text`，我们如果想要按钮重新发生变化，可以使用`watch`侦听器进行监听`props`：如果后续`props`发生变化，我们在将它又一次赋值给响应式数据：

```js
watch:{
    content(v){
        this.text = v
    }
}
```

综上所述：子组件可以又其响应式的特性，同时也可以根据传递过来的`props`来改变我们的响应式数据