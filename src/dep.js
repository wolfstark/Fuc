class Dep {
  static target;
  subs = {};

  addSub(target) {
    if (!this.subs[target.uid]) {
      this.subs[target.uid] = target;
    }
  }
  notify(options) {
    Object.keys(this.subs).forEach((key) => {
      this.subs[key].update(options);
    });
  }
}
export default Dep;
