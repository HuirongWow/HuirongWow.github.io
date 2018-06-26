---
title: Vue学习第一弹
---

今天经历了一场面试，表现不是很好，主要原因还是对VUE的基础知识掌握不扎实，所以重新梳理VUE知识点，加深自己对VUE的了解。

## Vue是什么
轻量级的前端界面框架
最新发布的2.0版本，功能更强大

## Vue有什么特点、功能
* 实现了数据渲染/数据同步
 * 响应式-双向绑定：v-model
* 实现了项目的组件化/模块化
  * 引入->注册->使用
* 单文件组件-js,css.html在同一个文件内
  * style标签的scoped属性可以防止组件中的样式污染别的组件
  * 很多预加载器，如定义使用的语言
  * 使用了webpack打包工具 
* 其他功能:路由，ajax，数据流

## Vue的学习资源
* vuejs中文官网
* vuejs源码
* vuejs官方工具
* vuejs官方论坛

## Vue的实例对象

```
new Vue({
  el: '#app',//对象装载的位置,比如是body，接下来的实例对象就挂载到body里
  template: '<div><other-compont></div>'//将要使用的模板
  data: {
		fruit:'apple'
	},
  components: { Layout },
  template: '<Layout/>'
})
```
## Vue2.0相对Vue1.0取消的钩子
* ready钩子

## Vue的根组件实现及组件间的关系

```import Vue from 'vue'
var myHeaderChild = {
	template: '<p>I am {{}}  my header child</p>',
}
var myHeader = {
	template: '<p><my-header-child></my-header-child>this  {{}} is my header</p>',
	component: {
		'my-header-child': myHeaderChild
}
}
	new Vue({
		el: '#app',
		template: '{{ word }}',
		data: {
			word: 'hello word!'
}，
	component: {
		'my-header': myHeader
}
})
```
在挂载点上使用使用组件myheader即可
根节点引入myheader，myheader本身引入myheader-child,通过局部注册、全局注册实现组件树。
在实际项目中，每一个组件会放到一个文件里，方便后面开发的清晰。

### 需要注意的一点，data里的数据避免引用赋值
* 原因：data的双向绑定，避免在其他地方重复引用赋值造成数据错乱
* 解决方法：用return



