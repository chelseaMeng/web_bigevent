$(function () {
  const form = layui.form;
  const initArtCateList = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取文章分类列表失败');
        //   console.log(res);
        //调用模引擎渲染页面
        const htmlStr = template('tpl-table', res);
        $('tbody').empty().html(htmlStr);
      },
    });
  };
  let indexAdd = null;
  //给添加按钮绑定点击事件
  $('#btnAddCate').click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    });
  });

  //添加文章分类 通过事件委托
  //给表单的父级绑定提交事件,利用事件委托,因为是一个自定义模板,没有父级,所以绑定到body身上

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('添加文章分类失败');
        layer.msg('添加文章分类成功');
        //重新渲染数据列表
        initArtCateList();
        //关闭弹窗
        layer.close(indexAdd);
      },
    });
  });

  //通过事件委托方式打开编辑框
  let indexEdit = null;
  $('tbody').on('click', '.btn-edit', function () {
    //修改数据需要拿到该数据结构的id,所以给这个结构绑定一个自定义属性,获取id
    const id = $(this).attr('data-id');
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    });
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        //通过layui的form属性,快速获取表单数据
        form.val('form-edit', res.data);
      },
    });
  });

  //更新文章分类的数据
  // 通过 事件委派 的方式，给修改按钮绑定点击事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      //快速获取表单数据 包括分类名称 分类别名 id
      data: $(this).serialize(),
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg('修改文章分类失败');
        layer.msg('修改文章分类成功');
        //重新渲染数据列表
        initArtCateList();
        //关闭弹窗
        layer.close(indexEdit);
      },
    });
  });

  // 删除文章分类
  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id');
    // 提示用户是否删除
    layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        //删除文章列表页是发送get请求
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！');
          }
          layer.msg('删除分类成功！');
          //重新渲染数据
          initArtCateList();
          //关闭弹窗
          layer.close(index);
        },
      });
    });
  });
  initArtCateList();
});
