fakeData()


//上面是模拟后台数据库

let model = {
    data: {
        name: '',
        munber: 0,
        id: ''
    },
    fetch(id) {
        return axios.get(`/book/${id}`).then((response) => {
            this.data = response.data
            return response
        })
    },
    update(data) {
        let id = this.data.id
        return axios.put(`/book/${id}`, data).then((response) => {
            this.data = response.data
            return response
        })
    }
}

let view = {
    el: '#app',
    template: `
    <div>
     书名：《__name__》
     数量：<span id="number">__number__</span>个
    </div>
    <div>
     <button id="addOne">加1</button>
     <button id="minusOne">减1</button>
     <button id="reset">清空</button>
    </div>
    `,
    render(data) {
        let html = this.template.replace('__name__', data.name)
            .replace('__number__', data.number)
        $(this.el).html(html)
    }
}

let controller = {
    //初始化
    init(options) {
        let view = options.view
        let model = options.model
        this.view = view
        this.model = model
        this.view.render(this, model.data)
        this.bindEvents()
        //get
        this.model.fetch(1)
            .then(() => {
                // data  {name: "高级程序设计", number: 2, id: 1}
                this.view.render(this.model.data)
            })
    },
    addOne() {
        let oldNumber = $('#number').text()
        let newNumber = oldNumber - 0 + 1
        model.update({ number: newNumber }).then(() => {
            view.render(model.data)
        })
    },
    minusOne() {

        let oldNumber = $('#number').text()
        let newNumber = oldNumber - 0 - 1
        model.update({ number: newNumber }).then(() => {
            view.render(model.data)
        })
    },
    reset() {

        model.update({ number: 0 }).then(() => {
            $('#number').text(0)
        })
    },
    bindEvents() {
        //put
        $(this.view.el).on('click', '#addOne', this.addOne)
        $(this.view.el).on('click', '#minusOne', this.minusOne)
        $(this.view.el).on('click', '#reset', this.reset)
    }
}
controller.init({ view: view, model: model })


//模拟数据库

function fakeData() {
    let book = {
        name: '高级程序设计',
        number: 2,
        id: 1
    }

    axios.interceptors.response.use(function (response) {

        let { config: { method, url, data } } = response

        if (url === '/book/1' && method === 'get') {
            response.data = book
            //此处data是响应中的第四部分

        } else if (url === '/book/1' && method === 'put') {
            data = JSON.parse(data)//***注意
            Object.assign(book, data)
            //asign 部分更新,覆值，此处是将新的data覆到后台数据库的book中
            response.data = book//***注意

        }
        return response
    })
}