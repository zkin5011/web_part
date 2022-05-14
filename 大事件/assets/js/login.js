$(function(){
   // 点击去注册
   $('#link-reg').on('click',function(){
      $('.login-box').hide()
      $('.reg-box').show()
   })
   // 点击去登陆
   $("#link-login").on('click', function (  ) {
         $('.login-box').show()
         $('.reg-box').hide()
        
   })
   // 通过layui中获取form对象
   var form =layui.form
   // 获取layui
   var layer = layui.layer

   //通过form.verify()
   form.verify({
      // 自定义一个叫pwd
      repwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
      reqwd:function(value){
         // 通过形参拿到的是确认密码框
         // 还需要拿到内容
         // 然后进行一次等于的判断
         // 判断失误则return
         var pwd =$('.reg-box [name=password]').val()
         if (pwd != value) {
            return '两次密码不一致'
         }
      }
   })
//   监听注册表单的事件
 $("#form_reg").on('submit', function(e){
    e.preventDefault()
    $.post('http://www.liulongbin.top:3007/api/reguser',{
       username:$('#form_reg [name=username]').val(),
       password:$('#form_reg [name=password]').val()}, function(res){
         if (res.status !== 0) {
            return layer.msg(res.message)
         }
         layer.msg('注册成功')
         // 模拟点击
         $('#link-login').click()
    })
   })
   // 监听登陆表单的提交事件
   $("#form_login").submit(function(e){
      // 阻止默认提交行为
      e.preventDefault()
      $.ajax({
         url:'/api/login',
         method:'POST',
         data:$(this).serialize(),
         success:function ( res ) {
            if (res.status !==0) {
               return layer.msg('登陆失败！')
            }
            layer.msg('登陆成功！')
            // console.log(res.token) 
            // localstorage
            localStorage.setItem('token',res.token)
            // 跳转后台
            location.href='/index.html'
         }
      })
   })
}) 