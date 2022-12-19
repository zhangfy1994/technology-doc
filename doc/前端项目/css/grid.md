# grid 布局

### 1. 容器属性

- 通过 grid-template-columns 和 grid-template-rows 会产生若干个单元格， 我们的内容会自动往单元格里填充

```css
div {
  // inline-grid 让容器变为行内块元素
  display: grid | inline-grid;

  // 产生几列，及每列的宽度
  grid-template-columns: 100px 100px;

  // repeat函数表示重复多少次，第一个参数可以是 数字 ｜ auto-fit ｜ auto-fill, 第二个参数是具体宽度或模式
  grid-template-columns: repeat(auto-fit, 200px);

  // minmax函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值
  // minmax搭配auto-fit 表示在一行中如果有多余空间（无论多长）则其他项平分，搭配auto-fill表示如果有足够空间就创建空白列，剩余不到一列时才均分该剩余空间
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  // 行间隔
  row-gap: 20px;

  // 列间隔
  column-gap: 20px;

  // 行列间隔简写
  gap: row-gap column-gap;

  // 决定单元格如何填充，row（默认）表示先行后列即先填满第一行，再开始放入第二行，column表示先列后行即先填满第一列，再开始放入第二列
  grid-auto-flow: row;

  // 设置单元格里的内容（即我们的写的元素），在单元格内的水平位置（左中右），默认stretch撑满整个单元格
  justify-items: start | end | center | stretch;

  // 设置单元格里的内容（即我们的写的元素），在单元格内的垂直位置（上中下），默认stretch撑满整个单元格
  align-items: start | end | center | stretch;
}
```
