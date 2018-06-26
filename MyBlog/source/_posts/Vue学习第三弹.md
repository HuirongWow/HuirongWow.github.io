---
title: Vue学习第三弹
---

路途依旧遥远。我去到了杭州，住在西溪湿地，去看了阿里巴巴总部，很帅，下好大的雨，我站在外边撑着伞看着。

## Vue事件绑定
* 用v-on标签实现事件绑定，提供一些修改器，如keydown.enter
* 自定义事件：针对子组件向外触发，在子组件中使用$emit来触发事件，还可传参数给父组件，让父组件在方法里接受那个参数

##表单事件绑定
* input的数据绑定：v-model实现数据模型，如：v-model:myval
	* 首先同步到myval属性上，再同步渲染到页面上，每一次输入都会进行双向的绑定
* v-model的修饰符：
	* .lazy：在输入完之后才会进行更新，当数据很大时用.lazy是不错的选择
	* .number:一般把myval当作string来处理，可用typeof查看，用.number修饰符可改类型为number
	* .trim：一个裁剪的修饰符，空格会被剪切掉。
## Vue中单选多选控件如何实现
* checkbox的实现
 *  给input设置type=checkbox，设置value属性的值，通过v-model把所有选项绑定在myval属性上（myval需要是一个数组），如果勾选了input选项则会被添加到myval中，实际上是添加了value属性的值
* 单选框radio  
 * 给input设置type=radio，设置value属性的值，通过v-model把所有选项绑定在myval属性上（myval是一个字符串），如果勾选了input选项则会被添加到myval中，实际上是添加了value属性的值
* select，
	* 用v-model给select绑定myval属性，而options可以作为一个数组放在data中，用v-for来渲染到页面里

## 计算属性和数据监听
* 计算属性时做什么的呢？
	* 通过computed会根据其他属性的变化同步实现computed中的属性的动态更新
* 计算属性computed与方法method有什么不同呢？
 * computed的计算属性会被缓存，计算属性的更新只会根据另一个值如myval进行更新，如果那个值没有更新，那么计算值也不会更新
 * 用method调用值时，每一次都会重新获取再进行相应的操作
* 数据监听 watch
  * Vue用来提供，监听属性变化的选项

