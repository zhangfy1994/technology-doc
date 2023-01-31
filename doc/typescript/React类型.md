## React 内置类型

### 组件相关

1. JSX.Element

```ts
//JSX.Element是ReactElement的子类型，它没有增加属性，两者是等价的。也就是说两种类型的变量可以相互赋值
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}
```

2. React.ReactElement

```ts
// 通常情况下，函数组件返回ReactElement（JXS.Element）的值。
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T;
  props: P;
  key: Key | null;
}
```

3. React.ReactNode

```ts
// 通常情况下，类组件通过 render() 返回 ReactNode的值。
// ReactElement类型的变量可以直接赋值给ReactNode类型的变量，但反过来是不行的。
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
```

4. CSSProperties

```ts
export interface CSSProperties extends CSS.Properties<string | number> {}

// 使用
const divStyle: React.CSSProperties = {
  width: "11rem",
  height: "7rem",
};
```

### 事件处理

1. Event 事件类型

```ts
// 这些Event事件对象的泛型中都会接收一个Element元素的类型，这个类型就是我们绑定这个事件的标签元素的类型
剪切板事件对象：ClipboardEvent<T = Element>
拖拽事件对象：DragEvent<T = Element>
焦点事件对象：FocusEvent<T = Element>
表单事件对象：FormEvent<T = Element>
Change事件对象：ChangeEvent<T = Element>
键盘事件对象：KeyboardEvent<T = Element>
鼠标事件对象：MouseEvent<T = Element, E = NativeMouseEvent>
触摸事件对象：TouchEvent<T = Element>
滚轮事件对象：WheelEvent<T = Element>
动画事件对象：AnimationEvent<T = Element>
过渡事件对象：TransitionEvent<T = Element>

// 事件对象都是继承基础合成事件
interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget & T;
}

interface FormEvent<T = Element> extends SyntheticEvent<T> {
}

//底层事件类型：
interface SyntheticEvent<T = Element, E = Event>
  extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}

interface BaseSyntheticEvent<E = object, C = any, T = any> {
  nativeEvent: E;
  currentTarget: C;
  target: T;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  preventDefault(): void;
  isDefaultPrevented(): boolean;
  stopPropagation(): void;
  isPropagationStopped(): boolean;
  persist(): void;
  timeStamp: number;
  type: string;
}

// DOM的事件操作（监听和触发），都定义在EventTarget接口上。EventTarget 的类型声明如下：
interface EventTarget {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}
```

使用：

```tsx
<input onChange={(e) => onSourceChange(e)} />;

const onSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e);
};
```

2. 事件处理函数类型

```ts
// T的类型也都是Element，指的是触发该事件的HTML标签元素的类型
// EventHandler会接收一个E，它表示事件处理函数中 Event 对象的类型。bivarianceHack 是事件处理函数的类型定义，函数接收一个 Event 对象，并且其类型为接收到的泛型变量 E 的类型, 返回值为 void
type EventHandler<E extends SyntheticEvent<any>> = {
  bivarianceHack(event: E): void;
}["bivarianceHack"];

type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;
// 剪切板事件处理函数
type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
// 复合事件处理函数
type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
// 拖拽事件处理函数
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
// 焦点事件处理函数
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
// 表单事件处理函数
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
// Change事件处理函数
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
// 键盘事件处理函数
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
// 鼠标事件处理函数
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
// 触屏事件处理函数
type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
// 指针事件处理函数
type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
// 界面事件处理函数
type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
// 滚轮事件处理函数
type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
// 动画事件处理函数
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
// 过渡事件处理函数
type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;
```

## HTML 标签类型

```ts
// 上面的Event事件类型和事件处理函数类型中都使用到了标签的类型。上面的很多的类型都需要传入一个ELement类型的泛型参数，这个泛型参数就是对应的标签类型值，可以根据标签来选择对应的标签类型。这些类型都继承自HTMLElement类型，如果使用时对类型类型要求不高，可以直接写HTMLELement
a: HTMLAnchorElement;
body: HTMLBodyElement;
br: HTMLBRElement;
button: HTMLButtonElement;
div: HTMLDivElement;
h1: HTMLHeadingElement;
h2: HTMLHeadingElement;
h3: HTMLHeadingElement;
html: HTMLHtmlElement;
img: HTMLImageElement;
input: HTMLInputElement;
ul: HTMLUListElement;
li: HTMLLIElement;
link: HTMLLinkElement;
p: HTMLParagraphElement;
span: HTMLSpanElement;
style: HTMLStyleElement;
table: HTMLTableElement;
tbody: HTMLTableSectionElement;
video: HTMLVideoElement;
audio: HTMLAudioElement;
meta: HTMLMetaElement;
form: HTMLFormElement;
```

标签属性类型:

```ts
HTML属性类型：HTMLAttributes
按钮属性类型：ButtonHTMLAttributes
表单属性类型：FormHTMLAttributes
图片属性类型：ImgHTMLAttributes
输入框属性类型：InputHTMLAttributes
链接属性类型：LinkHTMLAttributes
meta属性类型：MetaHTMLAttributes
选择框属性类型：SelectHTMLAttributes
表格属性类型：TableHTMLAttributes
输入区属性类型：TextareaHTMLAttributes
视频属性类型：VideoHTMLAttributes
SVG属性类型：SVGAttributes
WebView属性类型：WebViewHTMLAttributes
```
