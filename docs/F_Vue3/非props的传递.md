## 非`props`的传递

### 属性的传递

有一些属性是不在我们定义的`props`属性范围之内的，如：样式`class`，`id`等等，系统会自动的将其放到我们子组件的根元素标签上

父组件传递过来的：

```vue
<template>
    <section>
        <hd-button :content="btContent" type="success" class="hd" id="jlc"/>
    </section>
</section>>
```

子组件的结构：

```vue
<template>
    <section>
        <div :class="[type]">{{content}}</div>
    </section>
</section>>
```

样式`class`，`id`等等信息会放在`<section>`中，可以在控制台代码中进行查看

如果没有`<section>`标签，那就放在`<div>`标签中

如果在存在根级标签的情况下，我们就想要将样式`class`，`id`等等信息放在`<div>`标签中，可以要将其自动放置的方法给禁用掉：`inheritAttrs: false`

```vue
<script>
export default{
	inheritAttrs: false,
}
</script>
```

之后，我们可以手动来进行放置样式`class`，`id`等等信息：将非`props`属性全部放在一起

```vue
<template>
    <section>
        <div v-bind="$attrs" :class="[type]">{{content}}</div>
    </section>
</section>>
```

如果单单只要一个`id`，可以这么取：`:id="$attrs.id"`

***

### 事件的传递

父级组件传递的不仅仅只是数据，也可以传递事件方法函数

将父级组件中`methods`中的函数方法进行传递，函数方法为：

```ts
methods:{
    show(){
        alert('jlc')
    }
}
```

在父级组件中向子组件传递事件函数：

```vue
<hd-button :content="btContent" type="success :click="show" />
```

在子组件中进行接收和使用这个事件函数：

```vue
<template>
	<div v-bind="$attrs" :class="[type]" @click="click">
        {{content}}
    </div>
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
        },
        click: {
            type: Function
        },
    }
}
</script>
```

但是，我们知道，非`props`是可以进行自动传递的，所有，我们可以进行简化上述代码：

在父级组件中直接使用`@`符号进行传递：

```vue
<hd-button :content="btContent" type="success @click="show" />
```

因为非`props`是可以进行自动传递的，所以其原生事件也会被传递到子组件中，在子组件中就不需要定义`click`事件了，事件方法函数会被自动的传递过来

简化后，但是你要明白，事件的触发不是在父级组件中触发的，是传递到子组件后触发的

我们可以绑定`v-bind="$attrs"`到任何的元素上来使该事件进行触发（但是这样是将所有的非`props`都放在这个标签下了，后续可以对事件的非`props`进行独立的设置）

#### `$emit`触发自定义事件

声明：`emits: {'click'}`后，在父级组件绑定的`click`就不能触发了，我们可以在想要的标签位置通过`$emit`进行自定义事件的触发

```vue
<template>
	<div :class="[type]">{{content}}</div>
	<span @click="$emit('click')">x</span>
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
        },
        click: {
            type: Function
        },
    },
    // 注册之后，系统事件不会被自动的执行，需要通过$emit进行手动的触发
    emits: {'click'},  
}
</script>
```

`$emit('click')`调用事件方法的时候需要传递参数的时候，在`'click'`后面进行参数的传递：`$emit('click', lesson)`

也可以不用`click`系统事件，我们可以对事件进行自定义，在父级组件中：

```js
<hd-button :content="btContent" type="success @hd="show" />
// 自定义事件是hd，事件方法是show()
```

在子组件使用的时候，就使用自定义的事件：

```vue
<span @click="$emit('hd')">x</span>
emits: {'hd'}
```

对于事件，之前我们是直接写在了标签上，我们也可以将`emit`过程写到我们子组件的方法中，在标签中直接调用这个方法：

```vue
<span @click="Show">x</span>

methods:{
	Show(){
		this.$emit('hd')
	}
}
```

#### 自定义事件的验证

自定义事件在调用的过程中，我们也可以进行验证

```js
// 当值为空的时候，我们是不进行验证的
emits:{
    Show: null
}
// 对传递的参数进行验证，传递的参数应该是数值
emits:{
    Show(v){
        if(/^\d+$/.test(v)){
            return true;
        }
        console.error('传递的值需要是数值');
    }
}
```

后续在`ts`语法中，使用强类型也可以起到这样的效果