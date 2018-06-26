---
title: ES6的一些核心内容（上）
---

发现了一个风格棒棒且好文章多多的网站！叫**segmentfault**！这篇文章是看过**segmentfault**上的一篇文章之后的总结，当然有一部分没有看懂的或者不是很重要的内容是直接搬运过来的，在文章的最后会注明原文章的地点，尊重版权~

**这一天依旧是继续加油的马大侠~**
## ES6是什么
ES6是JS的下一代标准。因为当前版本的ES6是在2015年发布的，所以又被称为ES2015.也就是说，ES6就是ES2015.

虽然现在，ES6全部特性并不能在所有浏览器上都被兼容，但是厉害的程序员们都已经用上它啦，他也的确非常强大哦！所以，哪怕是为了读懂别人的代码，也应该懂得ES6的一些核心的语法啦。

正式说ES6之前先了解一下Babel，它的作用就是把ES6代码转为ES5代码，从而在现有的环境执行，是一个ES6转码器。大家可以选择自己习惯的工具来使用Babel，具体的过程可以去官网查看：
![Babel](https://segmentfault.com/img/remote/1460000008695818)

## 最常用的ES6特性 
先来个小汇总：

	let，const，class,extends,super,arrow functions,template string,destructuring,default,rest arguments
以上就是ES6的最常用的语法，我们接下来用一个一个例子来理解他们：
### let,const


### Model
Model层用来存储业务的数据，一旦数据发生变化，模型将通知有关的视图。

	myapp.Model = function() {
    var val = 0;

    this.add = function(v) {
        if (val < 100) val += v;
    };

    this.sub = function(v) {
        if (val > 0) val -= v;
    };

    this.getVal = function() {
        return val;
    };

    ／* 观察者模式 *／
    var self = this, 
        views = [];

    this.register = function(view) {
        views.push(view);
    };

    this.notify = function() {
        for(var i = 0; i < views.length; i++) {
            views[i].render(self);
        }
    };
	};

Model和View之间使用了观察者模式，View事先在此Model上注册，进而观察Model，以便更新在Model上发生改变的数据。

### View
> * view和controller之间使用了策略模式，这里view引入了controller的实例来实现特定的响应策略，比如这个例子中的click事件：


> * 回调函数，假设我们希望xx2的请求发生在xx1的请求完成之后，那么来看下面这段代码：

	myapp.View = function(controller) {
	    var $num = $('#num'),
	        $incBtn = $('#increase'),
	        $decBtn = $('#decrease');
	
	    this.render = function(model) {
	        $num.text(model.getVal() + 'rmb');
	    };
	
	    /*  绑定事件  */
	    $incBtn.click(controller.increase);
	    $decBtn.click(controller.decrease);
	};

如果要实现不同的响应的策略，只需要用不同的controller实例替换即可。

### Controller
> * 控制器是模型和视图之间的纽带，MVC将响应机制封装在controller对象中，当用户和你的应用产生交互时，控制器中的事件触发器就开始工作了。
	
	myapp.Controller = function() {
	    var model = null,
	        view = null;
	
	    this.init = function() {
	        /* 初始化Model和View */
	        model = new myapp.Model();
	        view = new myapp.View(this);
	
	        /* View向Model注册，当Model更新就会去通知View啦 */
	        model.register(view);
	        model.notify();
	    };
	
	    /* 让Model更新数值并通知View更新视图 */
	    this.increase = function() {
	        model.add(1);
	        model.notify();
	    };
	
	    this.decrease = function() {
	        model.sub(1);
	        model.notify();
	    };
	};
	
在这里我们实例化View并向对应的Model实例注册，当Model要发生变化的时候，就去通知View做更新，这里用到了观察者模式。

当我们执行应用的时候，使用Controller做初始化：

	(function() {
	    var controller = new myapp.Controller();
	    controller.init();
	})();

可以明显感觉到，MVC模式的业务逻辑主要集中在Controller中，但其实前端的View已经具备了独自处理事件的能力，当每个事件都要流经Controller时，这层就会变得十分的臃肿。另外View层和Controller层的联系过于紧密，当其他的View想复用Controller的时候，会很不方便。那么，如果想要多个View共用一个Controller该怎么办呢？这里就到了：MVP模式

## MVP

> MVP是MVC的改良，和MVC的相同之处在于：Controller/Presenter负责业务逻辑，Model负责管理数据，View显示。
![MVP](https://lc-mhke0kuv.cn-n1.lcfile.com/7e6efa438bda9cb0073d.png)
> 虽然在MVC里，View是可以直接访问Model的，但是MVP中的View并不能直接使用Model，而是通过为Presenter提供接口，让Presenter去更新Model，再通过观察者模式更新View。
> 与MVC相比，MVP通过解耦View和Model，完全分离视图和模型使职责划分更加清晰；由于View不依赖Model，可以将View抽离出来做成组件，它只需要提供一系列接口提供给上层操作。

### Model
	myapp.Model = function() {
	    var val = 0;
	
	    this.add = function(v) {
	        if (val < 100) val += v;
	    };
	
	    this.sub = function(v) {
	        if (val > 0) val -= v;
	    };
	
	    this.getVal = function() {
	        return val;
	    };
	};

Model层依然是主要与业务相关的数据和对应处理数据的方法。

### View

	myapp.View = function() {
	    var $num = $('#num'),
	        $incBtn = $('#increase'),
	        $decBtn = $('#decrease');
	
	    this.render = function(model) {
	        $num.text(model.getVal() + 'rmb');
	    };
	
	    this.init = function() {
	        var presenter = new myapp.Presenter(this);
	
	        $incBtn.click(presenter.increase);
	        $decBtn.click(presenter.decrease);
	    };
	};

MVP定义了Presenter和View之间的接口，用户对View的操作都转移到了Presenter。比如这里可以让View暴露setter接口以便Presenter调用，待Presenter通知Model更新后，Presenter调用View提供的接口更新视图。

### Presenter

	myapp.Presenter = function(view) {
	    var _model = new myapp.Model();
	    var _view = view;
	
	    _view.render(_model);
	
	    this.increase = function() {
	        _model.add(1);
	        _view.render(_model);
	    };
	
	    this.decrease = function() {
	        _model.sub(1);
	        _view.render(_model);
	    };
	};

> Presenter作为View和Model之间的“中间人”，除了基本的业务逻辑之外，还有大量代码需要对View到Model和从Model到View的数据进行“手动同步”，这样Presenter显得很重，维护起来会比较困难，而且由于没有数据绑定，如果Presenter对视图渲染的需求增多，它不得不过多关注特定的视图，一旦视图需求发生改变，Presenter也需要改动。

> 运行程序时,以View为入口：

	(function() {
	    var view = new myapp.View();
	    view.init();
	})();

## MVVM
![MVVM](https://lc-mhke0kuv.cn-n1.lcfile.com/1fba28fee8c9c5eeb021.png)

> * MVVM把View和Model的同步逻辑自动化了。以前Presenter负责的View和Model同步不在手动的进行操作，而是交给框架所提供的数据绑定进行负责，只需要告诉它View显示的数据对应的是Model那一部分即可。
> * 我们使用Vue来完成这个例子

### Model

在MVVM中，我们可以把Model称为数据层，因为它仅仅关注数据本身，不关心任何行为（格式化数据由View负责），这里可以把它理解为一个类似于json的数据对象。

	var data = {
	    val: 0
	};

### View
和MVC/MVP不同的是MVVM中的View通过模板语法来声明式的将数据渲染进DOM，ViewModel对Model进行更新的时候，会通过数据绑定更新到View。写法如下：

	<div id="myapp">
	    <div>
	        <span>{{ val }}rmb</span>
	    </div>
	    <div>
	        <button v-on:click="sub(1)">-</button>
	        <button v-on:click="add(1)">+</button>
	    </div>
	</div>

### ViewModel
> ViewModel大致上就是MVC的Controller和MVP的Presenter了，也是整个模式的重点，业务逻辑也主要集中在这里，其中的一大核心就是数据绑定。与MVP不同的是，没有了View为Presente提供的接口，之前由Presente负责的View和Model之间的数据同步交给了ViewModel中的数据绑定进行处理，当Model发生变化，ViewModel就会自动更新；ViewModel变化，Model也会更新。

	new Vue({
	    el: '#myapp',
	    data: data,
	    methods: {
	        add(v) {
	            if(this.val < 100) {
	                this.val += v;
	            }
	        },
	        sub(v) {
	            if(this.val > 0) {
	                this.val -= v;
	            }
	        }
	    }
	});

> 整体来看，比MVC/MVP精简了很多，不仅仅简化了业务与界面的依赖，还解决了数据频繁更新的问题。因为在MVVM中，View不知道Model的存在，ViewModel和Model也觉察不到View，这种低耦合模式可以使开发过程更加容易，提高应用的可重用性。

## 数据绑定
![数据绑定原理](https://lc-mhke0kuv.cn-n1.lcfile.com/c507025c2f9a5c9e0c44.png)

> 在Vue中，使用了双向绑定技术，就是View的变化能实时让Model发生变化，而Model的变化也能实时更新到View。

> 不同的MVVM框架中，实现双向绑定的技术有所不同。目前一些主流的前端框架实现数据绑定的方式大致有一下几种：
	> * 数据劫持
	> * 发布-订阅模式
	> * 脏值检查

在这里主要讲讲Vue
> Vue采用数据劫持&发布-订阅模式的方式，通过ES5提供给的**Object.defineProperty()**方法来劫持（监控）各属性的**getter**、**setter**，并在数据（对象）发生变动时通知订阅者，触发相应的监听回调。并且，由于是在不同的数据上触发同步，可以精确的将变更发送给绑定的视图，而不是对所有的数据都执行一次检测。要实现Vue中的双向绑定，大致可以分为三个模块Observer\Compile\Watcher,如图：
![Vue双向绑定](https://lc-mhke0kuv.cn-n1.lcfile.com/eeb9bbbdf001b43d6002.png)

> * Observer 数据监听器
	>  负责对数据对象的所有属性进行监听（数据劫持），监听到数据变化后通知订阅者。
> * Compiler指令解析器
	> 扫描模板，并对指令进行解析，然后绑定指定事件
> * Watcher
	> 关联Observe和Compile，能够订阅并收到属性变动额度通知，执行指令绑定的相应操作，更新视图。Updata()是它自身的一个方法，用于执行Compile中绑定的回调，更新视图。

### 数据劫持

一般对数据的劫持都是通知Object.defineProperty方法进行的，Vue中对应的函数为defineReactive，其普通对象的劫持的精简版代码如下：

 
	var foo = {
	  name: 'vue',
	  version: '2.0'
	}
	
	function observe(data) {
	    if (!data || typeof data !== 'object') {
	        return
	    }
	    // 使用递归劫持对象属性
	    Object.keys(data).forEach(function(key) {
	        defineReactive(data, key, data[key]);
	    })
	}
	
	function defineReactive(obj, key, value) {
	     // 监听子属性 比如这里data对象里的 'name' 或者 'version'
	     observe(value)
	
	    Object.defineProperty(obj, key, {
	        get: function reactiveGetter() {
	            return value
	        },
	        set: function reactiveSetter(newVal) {
	            if (value === newVal) {
	                return
	            } else {
	                value = newVal
	                console.log(`监听成功：${value} --> ${newVal}`)
	            }
	        }
	    })
	}
	
	observe(foo)
	foo.name = 'angular' // “监听成功：vue --> angular”

> * 上面完成了对数据对象的监听，接下来还需要在监听到变化后去通知订阅者，这需要实现一个消息订阅器**Dep**，Watcher通过**Dep**添加订阅者，当数据改变便触发**Dep.notify()**,Watcher调用自己的**update（）**方法完成视图更新。

## 总结
MV*的目的是把应用程序的数据、业务逻辑和界面这三块解耦，分离关注点，不仅利于团队协作和测试，更有利于甩锅维护和管理。业务逻辑不再关心底层数据的读写，而这些数据又以对象的形式呈现给业务逻辑层。从 MVC --> MVP --> MVVM，就像一个打怪升级的过程，它们都是在MVC的基础上随着时代和应用环境的发展衍变而来的。

在我们纠结于使用什么架构模式或框架的时候，不如先了解它们。静下来思考业务场景和开发需求，不同需求下会有最适合的解决方案。我们使用这个框架就代表认同它的思想，相信它能够提升开发效率解决当前的问题，而不仅仅是因为大家都在学。
有人对新技术乐此不疲，有人对新技术不屑一顾。正如狄更斯在《双城记》中写的：

> 这是最好的时代，这是最坏的时代，这是智慧的时代，这是愚蠢的时代；这是信仰的时期，这是怀疑的时期；这是光明的季节，这是黑暗的季节；这是希望之春，这是失望之冬；人们面前应有尽有，人们面前一无所有；人们正在直登天堂；人们正在直下地狱。

保持一颗拥抱变化的心，在新技术面前不盲目，不守旧。 
### 最后依旧尊重版权 
源作者：扎克悟空

链接：https://juejin.im/post/593021272f301e0058273468

来源：掘金

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。