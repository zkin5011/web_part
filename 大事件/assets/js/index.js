// 入扣函数
$(function(){
    // 需求
    getUserinfo();
});
function getUserinfo() {
   axios({
          // 请求方式是GET，可以省略
          // method: 'GET', 
          url: '/my/userinfo',
          // // 通过请求头设置token身份认证
          // headers: {
          //     Authorization: localStorage.getItem('token')
          // }
      }).then(res => {
          console.log(res.data.data);
          // 判断
          if (res.data.status !== 0) {
              return layui.layer.msg(res.data.message);
          }
          // 渲染
          renderAvatar(res.data.data);
      });
}
// 渲染用户信息
function renderAvatar(user) {
    // 渲染欢迎 - 如果有nickname优先渲染nickname，没有nickname渲染username
    //  || 链接两个值，如果第一个值是false类型，返回第二个值,无论第二个值是什么;
    //  && 链接两个值，如果第一个是false类型，直接返回;
    let name = user.nickname || user.username;
    $(".welcome").html('欢迎&nbsp;' + name);
    // 处理头像 - 如果有图片头像渲染图片头像，否则渲染文字头像
    if (user.user_pic !== null) {
        // 如果有图片头像渲染图片头像 - 隐藏文字头像，显示图片头像
        $(".avatar-text").hide();
        $(".layui-nav-img").show().attr('src', user.user_pic);
    } else {
        // 没有图片头像，就渲染文字头像 - 隐藏图片头像，显示文字头像
        $(".layui-nav-img").hide();
        // 渲染name中的第一个单词字符，而且大写！
        let first = name[0].toUpperCase();
        $(".avatar-text").show().html(first);
    }
}
