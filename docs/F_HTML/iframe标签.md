## `iframe`标签

`iframe`（内嵌框架）是`HTML`中的一个元素，用于在当前网页中嵌入另一个网页或内容。它提供了一种简单而强大的方式来集成外部内容，如视频、地图、广告或其他网页。

### 常见的属性

- `marginheight`：顶部和底部空白的边距：`marginheight="80"`
- `align`：对齐方式，设置`<iframe>`在所属区域的对其方式：`align="left"`
- `frameborder`：边框控制，0表示`<iframe>`组件没有边框，1表示有边框，也可以对边框宽度进行设置：`frameborder="6"`
- `scrolling`：滚动条设置：`scrolling="yes"`；`yes`表示即使不需要也始终显示滚动条；`no`表示即使需要也不显示滚动条；`auto`表示在需要的情况下出现滚动条

- `name`：通常与`target`一起使用，根据`name`的值跳转到`iframe`中显示，`name`可自定义命名