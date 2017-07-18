import Dep from './dep';
import Util from './util';

let $uid = 0;

class Watcher {
  exp;
  vm;
  callback;
  value = null;
  uid = $uid;
  /**
   * 用于和订阅者建立联系，当数据变更时通知watcher，watcher发出命令更新Dom
   * @param {any} exp
   * @param {any} vm
   * @param {any} callback
   * @memberof Watcher
   */
  constructor(exp, vm, callback) {
    this.exp = exp;
    this.vm = vm;
    this.callback = callback || function foo() {};

    // this.value = null;
    // this.uid = $uid;
    $uid += 1;
    this.update();
  }
  update(options) {
    // Dep.target = this;
    const newVal = this.get();

    if (!Util.isEqual(this.value, newVal)) {
      this.callback(newVal, this.value, options);
    }
  }
  get() {
    Dep.target = this;
    const value = Util.computeExpression(this.exp, this.vm);
    Dep.target = null;
    return value;
  }
}
export default Watcher;
