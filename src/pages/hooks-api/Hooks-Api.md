---
title: 'Hooks API'

date: '2019-01-10'

spoiler: React Hooks API 手动熟肉
---

我们可以通过Hooks的API来解决绝大部分开发中遇到的问题。下面我会根据官网的生肉结合自己的理解来进行介绍：

## Basic Hooks

### `useState`

```jsx
const [state, setState] = useState(initialState)
```

返回`state`值和更新它的函数。

在render初始化的时候，返回的`state`值和被传入的`initialState`值相同。

`setState`这个方法被用来更新`state`，它接收一个新的`state`值并对组件进行重新渲染。

```jsx
setState(newState)
```

在随后的渲染过程中，`useState`返回的第一个值将始终是更新后的最新状态。

如果最新的`state`是通过使用之前的`state`来计算的，那么可以给`setState`传一个方法。

```jsx
funciton Counter({initialCout}) {
	const [count, setState] = useState(initialCount)
  return (
  	<div>
       Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
    </div>
  )
} 
```

与Class组件的`setState`不同，`useState`不会自动合并来更新对象。你可以使用下面方式来更新：

```jsx
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});
```

#### 惰性初始状态

`initialState` 参数是在初始化render时候使用的。在随后的render中，它被忽略了。如果初始状态是经过昂贵计算的结果，你可以用函数来替换，并且这个函数紧在初始化渲染的时候被执行

```jsx
const [state, setState] = useState(() => {
	const initialState = someExpensiveComputation(props)
  return initialState
})
```

#### 不触发state的更新

如果你更新的state钩子和当前的值一样，React将不会触发渲染子节点或者副作用。

### `useEffect`

```jsx
useEffect(didUpdate)
```

接收包含指令式的，肯能有副作用代码的函数。

函数式组件的主题不允许使用变异，订阅，计时器，日记记录和其他的副作用。这样会导致在UI中存在令人困惑的bug和不一致性。

相反的，使用`useEffect`。传给`useEffect`的函数将会在render被应用到屏幕上之后执行。将副作用看做一个从React纯函数式的世界进入命令式世界的逃生舱。

在默认情况下，副作用在每一次完整的render后执行，但是我们能选择在只有默写特定的值被改变的时候触发它。

#### 清除副作用

通常，当副作用需要被清除，它会在组件被销毁之前创建资源，例如订阅或者计时器ID。为此，传递给`useEffect`的函数可能会返回一个清除函数。例如，来创建一个订阅：

```jsx
useEffect(() => {
  const subscription = props.source.subscribe()
  return () => {
    subscription.unSubscribe()
  }
})
```

清除函数在组件从UI删除的时候执行，以防止内存泄漏。此外，若果一个组件被渲染多次（通常都是这样的），**当前副作用会在执行下一个副作用前被清除**。

#### 副作用运行的时间

与`componentDidMount` 和`componentDidUpdate`不用的是，在一个推迟的事件中，被传入`useEffect`方法在布局和绘制之后被触发。这使得它适用于许多常见的副作用，例如设置订阅和事件处理，因为大多数类型的操作不应阻止浏览器更新屏幕。

但是，不是所有的副作用都是可以被推迟的。例如，用户可见的DOM变动必须在下一次绘制之前同步触发，以便用户不会感觉到视觉上的不一致。

对于这些副作用，React提供了一个额外的钩子叫做`useLayoutEffect`。它与`useEffect`类似，仅在触发时有不同。

虽然`useEffect`会被推迟到浏览器绘制之后，它被保证在任何render之前被触发。在开始新的更新之前，React将会始终刷新当前render的副作用。

#### 条件触发副作用

副作用的默认行为是在所有render完成后触发副作用。这种方式下，如果它们中的一个传参改变了，副作用始终会被重复创建。

但是，这在某些情况下会有点过，比如上一部分中的订阅例子。当props改变的时候，我们不需要在每一次更新的时候创建一个新的订阅。

要实现这个，给`useEffect`传入第二个参数，那就是副作用依赖的值组成的数组：

```jsx
useEffect(
	() => {
	const subscription = props.source.subscribe()
    return () => {
      subscription.unsubscribe()
    }
	},
	[props.source]
)
```

现在只有在`props.source`更改时才会重新创建订阅。

传入一个空数组`[]`来传参，告诉React当前副作用不依赖于组件中的任何值。因此这个副作用仅会在`mount`和`unmount`中执行，他不会在`update`中执行。

### `useContext`

```jsx
const context = useContext(Context);
```

接受`Context`对象（从`React.createContext`返回的值）并返回当前`Context`值，由给定`context`的最近的`Provider`给出。

当`Provider`进行刚更新，这个Hook会触发拥有最新`Context`值的渲染器。

## Additional Hooks

### `useReducer`

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

`useState`的替代方案， 接受类型为`(state，action) => newState`的reducer，并返回与dispatch方法配对的当前状态。 

`useReducer`通常优先于`useState`，当具有涉及多个子值的复杂状态逻辑或下一个状态取决于前一个状态时。`useReducer`同时也允许优化触发深度更新的组件的性能，因为你能传递`dispatch`而不是`callbacks`。

这是`useState`部分的计数器示例，使用reducer重写：

```jsx
const initialState = {count: 0}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      throw new Error()
  }
}

function Counter({initialState}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```

#### 指定初始状态

初始化useReducer状态有两种不同的方法。 您可以根据用例选择其中一个。最简单的方法是将初始状态作为第二个参数传递：

```jsx
const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
)
```

#### 惰性初始化状态

您还可以惰性的创建初始状态。 为此，您可以将`init`函数作为第三个参数传递。 初始状态将设置为`init(initialArg)`。

它允许抽出用于计算reducer外部的初始状态的逻辑。 这对于稍后重置状态以响应操作也很方便：

```jsx
function init(initialCount) {
  return {count: initialCount}
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    case 'reset':
      return init(action.payload)
    default:
      throw new Error()
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init)
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```

#### 不触发dispatch

如果从Reducer Hook返回与当前状态相同的值，则React将退出而不渲染子项或触发效果。（React使用[`Object.is` comparison algorithm。](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description)）。

### `useCallback`

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

返回一个memoized回调。

传入内联回调和一组输入。 `useCallback`将返回一个memoized版本，该`callback`仅在其中其中传参发生更改时才会更改。 将`callbacks`传递给通过依赖引用相等来防止不必要的渲染的优化过的子组件（例如，`shouldComponentUpdate`）时，这非常有用。

`useCallback(fn, inputs)` 相当于 `useMemo(() => fn, inputs)`。

### `useMemo`

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

 返回一个memoized值。

传入“创建”函数和数组。` useMemo`只会在其中一个输入发生变化时重新计算memoized值。 此优化有助于避免在每个渲染上进行昂贵的计算。

请记住，传入给`useMemo`的函数在渲染期间运行。 不要做那些在渲染时通常不会做的事情。 例如，副作用属于`useEffect`，而不是`useMemo`。

如果未提供数组，则只要将新函数实例作为第一个参数传递，就会计算新值。 （使用内联函数，在每个render上。）

你可以依赖`useMema`来性能优化，而不是语义保证。 将来，React可能会选择“忘记”一些以前的memoized值，并在下一次render时重新计算它们，例如 为屏幕外组件释放内存。写代码时，使其在没有`useMemo`的情况下仍可正常工作，然后添加它以优化性能。

### `useRef`

```jsx
const refContainer = useRef(initialValue);
```

`useRef`返回一个可变的ref对象，其`.current`属性被初始化为传递的参数（`initialValue`）。 返回的对象将持续整个组件的生命周期。

常见的一个案例是用来访问一个子命令：

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### `useImperativeHandle`

```jsx
useImperativeHandle(ref, createHandle, [inputs])
```

` useImperativeHandle`自定义使用ref时公开给父组件的实例值。 与往常一样，在大多数情况下应避免使用`refs`的命令式代码。 `useImperativeHandle`应与`forwardRef`一起使用：

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

在上面这个例子中，父组件渲染的`<FancyInput ref={fancyInputRef} />`会被 `fancyInputRef.current.focus()`调用。

### `useLayoutEffect`

含义与`useEffect`相同，但在所有DOM改变后它会同步触发。 使用它从DOM读取布局并同步重新渲染。 在浏览器有机会绘制之前，在`useLayoutEffect`中计划的更新将同步刷新。

在可能的情况下首选`useEffect`以避免阻塞视觉更新。

### `useDebugValue`

```jsx
useDebugValue(value)
```

`useDebugValue`可用于在React DevTools中显示自定义挂钩的标签。 

例如：

```jsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

## 总结

对于这些API还需要在实际项目中练习。