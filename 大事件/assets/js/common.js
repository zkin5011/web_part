axios.defaults.baseURL = 'http://www.liulongbin.top:3007';

// 需求角度出发
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
// 请求拦截器
axios.interceptors.request.use( function(config){
  // 打印
  // console.log(config);
  // 判断路径中，是否包含/api  或者/my
  // >=0 !==-1 >-1 说明查到了
  if(config.url.indexOf('/my') !== -1){
    config.headers = {
      Authorization: localStorage.getItem('token')
    }
  }
  // 修改完毕需要返回
  return config;
},function(error){
  // promise
  return Promise.reject(error);
})
// 登陆拦截
axios.interceptors.response.use(function(response){
  console.log(response);
if (response.data.message === '身份认证失败！') {
    location.href="login.html";
    localStorage.removeItem("token");
    return;
}
  return response;
},function(error){
  return Promise.reject(error);
});
