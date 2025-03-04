## `columns`的配置

在`crudOptions`中，最重要的是`columns`的配置

```tsx
const crudOptions ={
    columns:{
        key:{                              // 字段的key
            title:'字段名',                 // 字段名称
            type:'dict-select',            // 字段类型
            dict: dict({url:'/dict/get'}), // 字典配置（如果组件需要）
            column:{ component:{} },       // 列配置
            form:{ component:{} },         // 表单字段公共配置
            // 以下是独立配置，会与上面的form配置合并。一般不需要配置
            addForm:{ component:{} },      // 添加表单字段独立配置
            viewForm:{ component:{} },     // 查看表单字段独立配置
            editForm:{ component:{} },     // 编辑表单字段独立配置
            search:{ component:{} },       // 查询表单字段独立配置
            valueBuilder(){},          // 值构建，具体请参考api/crud-options/columns.html文档
            valueResolve(){}               // 值解析
        }
    }
}
```

