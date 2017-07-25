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
  applyPatches(node, currentPatches) {}
}
export default Patch;