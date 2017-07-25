// import _ from './util';
class Element {
  tagName;
  props;
  children;
  key;
  // count = 0;
  /**
   * Creates an instance of Element.
   * @param {String} tagName
   * @param {Object} props
   * @param {Array<Element|String>} children
   * @memberof Element
   */
  constructor(tagName, props = {}, children = []) {
    [this.tagName, this.props, this.children, this.key] = [tagName, props, children, props.key];
  }
  render() {
    const el = document.createElement(this.tagName);

    Object.keys(this.props).forEach((propName) => {
      const propValue = this.props[propName];
      el.setAttribute(propName, propValue);
    });

    this.children.forEach((child) => {
      // 文本也要转换为节点
      const childEl = child instanceof Element ? child.render() : document.createTextNode(child);
      el.appendChild(childEl);
    });

    return el;
  }
}

function createElement(...args) {
  return new Element(...args);
}
createElement('div', { id: 'app' }, [{ tagName: 'div' }]);
export default createElement;
