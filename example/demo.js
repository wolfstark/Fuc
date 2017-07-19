/* eslint-disable  no-new*/
window.vm = new Fuc({
  el: '#app',
  data: {
    name: '王',
    showSex: true,
    array: ['张三', '李四'],
  },
  methods: {
    toggleSex() {
      this.showSex = !this.showSex;
    },
  },
  computed: {
    username() {
      return `${this.name}翔`;
    },
  },
});
