$(function () {
    $("#link_reg").on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    var layer = layui.layer
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val()
            if (value !== pwd) {
                return '两次输入的密码不一致'
            }
        }
    })
    $('.reg-form').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('.reg-form [name = username]').val(),
            password: $('.reg-form [name = password]').val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录')
                $('#link_login').click()
            }
        })
    })
    $('.login-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })
})