## 视图`Viewer`

`Viewer` 是 `Cesium` 的最高级别的组件，`Viewer` 是一切`API`的开始，它封装了很多功能，如场景（`viewer.scene`）、时间线、动画、相机（`viewer.camera`）、信息框、事件处理、实体集合（`viewer.entities`）、数据源管理 （`ewer.dataSources`）等
`Viewer` 的创建通常关联到一个 `HTML `元素，例如一个 `div`：

```js
viewer = new Cesium.Viewer('cesiumContainer', {})
```

`cesiumContainer`是一个`div`的ID；{}中存放`Viewer`对象的一些配置属性，常见的配置：

```js
viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker: false,  // 是否显示图层选择控件
    animation: false, // 是否显示动画控件
    timeline: false,  // 是否显示时间轴控件，和cesuim中的click进行挂接的
    fullscreenButton: false, // 是否显示全屏按钮
    geocoder: false, // 是否显示搜索按钮
    homeButton: false, // 是否显示主页按钮(回到地球初始化的状态)
    navigationHelpButton: false, // 是否显示帮助提示按钮
    sceneModePicker: false,  // 是否显示投影方式按钮
    infoBox: false,  // 是否显示信息框，显示实体相关的属性信息
    sceneMode: window.Cesium.SceneMode.SCENE2D  // 设置问2d模式（默认为3d）
})
```

默认情况下的视图，其精度不是很高，也没有地形的效果，页面初始化会有一些默认的功能部件

***

### 自定义地形服务

我们可以进行自定义的地形服务的引入：默认的地形服务是椭圆（即表面没有任何地形）

```js
terrainProvider: new window.Cesium.CesiumTerrainProvider({
    url: 'http://data.mars3d.cn/terrain',
    requestWaterMask: true,
    requestVertexNormals: true
}),
```

***

### 自定义影像服务

我们也可以自定义地球的影像服务，改变地球的默认影像：

```js
imageryProvider: new window.Cesium.ArcGisMapServerImageryProvider({
    url: 							'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
})
```

***

### 自定义背景天空盒

```js
skyBox: new window.Cesium.SkyBox({
    sources: {
        positiveX: require('@/assets/images/tycho2t3_80_px.jpg'),
        negativeX: require('@/assets/images/tycho2t3_80_mx.jpg'),
        positiveY: require('@/assets/images/tycho2t3_80_py.jpg'),
        negativeY: require('@/assets/images/tycho2t3_80_my.jpg'),
        positiveZ: require('@/assets/images/tycho2t3_80_pz.jpg'),
        negativeZ: require('@/assets/images/tycho2t3_80_mz.jpg'),
    }
})
```

