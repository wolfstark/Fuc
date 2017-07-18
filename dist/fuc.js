(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/dep.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dep = function () {
  function Dep() {
    _classCallCheck(this, Dep);

    this.subs = {};
  }

  _createClass(Dep, [{
    key: "addSub",
    value: function addSub(target) {
      if (!this.subs[target.uid]) {
        this.subs[target.uid] = target;
      }
    }
  }, {
    key: "notify",
    value: function notify(options) {
      var _this = this;

      Object.keys(this.subs).forEach(function (key) {
        _this.subs[key].update(options);
      });
    }
  }]);

  return Dep;
}();

/* harmony default export */ var dep_defaultExport = (Dep);
// CONCATENATED MODULE: ./src/wathcer.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
var wathcer__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function wathcer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var $uid = 0;

var wathcer_Watcher = function () {
  /**
   * 用于和订阅者建立联系，当数据变更时通知watcher，watcher发出命令更新Dom
   * @param {any} exp
   * @param {any} vm
   * @param {any} callback
   * @memberof Watcher
   */
  function Watcher(exp, vm, callback) {
    wathcer__classCallCheck(this, Watcher);

    this.value = null;
    this.uid = $uid;

    this.exp = exp;
    this.vm = vm;
    this.callback = callback || function foo() {};

    // this.value = null;
    // this.uid = $uid;
    $uid += 1;
    this.update();
  }

  wathcer__createClass(Watcher, [{
    key: 'update',
    value: function update(options) {
      // Dep.target = this;
      var newVal = this.get();

      if (!__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].isEqual(this.value, newVal)) {
        this.callback(newVal, this.value, options);
      }
    }
  }, {
    key: 'get',
    value: function get() {
      dep_defaultExport.target = this;
      var value = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].computeExpression(this.exp, this.vm);
      dep_defaultExport.target = null;
      return value;
    }
  }]);

  return Watcher;
}();

/* harmony default export */ var wathcer_defaultExport = (wathcer_Watcher);
// CONCATENATED MODULE: ./src/compiler.js
var compiler__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function compiler__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @ts-check


var $$id = 0;

var updater = {
  text: function text(node, newVal) {
    node.textContent = typeof newVal === 'undefined' ? '' : newVal;
  },
  html: function html(node, newVal) {
    node.innerHTML = typeof newVal === 'undefined' ? '' : newVal;
  },
  value: function value(node, newVal) {
    // 当有输入的时候循环依赖了，中文输入法不能用。这里加入一个标志避开自动update
    if (!node.isInputting) {
      node.value = newVal || '';
    }
    node.isInputting = false;
  },
  checkbox: function checkbox(node, newVal) {
    // 处理数组
    var value = node.value || node.$id;
    if (newVal.indexOf(value) < 0) {
      node.checked = false;
    } else {
      node.checked = true;
    }
  },
  attr: function attr(node, newVal, attrName) {
    newVal = typeof newVal === 'undefined' ? '' : newVal;
    node.setAttribute(attrName, newVal);
  },
  style: function style(node, newVal, attrName) {
    newVal = typeof newVal === 'undefined' ? '' : newVal;
    if (attrName === 'display') {
      newVal = newVal ? 'initial' : 'none';
    }
    node.style[attrName] = newVal;
  },
  dom: function dom(node, newVal, nextNode) {
    if (newVal) {
      nextNode.parentNode.insertBefore(node, nextNode);
    } else {
      nextNode.parentNode.removeChild(node);
    }
  }
};

var compiler_Compiler = function () {
  function Compiler(options) {
    compiler__classCallCheck(this, Compiler);

    this.$el = options.el;
    this.vm = options.vm;
    if (this.$el) {
      /* eslint no-underscore-dangle: 0*/
      // 先从dom挂载到js内存中
      this.$fragment = this._nodeToFragment();
      this.compile(this.$fragment);
      this.$el.appendChild(this.$fragment);
    }
  }

  compiler__createClass(Compiler, [{
    key: 'compile',
    value: function compile(node, vm) {
      var _this = this;

      node.$id = $$id;
      $$id += 1;

      if (node.childNodes.length > 0) {
        [].concat(_toConsumableArray(node.childNodes)).forEach(function (child) {
          switch (child.nodeType) {
            case 3:
              _this.compileTextNode(child, vm);
              break;
            case 1:
              _this.compileElementNode(child, vm);
              break;
            default:
          }
        });
      }
    }
  }, {
    key: 'compileElementNode',
    value: function compileElementNode(node) {
      var _this2 = this;

      var vm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.vm;

      var attrs = [].concat(_toConsumableArray(node.attributes));
      var lazyCompileDir = '';
      var lazyCompileExp = '';

      attrs.forEach(function (attr) {
        var attrName = attr.name;
        var exp = attr.value;
        var dir = _this2._checkDirective(attrName);

        if (dir.type) {
          if (dir.type === 'if' || dir.type === 'for') {
            lazyCompileDir = dir.type;
            lazyCompileExp = exp;
          } else {
            var handler = _this2[dir.type + 'Handler'].bind(_this2);
            if (handler) {
              handler(node, vm, exp, dir.prop);
            } else {
              console.error('\u627E\u4E0D\u5230' + dir.type + '\u6307\u4EE4');
            }
          }
        }
        node.removeAttribute(attrName);
      });
      // TODO if for不能共存
      if (lazyCompileExp) {
        this[lazyCompileDir + 'Handler'](node, vm, lazyCompileExp);
      } else {
        // 向下遍历节点
        this.compile(node, vm);
      }
    }
  }, {
    key: '_checkDirective',
    value: function _checkDirective(attrName) {
      var dir = {};
      if (attrName.indexOf('f-') === 0) {
        var parse = attrName.substring(2).split(':');
        dir.type = parse[0];
        dir.prop = parse[1];
      } else if (attrName.indexOf('@') === 0) {
        dir.type = 'on';
        dir.prop = attrName.substring(1);
      } else if (attrName.indexOf(':') === 0) {
        dir.type = 'bind';
        dir.prop = attrName.substring(1);
      }
      return dir;
    }
  }, {
    key: 'compileTextNode',
    value: function compileTextNode(node, vm) {
      var text = node.textContent.trim();
      if (text) {
        var exp = this._parseTextExp(text);
        this.textHandler(node, vm || this.vm, exp);
      }
    }
    // v-text

  }, {
    key: 'textHandler',
    value: function textHandler(node, vm, exp) {
      this.bindWatcher(node, vm, exp, 'text', undefined);
    }
    // v-on

  }, {
    key: 'onHandler',
    value: function onHandler(node, vm, exp, prop) {
      node.addEventListener(prop, function () {}, false);
    }
  }, {
    key: 'ifHandler',
    value: function ifHandler(node, vm, exp) {
      // 先编译子元素，然后根据表达式决定是否插入dom中
      // PS：这里需要先插入一个占位元素来定位，不能依赖其他元素，万一其他元素没了呢？
      this.compile(node, vm);
      var refNode = document.createTextNode('');
      node.parentNode.insertBefore(refNode, node);
      var current = node.parentNode.removeChild(node);
      this.bindWatcher(current, vm, exp, 'dom', refNode); // refNode是引用关系，移动到parentNode后会自动更新位置，所以可以传入
    }
    /**
    *
    *
    * @param {any} node
    * @param {any} vm
    * @param {any} exp
    * @param {any} dir 绑定类型
    * @param {any} prop
    * @memberof Compile
    */

  }, {
    key: 'bindWatcher',
    value: function bindWatcher(node, vm, exp, dir, prop) {
      var updateFn = updater[dir];
      /* eslint-disable no-new */
      new wathcer_defaultExport(exp, vm, function (newVal) {
        updateFn(node, newVal, prop);
      });
      /* eslint-enable no-new */
    }
    /**
     * {{name}号码{{tel}}} => `name+'号码'+tel`
     * 用于eval
     *
     * @param {any} text
     * @returns
     * @memberof Compile
     */

  }, {
    key: '_parseTextExp',
    value: function _parseTextExp(text) {
      var regText = /\{\{((?:.|\n)+?)\}\}/g;
      var pieces = text.split(regText);
      var matches = text.match(regText); // 模板数组
      var tokens = [];

      pieces.forEach(function (piece) {
        if (matches && matches.indexOf('{{' + piece + '}}') > -1) {
          tokens.push(piece);
        } else if (piece) {
          tokens.push(JSON.stringify(piece));
        }
      });
      return tokens.join('+');
    }
  }, {
    key: '_nodeToFragment',
    value: function _nodeToFragment() {
      var _this3 = this;

      var fragment = document.createDocumentFragment();

      [].concat(_toConsumableArray(this.$el.childNodes)).forEach(function (child) {
        if (_this3._isIgnorable(child)) {
          _this3.$el.removeChild(child);
        } else {
          fragment.appendChild(child);
        }
      });
      return fragment;
    }
  }, {
    key: '_isIgnorable',
    value: function _isIgnorable(node) {
      var regIgnorable = /^[\t\n\r]+/;
      return node.nodeType === 8 || node.nodeType === 3 && regIgnorable.test(node.textContent);
    }
  }]);

  return Compiler;
}();

/* harmony default export */ var compiler_defaultExport = (compiler_Compiler);
// CONCATENATED MODULE: ./src/observer.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var observer__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function observer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @ts-check


var observer_Observer = function () {
  function Observer(data) {
    observer__classCallCheck(this, Observer);

    // 劫持数据
    this.observe(data);
  }

  observer__createClass(Observer, [{
    key: 'observe',
    value: function observe(data) {
      var _this = this;

      if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        Object.keys(data).forEach(function (key) {
          _this.observeObject(data, key, data[key]);
        });
      }
    }
  }, {
    key: 'observeObject',
    value: function observeObject(data, key, val) {
      var dep = new dep_defaultExport();
      var self = this;
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function get() {
          /* eslint-disable no-unused-expressions*/
          dep_defaultExport.target && dep.addSub(dep_defaultExport.target);
          /* eslint-enable no-unused-expressions*/
          return val;
        },
        set: function set(newVal) {
          if (val === newVal) {
            return;
          }
          val = newVal;
          if (Array.isArray(newVal)) {
            self.observeArray(newVal, dep_defaultExport);
          } else {
            self.observe(newVal);
          }
          dep.notify(); // 触发通知
        }
      });

      if (Array.isArray(val)) {
        this.observeArray(val, dep); // 递归监视，数组的监视要分开
      } else {
        this.observe(val); // 递归对象属性到基本类型为止
      }
    }
  }, {
    key: 'observeArray',
    value: function observeArray(arr, dep) {
      var _this2 = this;

      Object.setPrototypeOf(arr, this.defineReactiveArray(dep));
      arr.forEach(function (item) {
        _this2.observe(item);
      });
    }
    /**
     * 生成代理对象，伪装[].__proto__
     *
     * @param {any} dep
     * @returns
     * @memberof Observer
     */

  }, {
    key: 'defineReactiveArray',
    value: function defineReactiveArray(dep) {
      var _this3 = this;

      var arrayPrototype = Array.prototype;
      var arrayObject = Object.create(arrayPrototype);

      var methods = ['pop', 'push', 'shift', 'unshift', 'sort', 'reverse', 'splice'];

      methods.forEach(function (method) {
        var originalMethod = arrayPrototype[method];
        var self = _this3;

        Object.defineProperty(arrayObject, method, {
          value: function value() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var result = originalMethod.apply(this, args);
            var inserted = void 0;

            switch (method) {
              case 'push':
              case 'unshift':
                inserted = args;
                break;
              case 'splice':
                inserted = args.slice(2);
                break;
              default:
            }

            // 新增数据下可能还有对象数组，局部劫持
            if (inserted) {
              self.observeArray(inserted, dep);
            }
            dep.notify({ method: method, args: args });

            return result;
          },

          enumerable: true,
          writable: true,
          configurable: true
        });
      });
      // 提供添加/设置新值的快捷方法
      Object.defineProperty(arrayObject, '$set', {
        value: function value(index, _value) {
          // 超出数组长度默认追加到最后
          if (index >= this.length) {
            index = this.length;
          }
          return this.splice(index, 1, _value)[0];
        }
      });

      Object.defineProperty(arrayObject, '$remove', {
        value: function value(item) {
          var index = this.indexOf(item);

          if (index > -1) {
            this.splice(index, 1);
          }
        }
      });

      return arrayObject;
    }
  }]);

  return Observer;
}();

/* harmony default export */ var observer_defaultExport = (observer_Observer);
// CONCATENATED MODULE: ./src/index.js
var src__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function src__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @ts-check
// import Observer from './observer';



var src_Fuc = function () {
  function Fuc(options) {
    src__classCallCheck(this, Fuc);

    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$options = Object.assign({
      computed: {},
      methods: {}
    }, options);
    /* eslint no-underscore-dangle: 0*/
    this._proxy(options);
    this._proxyMethods(options.methods);
    /* eslint-disable  no-new*/
    new observer_defaultExport(this.$data);
    new compiler_defaultExport({ el: this.$el, vm: this });
    /* eslint-enable  no-new*/
  }
  // 代理计算属性和$data


  src__createClass(Fuc, [{
    key: '_proxy',
    value: function _proxy(options) {
      var _this = this;

      var proxy = ['data', 'computed'];

      proxy.forEach(function (item) {
        Object.keys(options[item]).forEach(function (key) {
          Object.defineProperty(_this, key, {
            configurable: true,
            enumerable: true,
            get: function get() {
              if (typeof this.$data[key] !== 'undefined') {
                return this.$data[key];
              } else if (typeof this.$options.computed[key] !== 'undefined') {
                return this.$options.computed[key].call(this);
              }
              return undefined;
            },
            set: function set(newVal) {
              if (Object.prototype.hasOwnProperty.call(this.$data, key)) {
                this.$data[key] = newVal;
              } else if (Object.prototype.hasOwnProperty.call(this.$options.computed, key)) {
                this.$options.computed[key] = newVal;
              }
            }
          });
        });
      });
    }
  }, {
    key: '_proxyMethods',
    value: function _proxyMethods(methods) {
      var _this2 = this;

      Object.keys(methods).forEach(function (key) {
        _this2[key] = _this2.$options.methods[key];
      });
    }
  }]);

  return Fuc;
}();

Object.defineProperty(window, 'Fuc', {
  value: src_Fuc
});
/* harmony default export */ __webpack_exports__["default"] = (src_Fuc);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: 'isEqual',
    value: function isEqual(a, b) {
      return a === b || JSON.stringify(a) === JSON.stringify(b);
    }
  }, {
    key: 'isObject',
    value: function isObject(val) {
      return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
    }
  }, {
    key: 'deepCopy',
    value: function deepCopy(from) {
      if (Util.isObject(from)) {
        return Object.assign({}, from);
      }
      return from;
    }
  }, {
    key: 'computeExpression',
    value: function computeExpression(exp, vm) {
      try {
        // with(context){
        /* eslint-disable no-eval */
        return eval(exp);
        /* eslint-enable no-eval */
        // }
      } catch (e) {
        console.error('ERROR', e);
        return '';
      }
    }
  }]);

  return Util;
}();

/* harmony default export */ __webpack_exports__["a"] = (Util);

/***/ })
/******/ ])));
//# sourceMappingURL=fuc.js.map