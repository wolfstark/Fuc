/* eslint-disable  no-new*/
window.vm = new Fuc({
  el: '#app',
  data: {
    name: '王翔',
    showSex: true,
    message: 'Hello Fuc!',
  },
  methods: {
    popMsg(msg) {
      alert(msg);
    },
  },
});
