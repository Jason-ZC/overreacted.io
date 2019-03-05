---
title: 'D3.js从入门到懵逼'
date: '2018-08-15'
spoiler: 数据可视化之D3js入门
---

![1537167339629](/Users/jason/Desktop/pic/D3/1537167339629.jpg)

在数据可视化的世界里，使用一款可视化插件绝对会使你事倍功半。目前市场上主要的可视化插件我接触到的主要有百度的[Echarts](http://echarts.baidu.com/)，HIGHSOFT出品的[Highcharts](https://www.hcharts.cn/)，以及本次的主角D3.js。一般来说我比较倾向使用Echarts和D3.js，使用这两个插件可以解决绝大多数的可视化需求，而且这两款插件是开源且商业免费，Highcharts虽然开源，但是商业使用需要授权。

## 何谓D3

> Github:[https://github.com/d3](https://github.com/d3/d3)
>
> 官网地址:[https://d3js.org](https://d3js.org)

**D3.js**（Data-Driven Documents）是基于数据驱动文档工作方式的一款JavaScript函数库，主要用于网页作图、生成互动图形，是最流行的可视化库之一。D3使你有能力借助HTML，SVG和Canvas(D3.V4支持)来生动地可视化各种数据。D3不需要你使用某个特定的框架，它的重点在于对现代主流浏览器的兼容，同时结合了强大的可视化组件，以数据驱动的方式去操作DOM。

## 核心SVG

D3主要支持的是对SVG的操作。SVG意思是可缩放矢量图形（Scalable Vector Graphics），是一种基于可扩展标记语言（XML），用于描述二维矢量图形的图形格式。SVG有以下特性：

- SVG是一种矢量图形，对图像进行放大缩小不会失真，相对于Canvas不依赖分辨率。

- SVG 使用 XML 格式来定义图形，除了 IE8 之前的版本外，绝大部分浏览器都支持 SVG，可将 SVG 文本直接嵌入 HTML 中显示。
- SVG基于XML，所以支持事件处理器。
- SVG图形都可以视为对象，改变对象的属性，图形也会改变。

## 何时用D3

那么何时使用D3呢。由于D3和Echarts在Version 4.0前分别支持SVG和Canvas（4.0版本后均支持）。所以SVG的特性一定程度上决定了何时使用D3。Echarts 提供的大量现成图表可以满足大部分的需求，然而，对于数据可视化一般会有一些定制化的需求，这个时候可以使用更加底层的D3，当然学习成本也会高上许多。Echarts缺失灵活性的同时，带来的是使用上的便利。就好像Echarts是开袋即食，但是D3需要你好好烹饪。D3 是基于 DOM 操作的，这样可以设置灵活精确的交互，但是频繁的操作 DOM 十分消耗性能，浏览器肯能出现闪烁、卡顿等现象。

综上，如果业务需求在数据量大交互不多的情况下，用基于Canvas的Echarts性能较好。如果业务需求在数据量小交互较多的情况下，用D3可以游刃有余。当然，4.0版本后D3和Echarts对SVG和Canvas的兼容会大大降低你的选择难度，想要开箱即用使用Echarts，想要妙手生花请选择D3。

## D3的基本操作

### 安装

npm：

```shell
npm install D3
```

直接从[d3js.org](https://d3js.org/)下载，使用[CDNJS](https://cdnjs.com/libraries/d3)或[unpkg加载](https://unpkg.com/d3/)下载：

```javascript
<script src="https://d3js.org/d3.v5.js"></script>
```

压缩版本：

```javascript
<script src="https://d3js.org/d3.v5.min.js"></script>
```

只引入单个模块，比如`d3-selection` 模块：

```javascript
<script src="https://d3js.org/d3-selection.v1.js"></script>
```

使用 `import` 语法引入具体的 D3 模块：

```javascript
import {scaleLinear} from "d3-scale"
```

使用` import` 语法引入整个 D3：

```javascript
import * as d3 from "d3"
```

在Node中引入D3：

```javascript
var d3 = require("d3")
```

针对多个D3模块独立引入后合并至 d3 命名空间

```javascript
var d3 = Object.assign({}, require("d3-format"), require("d3-geo"), require("d3-geo-projection"))
```

### 选择器

通过原生的 [W3C DOM API](http://www.w3.org/DOM/DOMTR) 来修改文档是很无聊的：方法名冗余，并且对多个元素进行操作时需要循环操作,例如改变 `p` 元素的颜色: 

```javascript
var paragraphs = document.getElementsByTagName("p")
for (var i = 0; i < paragraphs.length; i++) {
	var paragraph = paragraphs.item(i)
	paragraph.style.setProperty("color", "white", null)
}
```

D3采用声明式方法，可以对任意节点以及节点集合进行操作，则上述例子可以修改为: 

```javascript
d3.selectAll("p").style("color", "white")
```

同时，可以操作其他节点，而不相互影响: 

```javascript
d3.select("body").style("background-color", "black")
```

### 动态属性

熟悉 [jQuery](http://jquery.com/) 或者 [Prototype](http://www.prototypejs.org/) 的同学可能会立即发现D3与这些框架的相似之处。但是不同的是，样式、属性以及其他属性的值在 D3中可以是函数形式，而不仅仅是常量。

这个功能十分强大，它可以支持动态设置属性、样式等值。比如随机的为每个段落设置颜色: 

```javascript
d3.selectAll("p").style("color", function() {
	return "hsl(" + Math.random() * 360 + ",100%,50%)"
})
```

 或者为奇偶段落设置不同的颜色: 

```javascript
d3.selectAll("p").style("color", function(d, i) {
	return i % 2 ? "#fff" : "#eee"
});
```

这种通过匿名函数动态设置属性、样式值的方法常用来绑定数据。数据被定义在一个数组中，并且每一个数据值可以作为这个函数的参数，此外还有索引等参数，比如根据数据值设置不同的字体大小: 

```javascript
d3.selectAll("p")
	.data([4, 8, 15, 16, 23, 42])
  .style("font-size", function(d) { return d + "px" })
```

一旦为元素绑定数据之后，后续如果需要操作就不需要重新绑定,D3会搜索已经绑定的数据。也就是可以一次绑定，多次使用。 

### enter和exit操作

数据绑定的时候可能出现 `DOM` 元素与数据元素个数不匹配的问题，D3允许使用`enter` 操作用来添加新的 `DOM` 元素，`exit` 操作用来移除多余的 `DOM` 元素。

如果数据元素多于 `DOM` 个数时用 `enter`，如果数据元素少于 `DOM`元素，则用 `exit`。

数据元素个数多于 `DOM` 元素个数，如以下例子，如果文档中`p`标签的个数少于数组个数(6个),则使用 `enter` 和 `append` 操作来补齐 `DOM` 元素:

```javascript
d3.select("body")
	.selectAll("p")
	.data([4, 8, 15, 16, 23, 42])
	.enter().append("p")
	.text(function(d) { return "I’m number " + d + "!" })
```

假设`p`元素的个数多于 6 个，数据元素个数为 6，则： 

```javascript
var p = d3.select("body")
	.selectAll("p")
	.data([4, 8, 15, 16, 23, 42])
	.text(function(d) { return d })
p.exit().remove()  //移除多余的元素
```

但是在实际应用中，不可能先去统计一下元素个数，因此`enter`和 `exit`可以一起使用，就可以自由的根据数据元素动态的修改 `DOM` 元素了: 

```javascript
var p = d3.select("body")
	.selectAll("p")
	.data([4, 8, 15, 16, 23, 42])
	.text(function(d) { return d }) 

// Enter
p.enter().append("p")
    .text(function(d) { return d })

// Exit 
p.exit().remove()
```

### 过度

`D3` 支持动画效果，这种动画效果可以通过对样式属性的过渡实现。其补间插值支持多种方式，比如线性、弹性等。此外 `D3` 内置了多种插值方式，比如对数值类型、字符类型路径数据以及颜色等。

比如对元素的背景颜色进行过渡:

```javascript
d3.select("body").transition()
    .style("background-color", "black")
```

此外还可以为一组元素设置不同的延迟:

```javascript
d3.selectAll("circle").transition()
    .duration(750)
    .delay(function(d, i) { return i * 10 })
    .attr("r", function(d) { return Math.sqrt(d * scale) })
```

## D3常用的模块

D3之前的API文档陈列着成堆的方法，但是没有规整，用户使用起来很麻烦。现在D3.V4将这些API整合成了一个个的模块，方便用户使用，以下我们从中挑选一些常用的模块来进行下简单的介绍。

### d3-selection

`d3-selection`模块允许对DOM进行强大的数据驱动转换，设置属性，样式，属性，HTML或文本内容等。使用data join的`enter`和`exit`的选择操作，你还可以新增或删除元素来响应数据中的改变。

`d3-selection`中的方法通常返回当前选择或新选择，允许通过链式语法来简洁的进行多个操作。例如，要设置当前文档中所有段落元素的类和颜色样式： 

```javascript
d3.selectAll("p")
    .attr("class", "graf")
    .style("color", "red")
```

这相当于：

```javascript
var p = d3.selectAll("p")
p.attr("class", "graf")
p.style("color", "red")
```

选择这个操作是不可变的。影响选择元素（或其顺序）的所有选择方法都返回新的选择器而不是修改当前选择。但请注意，元素必然是可变的，因为选择驱动文档的转换！

### d3-scale

`d3-scale`是D3中一个重要的模块，它将抽象数据的维度映射到可视化来表示，里面包含了多个将定义域映射为值域的函数。 数值比例尺有连续的定义域，例如一系列数字或时间。序数比例尺有离散的定义域，例如一组名称或类别。比例尺在D3中是个可选功能。使用比例尺可以极大地简化从数据纬度到可视化展示的映射。比例尺对象（例如，由`d3.scaleLinear`返回的对象）的返回值既是一个对象也是一个函数。

下面是最常见的线性比例尺，它将一个连续的，定量的输入映射到连续的输出区间：

```javascript
// 位置编码
var x = d3.scaleLinear()
    .domain([10, 130])
    .range([0, 960])

x(20) // 80
x(50) // 320

// 颜色编码
var color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"])

color(20) // "#9a3439"
color(50) // "#7b5167"
```

### d3-shape

可视化通常由离散图形标记组成, 比如 [symbols](https://github.com/xswei/d3-shape#symbols), [arcs](https://github.com/xswei/d3-shape#arcs), [lines](https://github.com/xswei/d3-shape#lines) 和 [areas](https://github.com/xswei/d3-shape#areas)。虽然条形的矩形可以很容易的使用 [SVG](http://www.w3.org/TR/SVG/paths.html#PathData) 或者 [Canvas](http://www.w3.org/TR/2dcontext/#canvaspathmethods) 来生成, 但是其他的比如圆形的扇形以及向心 `Catmull-Rom` 样条曲线就很复杂。`d3-shape`模块提供了许多图形生成器以便使用。

与 `D3` 的其他特性一样，这些图形也是又数据驱动的: 每个图形生成器都暴露了一个如何将数据映射到可视化表现的访问器。例如你可以通过 [scaling](https://github.com/xswei/d3-scale) 定义一个时间序列的线条生成器以生成图表: 

```javascript
var line = d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.value) })

```

 线条生成器可以计算 `SVG` `path` 元素的 `d` 属性：

```javascript
path.datum(data).attr("d", line)
```

 或者也可以将其渲染到 `Canvas 2D` 上下文中: 

```javascript
line.context(context)(data)
```

### d3-zoom

视图移动以及缩放是一种将用户注意力聚焦在感兴趣区域的一种流行的交互技术。操作直接，容易理解: 点击并拖拽平移，使用滚轮进行缩放，当然也可以通过触摸进行。平移和缩放被广泛的应用在地图中，但是也可被应用到其他的可视化比如时间序列以及散点图中。

缩放行为通过 `d3-zoom` 模块实现，能方便且灵活到 [selections](https://github.com/d3/d3-selection) 上。它处理了许多 [input events](https://github.com/xswei/d3-zoom#api-reference) 以及浏览器的怪异模式。缩放行为与 `DOM` 无关，可以应用于 `SVG`, `HTML` 或者 `Canvas`。

缩放行为可也以与 [d3-scale](https://github.com/xswei/d3-scale) 和 [d3-axis](https://github.com/xswei/d3-axis) 一起工作; 参考 [*transform*.rescaleX](https://github.com/xswei/d3-zoom#transform_rescaleX) and [*transform*.rescaleY](https://github.com/xswei/d3-zoom#transform_rescaleY). 你可以使用 [*zoom*.scaleExtent](https://github.com/xswei/d3-zoom#zoom_scaleExtent) 显示平移范围或使用 [*zoom*.translateExtent](https://github.com/xswei/d3-zoom#zoom_translateExtent) 来显示缩放尺度。

缩放行为可以用来和其他的交互结合，比如用以拖拽的 [d3-drag](https://github.com/xswei/d3-drag) 和用以刷取的 [d3-brush](https://github.com/xswei/d3-brush)。

将缩放行为应用到指定的 [*selection*](https://github.com/d3/d3-selection)，并绑定必要的事件监听器用来允许平移和缩放,如果元素上没有定义 [zoom transform](https://github.com/xswei/d3-zoom#zoom-transforms) 的话会将其初始化为 `identity transform`。这个函数通常不会被直接调用，而是通过 [*selection*.call](https://github.com/d3/d3-selection#selection_call) 来调用。初始化一个缩放行为并将其应用到指定的选择集:

```
selection.call(d3.zoom().on("zoom", zoomed))
```

 ### d3-force

这个模块实现了用以模拟粒子物理运动的 [velocity Verlet](https://en.wikipedia.org/wiki/Verlet_integration) 数值积分器。仿真的演化: 它假设任意单位时间步长 Δ*t* = 1，所有的粒子的单位质量常量 *m* = 1。作用在每个粒子上的合力 *F* 相当于在单位时间 Δ*t* 内的恒定加速度 *a*。并且可以简单的通过为每个粒子添加速度并计算粒子的位置来模拟仿真。

用本模块，为一组 [nodes](https://github.com/xswei/d3-force#simulation_nodes) 创建一个 [simulation(仿真)](https://github.com/xswei/d3-force#simulation)，并组合需要的 [forces(力模型)](https://github.com/xswei/d3-force#simulation_force)。然后 [listen(监听)](https://github.com/xswei/d3-force#simulation_on) `tick` 事件来不断更新图形系统，比如 Canvas 或 SVG。

## D3常见数据可视化

下面介绍下几种简单的图表是如何通过D3实现的。

### 饼图

![04FDB38E-D8F5-407E-8820-941663AA707E](/Users/jason/Desktop/pic/D3/04FDB38E-D8F5-407E-8820-941663AA707E.jpeg)

代码如下：

```javascript
		var size = 400
    var padding = 40
    var data = [1, 1, 2, 5, 8, 12, 15, 21]
    var colors = d3.schemeCategory10; // v5版本获取配色    
    // 初始化一个pie布局器，此布局可根据原始数据计算出一段弧的开始和结束角度，将原始数据经过布局转换
    var pie = d3.pie()(data)
    // 设置arc方法
    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(size / 2 - padding)
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle)
    // 渲染到svg
    var svg = d3.select("svg")
      .attr("width", size)
      .attr("height", size)
    svg.append("g")
      .attr('transform', 'translate(' + size / 2 + ', ' + size / 2 + ')')
      .selectAll('path')
      .data(pie).enter().append('path')
      .attr('d', arc)
      .on('click', function (d) { alert(d.value) }) // 添加点击事件
      .attr('fill', d => colors[d.index]) // 填充颜色
      .attr('stroke', '#fff') // 描边笔画颜色
```

### 柱状图

![1537438138814](/Users/jason/Desktop/pic/D3/1537438138814.jpg)

代码如下：

```javascript
var barData = [
      {
        xData: 2010,
        yData: 14
      }, {
        xData: 2011,
        yData: 9
      }, {
        xData: 2012,
        yData: 3
      }, {
        xData: 2013,
        yData: 8
      }, {
        xData: 2014,
        yData: 4
      }, {
        xData: 2015,
        yData: 1
      },
    ]
    var xName = "year",
      xAxisLabel = "Years",
      xLabelxPosition = 0, xLabelyPosition = 40,
      yName = "value",
      yAxisLabel = "Value"
    yLabelxPosition = 0, yLabelyPosition = -15,
      barColor = "#3366cc"
    // 定义SVG元素的属性
    var svg = d3.select("svg"),
      margin = { top: 40, right: 10, bottom: 60, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0])

    // 添加SVG
    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    // 确定XY轴的映射
    var maxY = d3.max(barData, function (d) { return d.yData })
    x.domain(barData.map(function (d) { return d.xData }))
    y.domain([0, maxY])

    // 添加X轴
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text") // 添加X轴信息
      .attr("fill", "#000")
      .attr("x", (width / 2) + xLabelxPosition)
      .attr("y", xLabelyPosition)
      .style("font-size", "14px")
      .text(xAxisLabel)

    // 添加Y轴
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
      .append("text") // 添加X轴信息
      .attr("fill", "#000")
      .attr("x", yLabelxPosition)
      .attr("y", yLabelyPosition)
      .style("font-size", "14px")
      .text(yAxisLabel)

    // 为每个数据生成相应的柱条
    g.selectAll(".bar")
      .data(barData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("fill", barColor)
      .attr("x", function (d) { return x(d.xData) })
      .attr("y", function (d) { return y(d.yData) })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.yData) })
```

## D3的酷炫魔法实现 Demo 展示

官网的一些例子：[https://github.com/d3/d3/wiki/Gallery](https://github.com/d3/d3/wiki/Gallery)

V4版本的例子：[http://blockbuilder.org/search#d3version=v4](http://blockbuilder.org/search#d3version=v4)

V3版本的例子：http://data-visual.cn/#d3

### 参考资料

> Github：[https://github.com/d3](https://github.com/d3/d3)
>
> 知乎相关问题：[D3 VS Echarts](https://www.zhihu.com/question/28687373) 
>
> 相关Blog：[中文Wiki](https://github.com/xswei/d3js_doc/) [十二月咖啡馆](http://d3.decembercafe.org/)
