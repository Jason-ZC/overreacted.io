---
title: 'PWA指北'
date: '2018-07-18'
spoiler: pwa入门
---

PWA的全称为：Progressive Web Apps（渐进式Web Apps），是Google提出的，可以带来突破性体验的Web应用。

Google所阐述的PWA的主要特点如下：

- **渐进式** - 适用于选用任何浏览器的所有用户，因为它是以渐进式增强作为核心宗旨来开发的。
- **自适应** - 适合任何机型：桌面设备、移动设备、平板电脑或任何未来设备。
- **连接无关性** - 能够借助于服务工作线程在离线或低质量网络状况下工作。
- **类似应用** - 由于是在 App Shell 模型基础上开发，因此具有应用风格的交互和导航，给用户以应用般的熟悉感。
- **持续更新** - 在服务工作线程更新进程的作用下时刻保持最新状态。
- **安全** - 通过 HTTPS 提供，以防止窥探和确保内容不被篡改。
- **可发现** - W3C 清单和服务工作线程注册作用域能够让搜索引擎找到它们，从而将其识别为“应用”。
- **可再互动** - 通过推送通知之类的功能简化了再互动
- **可安装** - 用户可免去使用应用商店的麻烦，直接将对其最有用的应用“保留”在主屏幕上。
- **可链接** - 可通过网址轻松分享，无需复杂的安装。

从我个人的角度理解，PWA与传统的Web相比，主要是多了以下几个关键特性：

- 离线可用
- 可在主屏幕添加Icon
- 启动动画
- 可以发送通知

[![印度的阿里巴巴Flipkart](https://camo.githubusercontent.com/abce643d5a58277787818f6eea3b21f43b7ab6c3/68747470733a2f2f6875616e677875616e2e6d652f696d672f696e2d706f73742f706f73742d6e65787467656e2d7765622d7077612f666c69706b6172742d312e6a706567)](https://camo.githubusercontent.com/abce643d5a58277787818f6eea3b21f43b7ab6c3/68747470733a2f2f6875616e677875616e2e6d652f696d672f696e2d706f73742f706f73742d6e65787467656e2d7765622d7077612f666c69706b6172742d312e6a706567)

这里主要强调一下渐进增加(也就是PWA中的Progressive)，也就是说，PWA不是0或者1，而是渐进增强——我们可以用PWA涉及到的技术，逐步改善移动Web的体验，而不是说做了什么，才是真正的PWA。

Apple 在 iOS 11.3 中引入了万众期待的 PWA，这使得开发跨平台的 PWA 成为了可能。但是需要注意的是，这只是 beta1 版本，还有许多问题需要 Apple 的开发团队解决

[![img](https://camo.githubusercontent.com/98b155827f13f1e27bd81c667c7a20a24bc3929a/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f33312f313632376266303566353361313132343f696d61676556696577322f302f772f313238302f682f3936302f666f726d61742f776562702f69676e6f72652d6572726f722f31)](https://camo.githubusercontent.com/98b155827f13f1e27bd81c667c7a20a24bc3929a/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f33312f313632376266303566353361313132343f696d61676556696577322f302f772f313238302f682f3936302f666f726d61742f776562702f69676e6f72652d6572726f722f31)

你可以看出它们的区别吗？一个是原生 Google 地图，一个是 PWA 版本

**和 iOS 原生应用相比有哪些限制**

- 如果用户几周不使用 PWA，iOS 将释放这些 PWA 缓存的文件，桌面图标当然还在，用户下次访问的时候，会重新缓存文件
- 无法应用一些 Native API，如：蓝牙、Touch ID、Face ID、ARKit、电池信息等
- 无法在后台执行代码
- 无法访问一些私密数据，如：联系人等，也无法访问本地社交应用
- 无法访问 In App Payments 和其他许多基于 Apple 的服务
- 在 iPad 上，无法使用分屏和其他应用程序共享屏幕，PWA 始终占满整个屏幕
- 没有消息推送，没有 Siri 集成，也就是说如果你安装了一个叫 Tinder 的 PWA，Siri 并不能找到它

[![img](https://camo.githubusercontent.com/ac75e7df29bf2b6b220740e94eff13d769090fdc/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f33312f313632376266303631393532343437353f696d61676556696577322f302f772f313238302f682f3936302f666f726d61742f776562702f69676e6f72652d6572726f722f31)](https://camo.githubusercontent.com/ac75e7df29bf2b6b220740e94eff13d769090fdc/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f33312f313632376266303631393532343437353f696d61676556696577322f302f772f313238302f682f3936302f666f726d61742f776562702f69676e6f72652d6572726f722f31)

### PWA体验

首先先体验一个PWA应用：

[![img](https://camo.githubusercontent.com/11d99c981fe5a67e0fdc99837a574dfaa05452fe/687474703a2f2f6f6c69767977346c772e626b742e636c6f7564646e2e636f6d2f313532333139393338312e706e67)](https://camo.githubusercontent.com/11d99c981fe5a67e0fdc99837a574dfaa05452fe/687474703a2f2f6f6c69767977346c772e626b742e636c6f7564646e2e636f6d2f313532333139393338312e706e67)

用微信扫描该二维码，复制链接使用手机端Chrome浏览器打开，将该页面添加到主屏幕：

[![img](https://camo.githubusercontent.com/990db365515b1a56a1371624520fcaecb76f93fa/687474703a2f2f6f6c69767977346c772e626b742e636c6f7564646e2e636f6d2f62616964757077612e6a7067)](https://camo.githubusercontent.com/990db365515b1a56a1371624520fcaecb76f93fa/687474703a2f2f6f6c69767977346c772e626b742e636c6f7564646e2e636f6d2f62616964757077612e6a7067)

设备要求(Chrome for Android 56+)

**在 iOS 上怎么安装 PWA 呢？**

这是在 iOS 上重要的挑战之一，因为 iOS Safari 没有任何提示或者引导让用户添加 PWA，Android 下有一个叫 Web App Install Banners 的引导用户，所以，用户需要在 Safari 中先访问你的站点，然后手动点击分享（Share）图标，然后点击“添加到主屏幕”。整个过程中，没有任何一点表现出来这是一个 PWA。

[![img](https://camo.githubusercontent.com/fdf5d7e65860b684ac50ccd8fd3e85bd53686de4/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f33312f313632376266303631633862633531343f696d61676556696577322f302f772f313238302f682f3936302f666f726d61742f776562702f69676e6f72652d6572726f722f31)](https://camo.githubusercontent.com/fdf5d7e65860b684ac50ccd8fd3e85bd53686de4/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f33312f313632376266303631633862633531343f696d61676556696577322f302f772f313238302f682f3936302f666f726d61742f776562702f69676e6f72652d6572726f722f31)

点击分享之后，点击添加到桌面按钮，需要 Web App 本身对用户进行引导，引导时请不要忘记当前系统语言

从 App Store 安装的其他浏览器，如 Chrome，Firefox，Brave 或者 Edge 都不能安装 PWA，也不能使用 Service Worker。

### PWA开发背景

Web 与原生应用在移动平台上的使用时长对比

[![img](https://camo.githubusercontent.com/0c896bc97760b3e37c710578f127eeb1eceea160/68747470733a2f2f6875616e677875616e2e6d652f696d672f696e2d706f73742f706f73742d6e65787467656e2d7765622d7077612f505741522d3030372e6a706567)](https://camo.githubusercontent.com/0c896bc97760b3e37c710578f127eeb1eceea160/68747470733a2f2f6875616e677875616e2e6d652f696d672f696e2d706f73742f706f73742d6e65787467656e2d7765622d7077612f505741522d3030372e6a706567)

近年来随着移动互联网的兴起，Web 应用在整个软件与互联网行业承载的责任越来越重，软件复杂度和维护成本越来越高，Web 技术，尤其是 Web 客户端技术，迎来了爆发式的发展，但是我们仍然无法在不借助原生程序辅助浏览器的前提下突破web平台本身对web应用的桎梏，即：

**客户端软件（即网页）需要下载所带来的网络延迟；与 Web 应用依赖浏览器作为入口所带来的体验问题。**

PWA以及构成PWA的一系列关键技术的出现让我们看到了解决上述两个问题的曙光：

- 能够显著提高应用加载速度
- 能够让 web 应用可以在离线环境使用的 Service Worker 与 Cache Storage
- 让 web 应用能够像原生应用一样被添加到主屏
- 可以指示用户可以启动哪些功能以及启动方法的manifest.json 文件声明应用清单

### PWA所涉及到的关键技术

- **Web App Manifest**
  Web App Manifest，即通过一个清单文件向浏览器暴露 web 应用的元数据，包括名字、icon 的 URL 等，以备浏览器使用，比如在添加至主屏或推送通知时暴露给操作系统，从而增强 web 应用与操作系统的集成能力。
  使用manifest.json 文件去配置应用的图标、名称等信息可以实现 PWA 应用添加至桌面的功能

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2",
  "orientation": "landscape"
}
```

}
使用 link 标签将 manifest.json 部署到 PWA 站点 HTML 页面的头部，如下所示：

```
<!-- document -->
<link rel="manifest" href="/manifest.json">
```

```
{
    "name": "这是一个完整名称",
    "short_name": "独立模式",
    // ...
}
```

name: {string} 应用名称，用于安装横幅、启动画面显示

[![img](https://camo.githubusercontent.com/4e0ce5dfdd2cd04c5e51603cdeeb38b88f3ef0fe/68747470733a2f2f677373302e62647374617469632e636f6d2f39726b5a627a71614b6751556f68476b6f395754416e46366868792f6173736574732f7077612f70726f6a656374732f313531353638303635313533392f6164642d746f2d686f6d652d73637265656e2e6a7067)](https://camo.githubusercontent.com/4e0ce5dfdd2cd04c5e51603cdeeb38b88f3ef0fe/68747470733a2f2f677373302e62647374617469632e636f6d2f39726b5a627a71614b6751556f68476b6f395754416e46366868792f6173736574732f7077612f70726f6a656374732f313531353638303635313533392f6164642d746f2d686f6d652d73637265656e2e6a7067)

short_name: {string} 应用短名称，用于主屏幕显示

[![img](https://camo.githubusercontent.com/3b1ff56209e075c4475573d3dc32a557422c63cb/68747470733a2f2f677373302e62647374617469632e636f6d2f39726b5a627a71614b6751556f68476b6f395754416e46366868792f6173736574732f7077612f70726f6a656374732f313531353638303635313533392f686f6d652e6a7067)](https://camo.githubusercontent.com/3b1ff56209e075c4475573d3dc32a557422c63cb/68747470733a2f2f677373302e62647374617469632e636f6d2f39726b5a627a71614b6751556f68476b6f395754416e46366868792f6173736574732f7077612f70726f6a656374732f313531353638303635313533392f686f6d652e6a7067)
其他常用属性释义：

- start_url：定义了一个 PWA 的入口页面
- theme_color：主题色
- background_color：背景色
- orientation：定义默认应用显示方向，竖屏、横屏
- display：定义应用的显示方式，有 4 种显示方式，分别为
  1、fullscreen:：全屏
  2、standalone:：应用
  3、minimal-ui： 类似于应用模式，但比应用模式多一些系统导航控制元素，但又不同于浏览器模式
  4、browser:：浏览器模式，默认值
- **Service Worker**
- Service Worker的生命周期

[![img](https://camo.githubusercontent.com/8cea16fc011d8f566531c22c1d9c3696cbf6198a/68747470733a2f2f677373302e62647374617469632e636f6d2f39726b5a627a71614b6751556f68476b6f395754416e46366868792f6173736574732f7077612f70726f6a656374732f313531353638303635313534362f73772d6c6966656379636c652e706e67)](https://camo.githubusercontent.com/8cea16fc011d8f566531c22c1d9c3696cbf6198a/68747470733a2f2f677373302e62647374617469632e636f6d2f39726b5a627a71614b6751556f68476b6f395754416e46366868792f6173736574732f7077612f70726f6a656374732f313531353638303635313534362f73772d6c6966656379636c652e706e67)

我们可以看到生命周期分为这么几个状态：安装中，安装后，激活中，激活后，废弃

- 安装( installing )：这个状态发生在 Service Worker 注册之后，表示开始安装，触发 install 事件回调指定一些静态资源进行离线缓存。
- 激活后( activated )：在这个状态会处理 activate 事件回调 (提供了更新缓存策略的机会)。并可以处理功能性的事件 fetch (请求)、sync (后台同步)、push (推送)。
- 废弃状态 ( redundant )：这个状态表示一个 Service Worker 的生命周期结束。

Service Worker 有几个重要的功能性的的事件，这些功能性的事件支撑和实现了 Service Worker 的特性。

[![img](https://camo.githubusercontent.com/fcfef49260acefa279bae45a1efc4845a61c6399/68747470733a2f2f677373302e62647374617469632e636f6d2f39726b5a627a71614b6751556f68476b6f395754416e46366868792f6173736574732f7077612f70726f6a656374732f313531353638303635313534372f73772d6576656e74732e706e67)](https://camo.githubusercontent.com/fcfef49260acefa279bae45a1efc4845a61c6399/68747470733a2f2f677373302e62647374617469632e636f6d2f39726b5a627a71614b6751556f68476b6f395754416e46366868792f6173736574732f7077612f70726f6a656374732f313531353638303635313534372f73772d6576656e74732e706e67)

- fetch (请求)：当浏览器在当前指定的 scope 下发起请求时，会触发 fetch 事件，并得到传有 response 参数的回调函数，回调中就可以做各种代理缓存的事情了。
- push (推送)：push 事件是为推送准备的。不过首先需要了解一下 Notification API 和 PUSH API。通过 PUSH API，当订阅了推送服务后，可以使用推送方式唤醒 Service Worker 以响应来自系统消息传递服务的消息，即使用户已经关闭了页面。
- sync (后台同步)：sync 事件由 background sync (后台同步)发出。background sync 配合 Service Worker 推出的 API，用于为 Service Worker 提供一个可以实现注册和监听同步处理的方法。但它还不在 W3C Web API 标准中。在 Chrome 中这也只是一个实验性功能，需要访问 chrome://flags/#enable-experimental-web-platform-features ，开启该功能，然后重启生效。

我们原有的web应用模型都是建立在用户能上网的基础上，但是Service Worker让web应用离线执行成为了可能，我们可以把Service Worker看成是一个运行在客户端的代理，它会截获页面请求来应用缓存策略：

[![img](https://camo.githubusercontent.com/fd4e9d4d5e0148579b7db6d064178cb2de6eca8a/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f302a454875454a65367552752d31474a32752e)](https://camo.githubusercontent.com/fd4e9d4d5e0148579b7db6d064178cb2de6eca8a/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f302a454875454a65367552752d31474a32752e)

一般情况有三种常见的缓存策略：

- 缓存优先

首先查看缓存，当缓存失效时再去访问网络。这一策略适用于资源文件，如字体、样式、图片等

```js
// 缓存优先示例
function cacheFallbackToNetWork(req) {
  return caches.match(req)
    .then(res => {
      if (!res) {
        // 未找到缓存
        throw new Error('cache miss')
    }
    return res
  })
  .catch(function(err) {
      return fetch(req).then(function(res) {
          // 成功请求资源后缓存到本地
      })
  })
}
```

- 网络优先

首先查看网络，当网络失败时应用本地缓存。这一策略适合实时数据，比如我们上面看到的百度天气

```js
function networkFallbackToCache(req) {
    return fetch(req)
    .then(function(res) {
        // 成功请求资源后缓存到本地
    })
    .cache(function(e) {
        return caches.match(req)
            .then(function(res) {
                if (!res) {
                    throw new Error('cache miss')
                }
                return res
            })
    })
}
```

- 速度优先：在fetch事件中同时发起本地缓存匹配及网络请求，谁先返回使用谁的，该方案适用于对性能要求比较高的站点，缩短了缓存优先策略中有可能缓存中没有资源再折回网络的时间消耗

```js
function networkRaceCache(promises) {
    Promise.race(promises)
    .then(res => {
        // 数据操作
    })
}
// Service Worker请求拦截事件
this.addEventListener('fetch', (e) => {
    e.respondWith(
        networkRaceCache([
            fetch(req),
            cache.open(OFFLINE_CACHE_NAME).then((cache) => {
                return cache.match(req)
            })
        ])
    )
})
```

可以看出Service Worker具有异常灵活且强大的API，在我看来是支撑PWA作为下一代web应用模型的核心技术。

- **Push Notification**

就好像原生的通知推送服务一样，PWA也允许服务器向用户提示一些信息，并根据用户不同的行为进行一些简单的处理，比如说提醒用户天气的变换，或者是电商网站商品价格的变化

在 PWA 中，我们利用 Service Worker 的后台计算能力结合 Push API 对推送事件进行响应，并通过 Notification API 实现通知的发出与处理：

```js
self.addEventListener('push', event => {
  event.waitUntil(
    // Process the event and display a notification.
    self.registration.showNotification("Hey!")
  );
});

self.addEventListener('notificationclick', event => {  
  // Do something with the event  
  event.notification.close();  
});

self.addEventListener('notificationclose', event => {  
  // Do something with the event  
});
```

最后，提供一些PWA相关的参考资料：

[饿了么的 PWA 升级实践](https://huangxuan.me/2017/07/12/upgrading-eleme-to-pwa/)
[下一代 Web 应用模型 —— Progressive Web App](https://huangxuan.me/2017/02/09/nextgen-web-pwa/)
[lavas PWA相关教程](https://lavas.baidu.com/pwa/README)
[Progressive Web Apps on iOS are here](https://medium.com/@firt/progressive-web-apps-on-ios-are-here-d00430dee3a7)