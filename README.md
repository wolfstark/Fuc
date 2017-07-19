<h1 align="center">Fuc.js</h1>
<h3 align="center">MVVM响应式框架，用于学习Vue原理，es6模块化开发适于阅读</h3>

### Installing
```
  yarn
  yarn run dev  // 代码调试
  yarn run build  // 代码打包压缩
```

### Feature

* 优于操作Dom的数据驱动
* {{}}语法模板解析
* v-if 指令
* v-on 和 @event 快捷指令

### TODO

* 完善Vue的其他指令（v-for,v-model...）
* Typescript重构
* 查找with的替换方案
* 使用AST替换当前编译模块

### Example
```
// index.html

<body>
  <div id="app">姓名{{vm.username}}
     <p v-if="vm.showSex">男</p>
    <br>
    <button @click="toggleSex">切换</button>
  </div>
  <script src="../dist/fuc.js"></script>
  <script src="./demo.js"></script>
</body>
```

```
// demo.js

new Fuc({
  el: '#app',
  data: {
    name: '王',
    showSex: true,
  },
  methods: {
    toggleSex() {
      this.showSex = !this.showSex;
    },
  },
  computed: {
    username() {
      return `${this.name}翔`;
    },
  },
});
```


### Known issue

* 由于ES6不再支持with，目前模板上的属性需要加上vm前缀才能识别，正在查找替换方案

<!-- ### Reference

*  [Vue2.0 源码阅读：模板渲染](http://zhouweicsu.github.io/blog/2017/04/21/vue-2-0-template/)
*  [实现一个类 Vue 的 MVVM 框架](https://gmiam.com/post/evo.html)
*  [参照Vue实现的一个JavaScript MVVM 框架](https://github.com/qieguo2016/Vueuv)
*  [关于公司老项目的视图渲染解决方案](https://blog.shanamaid.top/2017/05/24/%E5%85%B3%E4%BA%8E%E5%85%AC%E5%8F%B8%E8%80%81%E9%A1%B9%E7%9B%AE%E7%9A%84%E8%A7%86%E5%9B%BE%E6%B8%B2%E6%9F%93%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/) -->

### License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2013-present, wolfstark
