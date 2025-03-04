## `index.vue`和`crud.tsx`之间的传值

#### `index.vue`传值给`crud.tsx`

`index.vue`中创建`ref`

```js
const props = defineProps({...})
const fooRef = ref(0)
const context: any = {
  fooRef //将fooRef 通过context传递给crud.tsx
  props,
};
```

`crud.ts`中使用`fooRef`

```js
export default function ({ crudExpose, context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const {fooRef,props} = context  // 从context中获取fooRef
  return {
    crudOptions: {
      columns:{
        test:{
          title:'foo',
          valueChange(scope){
            // 使用或者修改 fooRef
            console.log(fooRef.value)
            fooRef.value = scope.value
          }
        }
      }
    }
  }
}
```

#### `crud.tsx`传值给`index.vue`

`crud.tsx` 中创建`ref`

```js
export default function ({ crudExpose, context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const fooRef = ref(0)
  context.fooRef = fooRef //将fooRef 通过context传递给index.vue
  return {
    crudOptions: {
      ...
    }
  }
}
```

`index.vue`中使用`fooRef`

```js
const {crudRef, crudBinding, crudExpose, context} = useFs({createCrudOptions});
const {fooRef} = context //从context中获取fooRef
```

#### 直接将`crud.tsx`写在`index.vue`中

直接将`crud.tsx`写在`index.vue`中，就没有什么传值的问题了，直接正常使用`ref`即可

```js
const fooRef = ref(0)
function createCrudOptions({crudExpose}: CreateCrudOptionsProps): CreateCrudOptionsRet {
  return {
    crudOptions: {
      ...
      //使用或者修改 fooRef
    }
  }
}
```

