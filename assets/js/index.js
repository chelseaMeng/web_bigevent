//获取用户信息函数
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: function (res) {
      //   console.log(res);
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg('获取用户信息成功');
      //调用渲染用户信息函数
      renderAvatar(res.data);
    },
    // //无论请求成功失败都会调用这个函数
    // complete: (res) => {
    //   console.log(res);
    //   //res.responseJSON.status===1说明获取用户信息失败
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     //1.强制清空token
    //     localStorage.removeItem('token');
    //     //2.跳转到登录页面
    //     location.href = '/login.html';
    //   }
    // },
  });
}

//封装渲染用户信息函数
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  //渲染欢迎语
  $('#welcome').html(`欢迎 ${name}`);
  //渲染头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', 'user.user_pic').show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').attr('src', 'user.user_pic').hide();
    let first = name[0].toUpperCase();
    $('.text-avatar').html().show(first);
  }
};

//退出登录
$('#btnLogout').click(() => {
  layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
    //1.清空本地存储的token
    localStorage.removeItem('token');
    // 2.跳转到登录页面
    location.href = '/login.html';
  });
});

//获取用户列表
getUserInfo();
