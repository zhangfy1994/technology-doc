# flex

### 1. 容器属性

```css
.box {
  // 容器使用flex布局。inline-flex使容器变成行内块元素
  display: flex | inline-flex;

  // 项目的排列方向
  flex-direction: row | row-reverse | column | column-reverse;

  // 定义如果一条轴线排不下，如何换行。 不换行（默认
  flex-wrap: nowrap | wrap | wrap-reverse;

  // flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
  flex-flow: row nowrap;

  // 定义了项目在主轴上的对齐方式
  justify-content: flex-start | flex-end | center | space-between | space-around;

  //定义项目在交叉轴上如何对齐
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

### 2. 子项目的属性

```css
.item {
  //定义项目的排列顺序。数值越小，排列越靠前，默认为0
  order: <integer>;

  //定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
  flex-grow: <number>;

  //定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
  flex-shrink: <number>;

  //定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
  flex-basis: <length> | auto;

  // 是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
  flex: 0 1 auto;

  // 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
