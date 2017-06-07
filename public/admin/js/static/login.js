layui.use(['form', 'layer'], function() {
    var $ = layui.jquery,
        form = layui.form(),
        layer = layui.layer;
    // 验证
    form.verify({
        password: [/(.+){6,12}$/, '密码必须6到12位']
    });
    // 提交监听
    form.on('submit(login)', function(data) {
        axios.post('/admin/auth', data.field)
            .then(function(response) {
                if (response.data.code == 200) {
                    layer.msg(response.data.message, { icon: 6, shade: 0.5,shift:1, time: 1000 }, function() {
                        window.location.href = '/admin/index'
                    });
                } else {
                    layer.msg(response.data.message,{shift:1,shade: 0.5});
                }
            }).catch(function(error) {
                console.log(error);
            });
        return false;
    })
});
