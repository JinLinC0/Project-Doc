## 在线`Cesium`项目

### `Sandpack`安装配置

安装`andpack`：`npm i sandpack-vue3`

安装文件资源管理器：`npm install sandpack-file-explorer`

`showNavigator`在展示界面引入顶部组件

安装本地依赖库：`npm install --save-dev tsup`

```vue
<div v-for="item in elementData" :key="item.id" @click="indexBtn(`first${item.title}`)">
    <span>{{item.title}}</span>
    <img :src="item.pngUrl" width="300">
</div>
```

***

### 遇到的问题

- 添加天气系统发现`cesium`的版本不能使用`1.99`的版本，不然使用天气系统

- 获取代码的更目录：`../../`

- 图片渲染不出来：`@`无法被识别，在`ElementMap.js`文件中不能使用@，要重新用回`/src`

- 控制台报错：

  ```txt
  [Vue warn]: Invalid event arguments: event validation failed for event "click".
  ```

  这个报错的原因是因为在使用`el-menu`绑定`click`事件时，必须要在组件的内部加上`index`属性：

  ```vue
  <el-menu-item v-for="item in elementLineData" :key="item.id" :index="item.title" @click="goAnchor(item.title)">
      <el-icon><View /></el-icon>
      <span>{{item.title}}</span>
  </el-menu-item>
  ```



