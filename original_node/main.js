let book = {
    name: '高级程序设计',
    number: 2,
    id: 1
}

//在真正返回response之前使用，该函数会对response进行一些修改
axios.interceptors.response.use(function (response) {

    //获取method,url,data并声明这三个变量

    //   let method = config.method
    //   let url = config.url
    //   let data = config.data

    //---简写如下---
    //   let config = response.config
    //   let{method,url,data} = config    此处data是请求中的第四部分


    //---再简写如下---
    let { config: { method, url, data } } = response

    if (url === '/book/1' && method === 'get') {
        response.data = book
        //此处data是响应中的第四部分

    } else if (url === '/book/1' && method === 'put') {
        Object.assign(book, data)
        //asign 部分更新,覆值，此处是将新的data覆到后台数据库的book中

    }
    return response
})


//上面是模拟后台数据库


axios.get('/book/1')
    .then(({ data }) => {
        // data  {name: "高级程序设计", number: 2, id: 1}
        let oldHtml = $('#app').html()
        let newHtml = oldHtml.replace('__name__', data.name)
            .replace('__num__', data.number)
        $('#app').html(newHtml)
    })

$('#addOne').on('click', function () {
    let oldNumber = $('#number').text()
    let newNumber = oldNumber - 0 + 1
    axios.put('/book/1', {
        number: newNumber
    }).then(() => {
        $('#number').text(newNumber)
    })
})

$('#minusOne').on('click', function () {
    let oldNumber = $('#number').text()
    let newNumber = oldNumber - 0 - 1
    axios.put('/book/1', {
        number: newNumber
    }).then(() => {
        $('#number').text(newNumber)
    })
})

$('#reset').on('click', function () {
    $('#number').text(0)
})