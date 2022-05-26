[git仓库]: https://github.com/GuoBinyong/event-bus
[发行地址]: https://github.com/GuoBinyong/event-bus/releases
[issues]: https://github.com/GuoBinyong/event-bus/issues

[码云仓库]: https://gitee.com/guobinyong/event-bus


[API接口文档]: ./doc/index.md



> 目录
- [1. 背景](#1-背景)
- [2. 简介](#2-简介)
- [3. 安装方式](#3-安装方式)
  - [3.1. 方式1：通过 npm 安装](#31-方式1通过-npm-安装)
  - [3.2. 方式3：通过`<script>`标签引入](#32-方式3通过script标签引入)
- [4. API接口文档](#4-api接口文档)



# 1. 背景
npm 上有很多事件总线的库，它们基本上都有以下特点 和 缺点：
- 没有继承任何已有的类，都是重新实现的；（没有发挥 `EventTarget` 的功能）
- 自己单独维护了事件和监听函数的映射关系；（多此一举，执行效率不高）
- 监听事件 和 触发事件的方法与 Dom 中的 `EventTarget` 不一致。（增加学习成本）

其实 `EventTarget` 完全可以胜任事件总结的任务，`window` 也是一个较理想的事件总线实例。只是从理想的角度出发，他们还有以下小小的不足之处：
- 缺乏更丰富的 和 便捷的 添加事件的 API，如： 一次性监听方法 `onceListen()` 等。
- 派发事件时，需要手动配置 `Event` 对象的某些属性，如：`{bubbles: false,cancelable: true,composed: false}`
- `window` 上会经常触发很多不相关的事件，这会增加事件检索成本

监于以上原因，该库就诞生了。


# 2. 简介
event-bus 是基于原生 EventTarget 类来开发的事件总线，充分复用原生的能力增加了易用性。


**具有以下特性：**  
- 基于 `EventTarget` 实现，拥有极少量的代码 和 极高的性能
- 拥有丰富、易用的 API，如：一次性监听、指定次数的监听 等等
- 派发事件时，自动配置 Event 相关属性为合适的值


**详情请看：**  
- 主页：<https://github.com/GuoBinyong/event-bus>
- [GitHub仓库][git仓库]
- [码云仓库][]


**如果您在使用的过程中遇到了问题，或者有好的建议和想法，您都可以通过以下方式联系我，期待与您的交流：**
- 给该仓库提交 [issues][]
- 给我 Pull requests
- 邮箱：<guobinyong@qq.com>
- QQ：guobinyong@qq.com
- 微信：keyanzhe

# 3. 安装方式
目前，安装方式有以下几种：


## 3.1. 方式1：通过 npm 安装
```
npm install @gby/event-bus
```


## 3.2. 方式3：通过`<script>`标签引入
您可直接从项目的 [发行地址][] 中下载以 `.iife.js` 作为后缀的文件，然后使用如下代码引用 和 使用 event-bus：


1. 引用 event-bus
   ```
   <script src="path/to/package/event-bus.iife.js"></script>
   ```
   
2. 使用全局的 `EventBus`
   ```
   <script>
   // 使用全局的 EventBus
       const eBus = new EventBus();
   </script>
   ```


# 4. API接口文档
详情跳转至[API接口文档][]



--------------------

> 有您的支持，我会在开源的道路上，越走越远

![赞赏码](https://i.loli.net/2020/04/08/PGsAEqdJCin1oQL.jpg)