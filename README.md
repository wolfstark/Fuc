<h1 align="center">Fuc.js</h1>
<h3 align="center">MVVM响应式框架,用于学习vue原理</h3>

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

### License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2013-present, wolfstark
