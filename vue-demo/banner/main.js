let view = new Vue({
    el: '#app',
    data: {
        transformValue: '',
        imgs:['x,','y','z']
    },
    template: `
    <div>
        <div class="window">
            <div class="slids" :style="{transform:transformValue}"></div>
            <img v-for="url in imgs" v-bind:src="url" />
        </div>
        <button v-on:click="go(0)">1</button>
        <button v-on:click="go(1)">2</button>
        <button v-on:click="go(2)">3</button>
    </div>
    `,
    methods: {
        go(index) {
            this.transformValue = `translateX(${-100 * index}px)`
        }
    }
})