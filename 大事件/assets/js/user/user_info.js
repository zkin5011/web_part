$(function () {
    // 需求1: 定义校验规则
    let form = layui.form;
    // form对象中有一个方法verify专门定义规则
    // 参数是对象类型：属性是规则名称，值: 数组或者函数;
    form.verify({
        nickname: [
            /^[\S]{1,10}$/,
            '昵称的长度为1-10个字符!'
        ]
    });

    // 需求2: 渲染用户信息 - 封装成函数，后面还要用;
    //   函数不调用，不执行;
    let layer = layui.layer;
    initUserInfo();
    function initUserInfo() {
        axios({
            method: 'GET',
            url: '/my/userinfo',
        }).then(res => {
            // console.log(res);
            // 判断
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            }
            // 根据官网，为form表单赋值！
            // 内置模块->表单->表单赋值/取值
            form.val('formUserInfo', res.data.data);
        });
    }

    // 需求3: 重置功能
    // $("form").on("reset", function (e) {
    $("#btnReset").on("click", function (e) {
        // 阻止表单默认重置行为
        e.preventDefault();
        // 重新渲染表单
        initUserInfo();
    });

    // 需求4: 修改用户信息
    $("form").on('submit', function (e) {
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/my/userinfo',
            // 设置了 参数； 根据参数类型会设置头信息;  a=1&b=2&c=3
            //   content-type: application/x-www-form-urlencoded
            data: $(this).serialize(),
        }).then((res) => {
            console.log(res);
            if (res.data.status != 0) {
                return layer.msg(res.data.message);
            }
            // 成功：提示
            layer.msg("恭喜你，修改用户信息成功！")
            // 直接调用无效，因为不是一个window对象！
            window.parent.getUserInfo();
        });
    })

});