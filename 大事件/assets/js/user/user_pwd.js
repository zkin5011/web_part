$(function () {
  // 自定义效验规则
  let form = layui.form;
  form.verify({
     // 属性是规则名称，值是具体的规则;
        // 值有两种: 数组或者函数！
        // 规则1：密码校验规则;
        pwd: [
          /^[\S]{6,12}$/, 
          '密码必须6到12位，且不能出现空格'
      ],
    // 新密码，不能和旧密码一样
    newPwd: function (value) {
      // 获取旧密码的值
      let v1 = $('[name=oldPwd]').val();
      // 报错信息条件: 和旧密码值一样！
      if (value == v1) {
          return '新密码和旧密码不能相同！';
      }
  },
    // 确认新密码一致
    rePwd: function (value) {
      // 获取新密码的值
      let v2 = $("[name=newPwd]").val();
      // 报错信息条件: 和新密码不一致就报错！
      if (value !== v2) {
          return '两次密码输入不一致！'
      }
  }
  });
  // 需求：修改密码
  $("#formPwd").on('submit',function ( e ) {
    e.preventDefault();
    // 发送ajax
    axios({
      method:"POST",
      url:'/my/updatepwd',
      data:$(this).serialize()
    }).then(res =>{
      // console.log(res)
      if (res.data.status !== 0) {
        return layui.layer.msg(res.data.message);
      }
      // 成功:提示
      layui.layer.msg("恭喜你，修改成功");
      $("#formPwd")[0].reset();
      // 页面跳转
      // setTimeout (()=>{
      //   window.parent.location.href ='../login.html';
      // },3000);
    })
  })
})