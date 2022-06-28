$(function () {
   // 获取裁剪
   var $image = $("#image")
   // 配置选项
   const options = {
      aspectRatio: 1,
      preview: '.img-preview'
   }
   $image.cropper(options);
   // 选择头像，渲染，上传
   $("#chooseImageBtn").on('click', function () {
      $("#chooseImageInp").click();
   });
   // 渲染图片
   $("#chooseImageInp").on("change", function () {
      // 获取文件,this不需要$()因为files属性实在DOM对象上
      let file = this.files[0];
      // 飞空效验
      if (file === undefined) {
         return layui.layer.msg("上传头像，不能为空")
      }
      // 文件路径
      let url = URL.createObjectURL(file);
      console.log(url);
      // 赋值
      $image.cropper('destroy')
         //先销毁，然在设置，最后渲染
         .attr("src", url)
         .cropper(options)
   })
   // 上传头像
   $("#uploadBtn").on("click", function () {
      // 裁剪区域的图片，转换为base64
      var dataURL = $image
         .cropper('getCroppedCanvas', {
            width: 100,
            height: 100
         })
         .toDataURL('image/Png')
      console.log(dataURL) 
      axios({
         method: "POST",
         url: '/my/update/avatar',
         data: "avatar=" + encodeURIComponent(dataURL)
      }).then(res => {
         if (res.data.status !== 0) {
            return layui.layer.msg(res.data.message)
         }
         layui.layer.msg("恭喜你，更改成功");
         window.parent.getUserInfo();
      })
   })

})