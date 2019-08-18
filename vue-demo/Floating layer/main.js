let view = new Vue({
    el: '#app',
    data: {
      open:false
    },
    template: `
    <div>
      <button v-on:click="toggle">按钮</button>
    <div v-if="open" class="hello">你好</div>
  </div>
  `,
    methods:{
      toggle(){
        this.open=!this.open
      }
    }
  })