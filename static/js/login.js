/**
 * Created by Administrator on 2016/9/29.
 */
$(function(){
    //验证码
    function getRandomString(len) {
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        var maxPos = $chars.length;
        var pwd = '';
        for (  i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
    $('.text_input_span').html(getRandomString(4));

    console.log($.cookie('user'));
    //表单验证
    $('#password').attr("flag","false");
    $('#text').attr("flag","false");
    $('#password').change(function(){
        if ($('#password').val()){
            var regEx  = /^.{6,20}$/g;
            if ($('#password').val()){
                if (regEx.test($('#password').val())){
                    $(this).blur(function(){
                        $(this).css("border","1px solid #dadada")
                    });
                    $(this).parent().find('.reg_span').html("");
                    $('#password').attr("flag","true")
                }else {
                    $(this).unbind("blur");
                    $(this).parent().find('.reg_span').html("请确认您输入的密码，密码为6-20位字符。");
                    $(this).css("border","1px solid #e60000")
                }
            }
        }else {
            $(this).unbind("blur");
            $(this).parent().find('.reg_span').html("请输入您的密码");
            $(this).css("border","1px solid #e60000")
        }
    });
    $("#text").change(function(){
        if ($('#text').val()){
            if ($('#text').val() == $('.text_input_span').html()){
                $(this).blur(function(){
                    $(this).css("border","1px solid #dadada")
                });
                $(this).parent().find('.reg_span').html("");
                $("#text").attr("flag","true");
            }else {
                $(this).unbind("blur");
                $(this).parent().find('.reg_span').html("请填写正确的验证码");
                $(this).css("border","1px solid #e60000")
            }
        }else {
            $(this).unbind("blur");
            $(this).parent().find('.reg_span').html("请填写验证码");
            $(this).css("border","1px solid #e60000")
        }
    });
    //登录
    $("#submit").click(function(){
        if ($('#password').attr('flag') == "true" && $('#text').attr('flag') == "true"){
            if ($.cookie("user")){
                var arr = JSON.parse($.cookie("user"));
                for(var i=0;i<arr.length;i++){
                    if ($('#username').val() == arr[i].username && $('#password').val() == arr[i].password){
                        location.href = "index.html?username="+$('#username').val();
                        $('#username').blur(function(){
                            $(this).css("border","1px solid #dadada")
                        });
                        $('#username').parent().find(".reg_span").html("");
                    }else {
                        $('#username').unbind("blur");
                        $('#username').parent().find(".reg_span").html("用户名或密码错误！");
                        $('#username').css("border","1px solid #e60000")
                    }
                }
            }else{
                alert("无用户")
            }
        }else {
            if ($('#password').val()){
                var regEx  = /^.{6,20}$/g;
                if ($('#password').val()){
                    if (regEx.test($('#password').val())){
                        $('#password').blur(function(){
                            $('#password').css("border","1px solid #dadada")
                        });
                        $(this).parent().find('.reg_span').html("");
                        $('#password').attr("flag","true")
                    }else {
                        $('#password').unbind("blur");
                        $('#password').parent().find('.reg_span').html("请确认您输入的密码，密码为6-20位字符。");
                        $('#password').css("border","1px solid #e60000")
                    }
                }
            }else {
                $('#password').unbind("blur");
                $('#password').parent().find('.reg_span').html("请输入您的密码");
                $('#password').css("border","1px solid #e60000")
            }
            if ($('#text').val()){
                if ($('#text').val() == $('.text_input_span').html()){
                    $('#text').blur(function(){
                        $('#text').css("border","1px solid #dadada")
                    });
                    $('#text').parent().find('.reg_span').html("");
                    $("#text").attr("flag","true");
                }else {
                    $('#text').unbind("blur");
                    $('#text').parent().find('.reg_span').html("请填写正确的验证码");
                    $('#text').css("border","1px solid #e60000")
                }
            }else {
                $('#text').unbind("blur");
                $('#text').parent().find('.reg_span').html("请填写验证码");
                $('#text').css("border","1px solid #e60000")
            }
        }
        return false
    })
});


