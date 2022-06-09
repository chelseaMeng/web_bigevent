$(function () {
  //点击去注册账号 让登录框隐藏 注册框显示
  $('#link_reg').on('click', () => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  //点击去登录让注册框隐藏 登录框显示
  $('#link_login').on('click', () => {
    $('.login-box').show();
    $('.reg-box').hide();
  });
  //先引入form 来自layui
  const form = layui.form;
  //自定义校验规则   调用form.verify()函数
  form.verify({
    //数组方式
    // 自定义一个叫 pwd 的校验规则
    //password和repwd这样的属性(也就是自定义校验规则会传递给input的属性lay-verify,作为他的值,通过管道符的形式向后书写)
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    // 形参中的value是再次确认中的值,结构内部定义好的
    repwd: (value) => {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      //[name=password] 属性选择器,通过.reg-box [name=password]可以定位到当前的文本框
      //input中添加name=password 属性,是在提交的时候name的值,也就是password=input.val(),以参数的形式传递给后端
      const pwd = $('.reg-box [name=password]').val(); //拿到密码框中的值
      console.log(pwd, value);
      if (pwd !== value) return '两次密码不一致';
    },
  });

  //基本路径
  //   const baseUrl = 'http://www.liulongbin.top:3007';

  //监听注册表单提交
  $('#form_reg').submit((e) => {
    e.preventDefault();
    //发送提交请求
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        console.log(res.message);
        layer.msg('注册成功');
        //模拟点击事件,跳转到登录
        $('#link_login').click();
      },
    });
  });

  //监听登录表单提交
  $('#form_login').submit(function (e) {
    e.preventDefault();
    //发送POST请求
    $.ajax({
      type: 'POST',
      url: '/api/login',
      //serialize()获取表单中有name属性的元素的数据
      data: $(this).serialize(),
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg('登录成功');
        //将 token 保存到本地
        localStorage.setItem('token', res.token);
        //跳转到index.html
        location.href = '/index.html';
      },
    });
  });
});
