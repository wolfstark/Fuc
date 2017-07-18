/* eslint-disable  no-new*/
window.vm = new Fuc({
  el: '#app',
  data: {
    name: '王',
    showSex: true,
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
