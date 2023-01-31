## 定义、使用变量

```css
//通常，最佳实践是将CSS变量定义在根伪类:root下，这样就可以在HTML文档的任何地方访问到它了。在使用CSS变量时，使用 var() 函数包裹所需变量的变量名即可
// var() 还有第二个参数——备用值。在发现变量值不可访问的情况下，将使用备用值来代替它
:root {
  --main-bg-color: #c92e33;
}

.div {
  background-color: var(--main-bg-color, red);
}
```

## 变量作用域

- 全局变量

```css
// 要在全局范围内声明变量，就要将变量定义在 :root 选择器中：
:root {
  --primary-color: #000;
}
```

- 局部变量

```css
// 要在局部范围声明变量，只需要在选择器中定义变量即可，这样声明的变量只能在该选择器中使用，如果尝试在其他地方使用，它不会有任何效果
h2 {
  --h2-color: #999;
  color: var(--h2-color);
}

h3 {
  color: var(--h2-color); /* 不生效 */
}
```

## 优先级和继承

```css
// CSS变量和JavaScript变量类似，CSS 变量中的局部作用域优先于全局作用域
:root {
  --color: red;
}

h2 {
  --color: orange;
  color: var(--color); // orange
}

// 如果没有为元素找到变量，它会从其父元素继承变量值
:root {
  --color: red;
}

body {
  --color: orange;
}

h2 {
  color: var(--color); // orange
}
```
