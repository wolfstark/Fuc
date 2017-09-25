class Patch {
  static REPLACE = 0;
  static REORDER = 1;
  static PROPS = 2;
  static TEXT = 3;
  walker = { index: 0 };
  constructor(node, patches) {
    this.dfsWalf(node, patches);
  }
  dfsWalf(node, patches) {
    const currentPatches = patches[this.walker.index];
    const childNodes = [...node.childNodes];

    childNodes.forEach((child) => {
      this.walker.index += 1;
      this.dfsWalf(child, patches);
    });

    if (currentPatches) {
      this.applyPatches(node, currentPatches);
    }
  }
  applyPatches(node, currentPatches) {
    currentPatches.forEach((currentPatch) => {
      let newNode = null;

      switch (currentPatch.type) {
        case this.REPLACE:
          newNode =
            typeof currentPatch.node === 'string'
              ? document.createTextNode(currentPatch.node)
              : currentPatch.node.render();
          node.parentNode.replaceChild(newNode, node);
          break;
        case this.REORDER:
          this.reorderChildren(node, currentPatch.moves);
          break;
        case this.PROPS:
        case this.TEXT:
        default:
      }
    });
  }
  reorderChildren(node, moves) {
    const staticNodeList = [...node.childNodes];
    const maps = {};

    staticNodeList.forEach((childNode) => {
      if (childNode.nodeType === 1) {
        // 元素节点
        const key = childNode.getAttribute('key');
        if (key) {
          maps[key] = node;
        }
      }
    });

    moves.forEach((move) => {
      const index = move.index;

      if (move.type === 0) {
        // 删除
        if (staticNodeList[index] === node.childNodes[index]) {
          // 可能已经被删了
          node.removeChild(node.childNodes[index]);
        }
        staticNodeList.splice(index, 1);
      } else if (move.type === 1) {
        // 插入
        const insertNode = maps[move.item.index]
          ? maps[move.item.index]
          : typeof move.item === 'object' ? move.item.render() : document.createTextNode(move.item);

        staticNodeList.splice(index, 0, insertNode);
        node.inserBefore(insertNode, node.childNodes[index] || null);
      }
    });
  }
}
export default Patch;
