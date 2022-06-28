axios.defaults.baseURL = 'http://www.liulongbin.top:3007';

// 添加请求拦截器
// use方法里面可以传递两个函数！
axios.interceptors.request.use(function (config) {
    // // 打印 config 参数
    // console.log(config);
    // 判断路径中，是否包含 /api 或者 /my
    //  或者 >=0  或者 !== -1  或者 > -1   都说明查到了
    if (config.url.indexOf('/my') !== -1) {
        // 此处是 = 赋值
        // config.headers = {
        //     Authorization: localStorage.getItem('token')
        // }
        // 这样赋值，不会影响原来的头信息设置！
        // 所有头信息的设置，不要使用对象赋值，要使用 .属性 ，不会出现覆盖
        config.headers.Authorization = localStorage.getItem('token')
    }
    // 修改完毕的config需要返回
    return config;
}, function (error) {
    // 将来讲解 Promise 对象，详细讲解
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // // 输出响应结果
    // console.log(response);
    // if (response.data.status === 1 && response.data.message === "身份认证失败！") {
    if (response.data.message === "身份认证失败！") {
        // 跳转到登录页面，销毁token
        location.href = 'login.html';
        localStorage.removeItem('token');
        return;
    }
    // 返回response
    return response;
}, function (error) {
    return Promise.reject(error);
});
