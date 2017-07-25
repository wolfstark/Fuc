import createElement from 'src/vdom/element';
import Diff from 'src/vdom/diff';
import chai from 'chai';

const expect = chai.expect;

describe('diff算法测试', () => {
  it('计算出差异的补丁包', () => {
    const el1 = createElement('div', { id: 'app' });
    const el2 = createElement('div', { id: 'app2' });
    const result = JSON.stringify({ 0: [{ type: 2, props: { id: 'app2' } }] });
    const patchs = JSON.stringify(new Diff(el1, el2));
    expect(result).to.deep.equal(patchs);
  });
});
