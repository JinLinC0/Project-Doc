## `component`组件配置项

组件配置项`component`，一般用来对具体的组件进行具体的配置

```js
component:{   // 组件配置
  name: 'fs-dict-select', // 表单组件名称，支持任何v-model组件
  // name: shallowRef(SubTable),局部引用组件，见嵌套表格示例

  // v-model绑定属性名，element一般为'modelValue'（可以不传）
  // antdv一般为'value'，必须要传
  // 也可以是其他支持v-model属性名，比如a-checkbox的checked属性
  vModel: 'modelValue', 

  disabled: false, // 组件是否禁用
  readonly: false, // 组件是否是只读
  show: true, // 是否显示该组件
  on:{ // 组件事件监听
    onClick(context){console.log(context)} // 监听组件的事件
  },
  children:{ // 组件的插槽(仅支持jsx)
     default:(scope)=>{  // 默认插槽
        return (<div>{scope.data}</div>)
     },
     slotName:(scope)=>{  // 具名插槽
        return (<div>{scope.data}</div>)
     }
  },

  // html属性,会直接传递给dom
  style:{width:'100px'},
  class:{'mr-5':true},

  // 还可以在此处配置组件的参数，具体参数请查看对应的组件文档，不同组件参数不同
  separator:",",        // 这是fs-dict-select的参数
    
  // fs-dict-select内部封装了el-select组件，所以此处还可以配置el-select的参数
  // 如果ui用的是antdv，则支持a-select的参数
  filterable: true,     // 可过滤选择项,
  multiple: true,       // 支持多选
  clearable: true,      // 可清除
    
  // 如果组件的参数与上面的参数有冲突，则需要配置在props下。
  props:{
    // 比如name、vModel、props、on、children等等
    // 如果你要用的组件里面需要配置以上这些名字的参数的话，可以配置在此处
  }

}
```

