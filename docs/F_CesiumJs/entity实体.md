## `entity`实体

`Cesium`丰富的空间数据可视化`API`分为两部分：`Primitive API `面向三维图形开发者，更底层一些，`Entity API `是数据驱动更高级一些，它们把可视化和信息存储到统一的数据结果中，这个对象叫`Entity`

***

### 创建实体

#### 点`point`

```js
const point = viewer.entities.add({
    id: 'point',
    position: Cesium.Cartesian3.fromDegrees(120, 30), //经纬度转笛卡尔坐标
    point: {
        color: Cesium.Color.BLUE,
        pixelSize: 20
    }
})
viewer.zoomTo(point)  // 将视图缩放到指定的实体，使其在视图中居中显示
```

#### 标注`billboard`

```js
const billboard = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(120, 30, 10),
    billboard: {
        image: '/src/assets/position.png'.  // 图片代替标注点
        scale: 0.3,
        color: Cesium.Color.YELLOW
    }
viewer.zoomTo(billboard)
```

#### 标签`label`

```js
const label = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(120, 30),
    label: {
      text: '标签内容',
      fillColor: Cesium.Color.YELLOWGREEN,  // 标签文本字体颜色
      showBackground: true,
      backgroundColor: new Cesium.Color(255, 255, 0)  // 标签背景颜色
    }
})
viewer.zoomTo(label)
```

#### 线`line`

```js
const line = viewer.entities.add({
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([120, 30, 121, 30]),  // 线的起始和结束经纬度
        material: Cesium.Color.YELLOW, // 线的颜色
        width: 5
    }
})
viewer.zoomTo(line)
```

#### 面`polygon`

```js
const polygon = viewer.entities.add({
  polygon: {
    hierarchy: {
      positions: Cesium.Cartesian3.fromDegreesArray([120, 29, 121, 29, 120.5, 28]),  // 三个以上的点构成面
    },
    material: Cesium.Color.RED.withAlpha(0.5),  // 设置填充颜色并设置透明度
    height: 10000,  // 离地面高度
    extrudedHeight: 20000,  // 拉伸高度
    outline: true, // 比较拉伸后使用
    outlineColor: Cesium.Color.WHITE, // 面边界线的颜色
    fill: false   // 是否填充
  }
})
viewer.zoomTo(polygon)
```

#### 实体`box`

##### 长方形柱体

```js
const box = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(120, 30, 3000),
  box: {
    // 参数表示实体的长度，宽度和高度，单位都为米
    dimensions: new Cesium.Cartesian3(2000, 1000, 3000), 
    material: Cesium.Color.BLUEVIOLET // 图片的话直接写路径即可在上面显示图片
  }
})
viewer.zoomTo(box)
```

##### 圆柱体

```js
const ellipse = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(118, 30),  // 位置信息
    ellipse: {
        semiMajorAxis: 500,   // 长半轴长度
        semiMinorAxis: 300,   // 短半轴长度
        material: Cesium.Color.YELLOWGREEN,  // 填充颜色
        extrudedHeight: 400.0,   // 椭圆的凸出面相对于椭圆表面的高度
        rotation: Math.PI / 2  // 椭圆从北方逆时针旋转的角度
    }
})
viewer.zoomTo(ellipse)
```

#### 三维模型

加载三维模型和前面其他的可视数据区别不大，只需要`entity`带`position`属性和一个指向`glTF`模型资源的`uri`径即可··

 ```js
const entity = viewer.entities.add({
    position : Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    model : {
        uri : '../Apps/SampleData/models//GroundVehicle.glb'
    }
});
viewer.trackedEntity = entity;
 ```

***

### 删除实体

```js
// 方式一:直接删除remove
viewer.entities.remove(point1)

// 方式二:先查再删
const entity = viewer.entities.getById('id1')
viewer.entities.remove(entity)

// 方式三:全删
viewer.entities.removeAll()
console.log(viewer.entities)
console.log(point2) // 实体变量还存在，只是不在viewer.entities.values中

//方式四:先拿后删
const entity = viewer.entities.getById(entity) // 通过ID获取
viewer.entities.remove(entity)
```

