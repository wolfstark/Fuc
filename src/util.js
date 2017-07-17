export default class Util {
  static isEqual(a, b) {
    return a === b || JSON.stringify(a) === JSON.stringify(b);
  }
  static isObject(val) {
    return val !== null && typeof val === 'object';
  }
  static deepCopy(from) {
    if (Util.isObject(from)) {
      return Object.assign({}, from);
    }
    return from;
  }
  static computeExpression(exp, vm) {
    try {
      // with(context){
      /* eslint-disable no-eval */
      return eval(exp);
      /* eslint-enable no-eval */
      // }
    } catch (e) {
      window.console.error('ERROR', e);
      return '';
    }
  }
}
