import createElement from 'src/vdom/element';
import chai from 'chai';
import jsdom from 'mocha-jsdom';

const expect = chai.expect;

describe('vElement测试', () => {
  jsdom();
  it('Element实例与输入应该相同', () => {
    const el = createElement('div', { id: 'app' }, ['test']);
    const target = { tagName: 'div', props: { id: 'app' }, children: ['test'] };

    expect(JSON.stringify(el)).to.deep.equal(JSON.stringify(target));
  });
  it('render函数生成Dom', () => {
    const el = createElement('div', { id: 'app' }, ['test']).render();
    document.body.appendChild(el);
  });
});
