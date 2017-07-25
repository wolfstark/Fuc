import listDiff from 'list-diff2';
import Patch from './patch';

class Diff {
  constructor(oldTree, newTree) {
    const index = 0;
    const patches = {};
    this.dfsWalk(oldTree, newTree, index, patches);
    return patches;
  }
  diffProps(oldNode, newNode) {
    let count = 0;
    const oldProps = oldNode.props;
    const newProps = newNode.props;

    let value = null;
    const propsPatches = {};

    // Find out different properties
    Object.keys(oldProps).forEach((key) => {
      value = oldProps[key];
      if (newProps[key] !== value) {
        count += 1;
        propsPatches[key] = newProps[key];
      }
    });

    // Find out new property
    Object.keys(newProps).forEach((key) => {
      value = newProps[key];
      if (!Object.prototype.hasOwnProperty.call(oldProps, key)) {
        count += 1;
        propsPatches[key] = newProps[key];
      }
    });

    // If properties all are identical
    if (count === 0) {
      return null;
    }

    return propsPatches;
  }
  dfsWalk(oldNode, newNode, index, patches) {
    const currentPatch = [];

    // Node is removed.
    if (newNode === null) {
      // Real DOM node will be removed when perform reordering,
      // so has no needs to do anthings in here TextNode content replacing
    } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
      if (newNode !== oldNode) {
        currentPatch.push({ type: Patch.TEXT, content: newNode });
      }
      // Nodes are the same, diff old node's props and children
    } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
      // Diff props
      const propsPatches = this.diffProps(oldNode, newNode);
      if (propsPatches) {
        currentPatch.push({ type: Patch.PROPS, props: propsPatches });
      }
      // Diff children. If the node has a `ignore` property, do not diff children
      if (!this.isIgnoreChildren(newNode)) {
        this.diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
      }
      // Nodes are not the same, replace the old node with new node
    } else {
      currentPatch.push({ type: Patch.REPLACE, node: newNode });
    }

    if (currentPatch.length) {
      patches[index] = currentPatch;
    }
  }

  diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    const diffs = listDiff(oldChildren, newChildren, 'key');
    newChildren = diffs.children;

    if (diffs.moves.length) {
      const reorderPatch = { type: Patch.REORDER, moves: diffs.moves };
      currentPatch.push(reorderPatch);
    }

    let leftNode = null;
    let currentNodeIndex = index;

    oldChildren.forEach((child, i) => {
      const newChild = newChildren[i];
      currentNodeIndex =
        leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
      this.dfsWalk(child, newChild, currentNodeIndex, patches);
      leftNode = child;
    });
  }

  isIgnoreChildren(node) {
    return node.props && Object.prototype.hasOwnProperty.call(node.props, 'ignore');
  }
}
export default Diff;
