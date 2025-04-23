## 官方`API`文档学习

#### `Animation`

`Animation`是官方提供的动画小组件，默认在地球左下方的位置，提供了播放，暂停和后退按钮，以及跳转到当前的时间（同步到当前时间，通常显示今天或现在），同时可以控制动画的速度

`new Cesium.Animation (container, viewModel)`

#### `DistanceDisplayCondition`

`new Cesium.DistanceDisplayCondition ( near , far )`

> 描述：根据与相机的距离来确定相关内容的可见性
>
> `near`(`Number`)：可见物体的间隔中的最小距离，默认值为0.0
>
> `far`(`Number`)：物体可见的间隔中最大的距离

例子：`billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10.0, 20.0);`