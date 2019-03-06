---
title:Hooks惊鸿一瞥
date:'2019-01-03'
soplier:React Hooks从入门到懵逼
---

> Hooks是React 16.8中新增的内容，它可以让你在class之外使用state和其他React特性。下面是我根据React官方文档和Dan大佬博客的一些总结，算是一个简单的入门。

```jsx
import React, { useState } from 'react'
function Example() {
  // 声明一个叫做count的新state变量
	const [count, setCount] = useState(0)
  
  return (
  	<div>
    	<p>You clicked {count} tiems</p>
      <button onClick={() => setCount(count + 1)}>
      	Click Me
      </button>
    </div>
  )
}
```

上面的`useState`方法是我们将要学习的第一个"Hook"。之后会介绍，我们先来看看关于Hooks的简介

## 介绍Hooks

### 没有突破性改动的地方

- **完全可选**。你可以在几个组件中尝试Hooks，而不需要重写任何代码。若果你不想使用的话，你并不是必须要立马使用学习和使用Hooks，
- **100%向后兼容**Hooks不包含任何突破性的改动
- **现在可使用**。现在Hooks可以在16.8.0版本中使用

**现在没有任何计划从React中移除Class。**

**Hooks不会取代你对React概念的理解。**恰恰相反，Hooks为你已经了解的React概念提供了更多直接的API，例如props，state，context，refs和生命周期。Hooks也提供了一种全新的强力方式来整合他们。

### 动机

Hooks解决了在React中看似无关但是在编写和维护海量组件出现的问题。

#### 跨组件复用状态逻辑很困难

React没有提供一种将可复用的行为“attach”到组件上的方式（比如redux的connect方法）。React需要一些更好的底层元素来复用状态逻辑。

通过使用Hooks，您可以从组件中提取状态逻辑，以便可以独立测试并重复使用。**Hooks允许您在不更改组件层次结构的情况下复用状态逻辑。**

#### 复杂组件变的难以理解

**Hooks允许你将一个组件根据相关的部分（比如设置订阅或获取数据）拆分成更小的方法**

#### 人们和机器对Class感到困惑

**Hooks可以使你在Class之外使用更多的React特性**从概念上讲，React组件也是更接近于函数的。Hooks基于函数，但是并不会修改React的基本概念。

## Hooks惊鸿一瞥

### State Hook

#### 声明多个状态变量

```jsx
function ExampleWithManyStates() {
  const [age, setAge] = useState(0)
  const [fruit, setFruit] = useState('apple')
  const [todos, setTodos] = useState([{ text: 'watch a movie'}])
}
```

通过调用`useState`我们声明了一些状态变量，我们可以使用[数组解构](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)语法赋予这些状态变量不同的名字。这些名字不是`useState` API的一部分。 相反，当你多次调用`useState`时，React假定你在每一次渲染中以相同的顺序调用它们。

#### 什么是Hook

Hooks是一些让你与React state和函数式组件的生命周期特性挂钩的方法。Hooks不在Class中运行，它让你在不使用Class的情况下使用React。

### Effect Hook

你可能已经在React组件中执行数据获取，订阅或者手动更改`DOM`。我们把这些操作称之为`Side effects`(或者简称为`effects`)

这些Effect Hook，`useEffect`，为函数式组件新增了执行副作用的能力。它与React Class中的`componentDidMount`，`componentDidUpdate`以及`componentWillUnmount`拥有相同的用途，但是统一为单个的API。

举个🌰，下面这个组件在React更新DOM后设置document的标题

```jsx
import React, { useState, useEffect } from 'react'
function Ex() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
  return (
  	<div>
    	<p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
      	Click Me
      </button>
    </div>
  )
}
```

当你调用`useEffect`，就是告诉React在刷新DOM之后运行你的副作用函数。Effects在组件内部声明，所以它可以使用组件的props和state。默认情况，React在每一个render（包括第一render）后运行副作用。

Effects还可以选择通过返回一个函数来指定如何“回收”它们。 例如，此组件使用Effects来订阅朋友的在线状态，并通过取消订阅来清理：

```jsx
import React, { useState, useEffect } from 'react'

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }
  useEffect(() => {
    ChatAPI.subscribeToFreindStatus(props.friend.id, handleStatusChange)
    return () => ChatAPI.unsubscribeFromFreindStatus(props.friend.id, handleStatusChange)
  })
  
  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```

在此示例中，当组件卸载时，以及在由于后续渲染而重新运行Effects之前，React将取消订阅我们的`ChatAPI`。

像使用`useState`一样,你可以在一个组件中使用多个副作用： 

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

Hooks让你你可以在组件中按照代码块的相关性组织副作用，而不是基于生命周期方法强制进行切分。

### Hooks规则

Hooks是JavaScript函数，但是它强加了两个额外的规则：

- 只有在**顶层**调用Hooks，不要在循环，控制流和嵌套的函数中调用Hooks。
- 只有在**React函数组件**中调用Hooks，不要在常规的JavaScript函数中调用Hooks。

### 构建你自己的Hooks

有时，我们希望在跨组件间复用一些状态逻辑。对于这个问题有两种常见的解决方案：高阶组件和渲染属性。自定义Hooks可以解决这个问题而不用在你的组件树中添加更多的组件。

在此之前，我们展示了一个`FriendStatus` 组件，它可以调用`useState`和`useEffect`钩子来订阅一个朋友的在线状态。假设我们想要在其他的组件中复用这个订阅逻辑。

首先，我们要把这个逻辑抽取到名为`useFriendStatus`的自定义Hook中： 

```jsx
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

它使用了`friendID`作为一个参数，并且返回朋友是否在线。

我们现在可以同时在两个组件中使用它：

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```jsx
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

两个组件中的状态是完全独立的。Hooks只复用状态逻辑而不是状态本身。事实上，每一次调用Hook都会得到一个完全孤立的状态，所以你甚至可以在同一个组件中使用两次相同的自定义Hook。

自定义Hooks更多的是一个约定而不是特性。如果一个函数的名字以 ”`use`” 开头并且调用了其他的Hooks，我们就称它为自定义Hook。`useSomething`的命名约定方便语法检查插件找到代码中Hooks的错误使用。

### 其他 Hooks

还有一些不太常用的内置钩子，也许你会觉得非常有用。使用[`useContext`](https://react.docschina.org/docs/hooks-reference.html#usecontext)可以订阅React context而不用引入嵌套： 

```jsx
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

[`useReducer`](https://react.docschina.org/docs/hooks-reference.html#usereducer)则允许你使用一个reducer来管理一个复杂组件的局部状态：

```jsx
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ... 
```

## 总结

**React Hooks 要解决的问题是状态共享**，是继 [render-props](http://link.zhihu.com/?target=https%3A//reactjs.org/docs/render-props.html) 和 [higher-order components](http://link.zhihu.com/?target=https%3A//reactjs.org/docs/higher-order-components.html) 之后的第三种状态共享方案，不会产生 JSX 嵌套地狱问题。其中各种奥妙带我继续学习后，慢慢品味。

![真香](../真香.gif)

 