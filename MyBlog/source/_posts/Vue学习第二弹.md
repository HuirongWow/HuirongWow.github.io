---
title: Vue学习第二弹
---

刚刚发现自己挺进了阿里的二面，心情有些复杂。。听说阿里的面试14号之前就完事了，留给自己的准备时间应该就明天一天了把，可能还没有一天，感觉自己不会的东西还有很多。

算法、项目、基础……

总之，虽然很方，但还是先静下心来，捋一捋Vue的基础，熟悉一下自己的项目吧。莫问前程，但行好事。
## Vue的基本概念
* 全局api：Vue实例对象提供的全局方法
	* 如Vue.component\Vue.use等
* 实例选项：
 * 如el、data、生命周期的钩子、子组件选项等，在官方文档里可以看到。就是在创建一个Vue实例时可以使用的功能项目。
* 实例属性和方法
 *  以$开头，并且直接从实例对象进行调用的的方法、属性
* 指令
 * 指令有时还会包含指令的参数，如：‘ : ’、‘ . ’这样的冒号参数/修改器
* 内置组件
 * 如<component></component>、<keep-alive><router-link></router-link></keep-alive>

## 文本渲染v-html、v-text
* v-html
 * 标签本身以html的方式解析显示在页面里
* v-text
  * 会将所有标签转译成字符串来进行页面的展现

## 列表渲染 v-for数组，对象，子组件
* 用v-for对数组进行渲染

 * ```
 <ul>
		<li v-for="(item,index) in List"> {{ item.name }} - {{ item.price }} - {{ index }}</li>
	</ul>```

* 序号index需要声明：（item,index）
* 假若渲染的是一个对象，里面有name，price等属性

 * ```
 <ul>
		<li v-for="(value, key) in objList"> {{ key + value }} </li>
	</ul>```

* 假若渲染的是一个组件，组件的循环渲染 

 * ```
 <ul>
		<componentA v-for="(value, key) in objList" :key="key"></componentA>
	</ul>```

## 列表数组的同步更新方法
* 在methods方法中： 
    * push(),pop(),shift(),unshift(),splice(),sort(),reverse()数组方法会触发数组列表更新
    * 直接为数组某一项赋值、改变数组长度不会触发数组列表更新
	    * 一定要实现，则使用Vue.set()全局方法来进行赋值即可
    * filter(),concat(),slice()不会出发数组列表更新

## Vue标签属性和条件渲染
* v-bind，缩写：‘ ： ’
 * 所谓动态绑定，即在其他地方修改了绑定的属性，在原点也会做相应的改变
 * v-bind常用用法：绑定class，绑定的class与本身的class不冲突，会同时共存。除了classname，也可以绑定对象，也可以绑定数组，也可以混用。也可以绑定style，在data中定义绑定的css样式。
* 条件渲染
  * v-if: 直接从文档流中被删除，不在页面中展现
  * v-show: 标签依旧存在于文档流中，只不过通过css样式隐藏
  * v-else：配合v-if和v-show使用
  


