/* eslint-disable  no-new*/
window.vm = new Fuc({
  el: '#app',
  data: {
    name: '王',
    // showSex: true,
  },
  methods: {
    // popMsg(msg) {
    //   alert(msg);
    // },
  },
  computed: {
    username() {
      return `${this.name}翔`;
    },
  },
});
