## Virtual Dom

本质是 js 对象构成的树状结构，用来描述真实 dom。更新时会 diff 两颗 virtual dom 的不同，然后进行批量更新真实 dom，它避免了直接操作真实 dom，提高渲染效率

## Diff 算法(深度优先遍历算法)

#### 1. tree diff

因为 dom 节点跨层级移动很少，几乎可以忽略不计，所以 tree diff 的策略是： `两颗树只对同一层节点比较，如果节点不同或已删除则不会再比较子节点。只需遍历一次tree，即可完成比较`

#### 2. component diff

- 如果是同一类型的组件，按照原先策略继续向下比较
- 如果是不同类型组件，则会替换掉下面的所有子节点
- 对应 class 组件可以通过 shouldComponentUpdate()来告诉 react 这个组件是否需要 diff
- 通过唯一的 key 也能提高 diff 效率

#### 3. element diff

- 判断 dom 节点能复用就复用
- 比较后如果是新增 dom，就会进行插入操作
- 比较后如果是减少 dom，就会进行删除操作
- 还会比较 dom 文本内容是否一样
