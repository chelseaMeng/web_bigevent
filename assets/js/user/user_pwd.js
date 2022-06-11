$(function () {
  const form = layui.form;
  //自定义验证规则
  form.verify({
    //密码验证
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //校验两次密码不能相同
    samePwd: (value) => {
      if (value === $('[name=oldPwd]').val()) return '新密码不能和原密码相同';
    },
    //校验新密码和确认密码是否相同
    rePwd: (value) => {
      if (value !== $('[name=newPwd]').val()) return '新密码和确认密码不相同';
    },
  });

  //更新密码
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('更新密码失败');
        layer.msg('更新密码成功');
        //1.强制清空token
        localStorage.removeItem('token');
        //2.跳转到父页面中的login界面
        window.parent.location.href = '/login.html';
      },
    });
  });
});
