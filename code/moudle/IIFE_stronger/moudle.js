// moudle.js 文件
(function (window, $) {
    let data = 'www.baidu.com'
    // 操作数据的函数
    function foo() {
        // 用于暴露有函数
        console.log(`foo() ${data}`)
        $('body').css(`background`, 'red')
    }
    function bar() {
        // 用于暴露有函数
        console.log(`bar() ${data}`)
        otherFun() //内部调用
    }
    function otherFun(){
        // 内部私有的函数
        console.log('otherFun()')
    }
    // 暴露行为
    window.myMoudle = {foo,bar}
})(window,jQuery)