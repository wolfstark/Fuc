// @ts-check
// import Observer from './observer';
import Compiler from './compiler';
import Observer from './observer';

class Fuc {
  constructor(options) {
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$options = Object.assign(
      {
        computed: {},
        methods: {},
      },
      options,
    );
    /* eslint no-underscore-dangle: 0*/
    this._proxy(this.$options);
    this._proxyMethods(options.methods);
    /* eslint-disable  no-new*/
    new Observer(this.$data);
    new Compiler({ el: this.$el, vm: this });
    /* eslint-enable  no-new*/
  }
  // 代理计算属性和$data
  _proxy(data) {
    const proxy = ['data', 'computed'];

    proxy.forEach((item) => {
      Object.keys(data[item]).forEach((key) => {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: true,
          get() {
            if (typeof this.$data[key] !== 'undefined') {
              return this.$data[key];
            } else if (typeof this.$options.computed[key] !== 'undefined') {
              return this.$options.computed[key].call(this);
            }
            return undefined;
          },
          set(newVal) {
            if (Object.prototype.hasOwnProperty.call(this.$data, key)) {
              this.$data[key] = newVal;
            } else if (Object.prototype.hasOwnProperty.call(this.$options.computed, key)) {
              this.$options.computed[key] = newVal;
            }
          },
        });
      });
    });
  }
  _proxyMethods(methods) {
    Object.keys(methods).forEach((key) => {
      this[key] = this.$options.methods[key];
    });
  }
}
Object.defineProperty(window, 'Fuc', {
  value: Fuc,
});
export default Fuc;
