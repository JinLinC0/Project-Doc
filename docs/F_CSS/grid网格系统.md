## `grid`网格系统

`CSS` 网格布局模块`（CSS Grid Layout Module）`提供了带有行和列的基于网格的布局系统，它使网页设计变得更加容易，而无需使用浮动和定位

`grid`布局可以把容器划分成"行"和"列"，产生单元格，然后指定网格项目`grid item`所在的单元格，是二维布局。`Grid` 布局比` Flex` 布局更强大，但是兼容性较差

网格布局由一个父元素以及一个或多个子元素组成

当 `HTML` 元素的 `display` 属性设置为 `grid` (以生成块级的网格容器)或 `inline-grid` (生成行内的网格容器)时，它就会成为网格容器

```css
.grid-container {
  display: grid;
}
```

网格容器的所有直接子元素将自动成为网格项目

网格列`（Grid Columns）`：网格项的垂直线被称为列

网隔行`（Grid Rows）`：网格项的水平线被称为行

网格间隙`（Grid Gaps）`：每列/行之间的间隔称为间隙；

间隙大小可以调整，如调整列之间的间隙`grid-column-gap: 50px;`，在`.grid-container`中进行设置

也可以进行简写，从而统一设置：`grid-gap: 50px 100px;`   前面数据是行间隙；后面数据是列间隙，如果设置为一个值，表示行列间隙同时设置该大小

网格行`（Grid Lines）`：列之间的线称为列线`（column lines）`；行之间的线称为行线`（row lines）`

行线和列线用于合并单元格

```css
/*把网格项目放在列线 1，并在列线 3 结束它*/
.item1 {
  grid-column-start: 1;
  grid-column-end: 3;
}
```

也可以通过简写`grid-column`属性来进行单元格的合并

```css
/*使 "item1" 从第 1 列开始并在第 5 列之前结束*/
.item1 {
  grid-column: 1 / 5;
}
/*使 "item1" 从第 1 列开始，并跨越 4 列*/
.item1 {
  grid-column: 1 / span 4;
}
/*上述两种方式的结果是一样的*/
```

`grid-row`属性是 `grid-row-start` 和` grid-row-end` 属性的简写属性

```css
/*使 "item1" 在 row-line 1 开始，在 row-line 4 结束*/
.item1 {
  grid-row: 1 / 4;
}
```

`grid-area` 属性用作 `grid-row-start`、`grid-column-start`、`grid-row-end` 和 `grid-column-end` 属性的简写属性

```css
/*使 "item8" 从 row-line 1 和 column-line 2 开始，在 row-line 5 和 column line 6 结束*/
.item8 {
  grid-area: 1 / 2 / 5 / 6;
}
/*使 "item8" 从 row-line 2 和 column-line 开始，并跨越 2 行和 3 列*/
.item8 {
  grid-area: 2 / 1 / span 2 / span 3;
}
```

`grid-template-areas`属性一般与`grid-area`一起使用，`grid-template-areas`属性在容器上制定各个区域并命名

`grid-area`：`grid-area`属性指定项目放在哪一个区域内

```css
/*item1 的名称是 "myArea"，并跨越五列网格布局中的所有五列*/
.item1 {
  grid-area: myArea;
}
.grid-container {
  grid-template-areas: 'myArea myArea myArea myArea myArea';
  /*grid-template-areas: 'myArea myArea . . .';*/
}
/*每行由撇号（' '）定义,每行中的列都在撇号内定义，并以空格分隔,句号.表示没有名称的网格项目*/
/*如需定义两行，请在另一组撇号内定义第二行的列*/
grid-template-areas: 'myArea myArea . . .' 'myArea myArea . . .';
/*命名所有项目，并制作一张随时可用的网页模板*/
.item1 { grid-area: header; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: right; }
.item5 { grid-area: footer; }

.grid-container {
  grid-template-areas:
    'header header header header header header'
    'menu main main main right right'
    'menu footer footer footer footer footer';
} 
```

网格布局允许我们将项目放置在我们喜欢的任意位置，通过`grid-area`进行项目的位置选择：

```css
/*将数据放到从row-line 1和column-line 2开始，在row-line 5和column line 6结束这一个位置*/
.item1 { grid-area: 1 / 3 / 2 / 4; }  
<div class="item1">1</div>
```

`grid-template-columns`属性定义网格布局中的列数，并可定义每列的宽度（单位为px）

如果您希望网格布局包含 4 列，请指定这 4 列的宽度；如果所有列都应当有相同的宽度，则设置为` "auto"`

```css
/*生成包含四列的具有相同宽度的网格*/
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
```

`grid-template-rows`属性定义每行的高度，有几行就输入几个高度值

`justify-content`属性用于在容器内对齐整个网格

网格的总宽度必须小于容器的宽度，这样` justify-content `属性才能生效

` justify-content `属性有以下的枚举值：

|     枚举值      |                             描述                             |
| :-------------: | :----------------------------------------------------------: |
|  `flex-start`   |           左对齐（默认值），所有容器在网格中左对齐           |
|   `flex-end`    |                            右对齐                            |
|    `center`     |                             居中                             |
| `space-between` |                两端对齐，项目之间的间隔都相等                |
| `space-around`  | 每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间隔大一倍 |
| `space-evenly`  | 项目是分布的，以便任何两个项目之间的间距（和边缘的空间）相等 |

`align-content`属性用于垂直对齐容器内的整个网格

`align-content` 属性有以下的枚举值：

|     枚举值      |                             描述                             |
| :-------------: | :----------------------------------------------------------: |
|  `flex-start`   |           上对齐（默认值），所有容器在网格中上对齐           |
|   `flex-end`    |                            下对齐                            |
|    `center`     |                             居中                             |
| `space-between` |                两端对齐，项目之间的间隔都相等                |
| `space-around`  | 每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间隔大一倍 |
| `space-evenly`  | 项目是分布的，以便任何两个项目之间的间距（和边缘的空间）相等 |

