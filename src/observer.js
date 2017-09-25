// @ts-check
import Dep from './dep';

class Observer {
  constructor(data) {
    // 劫持数据
    this.observe(data);
  }
  observe(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        this.observeObject(data, key, data[key]);
      });
    }
  }

  observeObject(data, key, val) {
    const dep = new Dep();
    const self = this;
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        /* eslint-disable no-unused-expressions */
        Dep.target && dep.addSub(Dep.target);
        /* eslint-enable no-unused-expressions */
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        if (Array.isArray(newVal)) {
          self.observeArray(newVal, Dep);
        } else {
          self.observe(newVal);
        }
        dep.notify(); // 触发通知
      },
    });

    if (Array.isArray(val)) {
      this.observeArray(val, dep); // 递归监视，数组的监视要分开
    } else {
      this.observe(val); // 递归对象属性到基本类型为止
    }
  }

  observeArray(arr, dep) {
    // 分发dep供变异函数更新数据0
    Object.setPrototypeOf(arr, this.defineReactiveArray(dep));
    arr.forEach((item) => {
      this.observe(item);
    });
  }
  /**
   * 生成代理对象，伪装[].__proto__
   *
   * @param {any} dep
   * @returns
   * @memberof Observer
   */
  defineReactiveArray(dep) {
    const arrayPrototype = Array.prototype;
    const arrayObject = Object.create(arrayPrototype);

    const methods = ['pop', 'push', 'shift', 'unshift', 'sort', 'reverse', 'splice'];

    methods.forEach((method) => {
      const originalMethod = arrayPrototype[method];
      const self = this;

      Object.defineProperty(arrayObject, method, {
        value(...args) {
          const result = originalMethod.apply(this, args);
          let inserted;

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
          dep.notify({ method, args });

          return result;
        },
        enumerable: true,
        writable: true,
        configurable: true,
      });
    });
    // 提供添加/设置新值的快捷方法
    Object.defineProperty(arrayObject, '$set', {
      value(index, value) {
        // 超出数组长度默认追加到最后
        if (index >= this.length) {
          index = this.length;
        }
        return this.splice(index, 1, value)[0];
      },
    });

    Object.defineProperty(arrayObject, '$remove', {
      value(item) {
        const index = this.indexOf(item);

        if (index > -1) {
          this.splice(index, 1);
        }
      },
    });

    return arrayObject;
  }
}
export default Observer;
