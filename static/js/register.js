
/**
 * Created by Administrator on 2016/9/29.
 */
$(function(){
    //按钮
    $('.btn').hover(function(){
        $(this).css("border","1px solid #e60000").css("text-decoration","underline")
    },function(){
        $(this).css("border","1px solid #d1d1d1").css("text-decoration","none")
    });

    //验证码
    function getRandomString(len) {
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
    $('.text_input_span').html(getRandomString(4));

    //表单验证
    $("#username").attr("flag","false");
    $("#phoneNum").attr("flag","false");
    $("#text").attr("flag","false");
    $("#phoneText").attr("flag","false");
    $("#password").attr("flag","false");
    $("#a_password").attr("flag","false");

    $("#username").change(function(){
        if ($("#username").val()){
            if ($("#username").val().length<4 || $("#username").val().length>20){
                $(this).next().html("请确认您输入的用户名在4-20字符");
                $(this).unbind("blur");
                $(this).css("border","1px solid #e60000")
            }else {
                if ($.cookie("user")){
                    var userName = JSON.parse($.cookie("user"));
                    for(var i=0;i<userName.length;i++){
                        if ($("#username").val() == userName[i].username){
                            $(this).next().html("已存在该用户名");
                            $(this).unbind("blur");
                            $(this).css("border","1px solid #e60000")
                        }else {
                            $(this).blur(function(){
                                $(this).css("border","1px solid #dadada")
                            });
                            $(this).next().html("");
                            $("#username").attr("flag","true");
                        }
                    }
                }else {
                    $(this).blur(function(){
                        $(this).css("border","1px solid #dadada")
                    });
                    $(this).next().html("");
                    $("#username").attr("flag","true");
                }
            }
        }else {
            $(this).unbind("blur");
            $(this).next().html("请输入您的用户名");
            $(this).css("border","1px solid #e60000")
        }
    });
    $("#phoneNum").change(function(){
       if($('#phoneNum').val()){
           var regEx = /^[0-9]{11}$/;
           if(regEx.test($('#phoneNum').val())){
               $(this).blur(function(){
                   $(this).css("border","1px solid #dadada")
               });
               $(this).next().html("");
               $("#phoneNum").attr("flag","true");
           }else {
               $(this).next().html("请正确填写您的手机号码");
               $(this).unbind("blur");
               $(this).css("border","1px solid #e60000")
           }
       }else {
           $(this).unbind("blur");
           $(this).next().html("请填写您的手机号码");
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
    $('.text_input_a').click(function(){
        $('.text_input_span').html(getRandomString(4));
        return false
    });
    $('#phoneText').change(function(){
        if ($('#phoneText').val()){
            $(this).blur(function(){
                $(this).css("border","1px solid #dadada")
            });
            $(this).parent().find('.reg_span').html("");
            $("#phoneText").attr("flag","true");
        }else {
            $(this).unbind("blur");
            $(this).parent().find('.reg_span').html("请填写短信验证码");
            $(this).css("border","1px solid #e60000")
        }
    });
    $('#password').change(function(){
        if ($('#password').val()){
            var regEx  = /^.{6,20}$/g;
            if ($('#password').val()){
                if (regEx.test($('#password').val())){
                    $(this).blur(function(){
                        $(this).css("border","1px solid #dadada")
                    });
                    $(this).parent().find('.reg_span').html("");
                    $("#password").attr("flag","true");
                }else {
                    $(this).unbind("blur");
                    $(this).parent().find('.reg_span').html("对不起，请检查您的输入。密码设置支持6-20位字母、符号或数字，密码区分大小写");
                    $(this).css("border","1px solid #e60000")
                }
            }
        }else {
            $(this).unbind("blur");
            $(this).parent().find('.reg_span').html("请设置您的密码");
            $(this).css("border","1px solid #e60000")
        }
    });
    $('#a_password').change(function(){
        if ($('#a_password').val()){
            if ($("#password").attr("flag") == "true"){
                if ($('#a_password').val() == $('#password').val()){
                    $(this).blur(function(){
                        $(this).css("border","1px solid #dadada")
                    });
                    $(this).parent().find('.reg_span').html("");
                    $("#a_password").attr("flag","true");
                }else {
                    $(this).unbind("blur");
                    $(this).parent().find('.reg_span').html("两次输入密码不一致，请再次输入");
                    $(this).css("border","1px solid #e60000")
                }
            }else {
                $(this).unbind("blur");
                $(this).parent().find('.reg_span').html("对不起，请检查您的输入。密码设置支持6-20位字母、符号或数字，密码区分大小写");
                $(this).css("border","1px solid #e60000")
            }
        }else {
            $(this).unbind("blur");
            $(this).parent().find('.reg_span').html("请确认密码");
            $(this).css("border","1px solid #e60000")
        }
    });
    $('#submit').click(function(){
        if ($("#username").attr("flag") == "true" &&
            $("#phoneNum").attr("flag") == "true" &&
            $("#text").attr("flag") == "true" &&
            $("#phoneText").attr("flag") == "true" &&
            $("#password").attr("flag") == "true" &&
            $("#a_password").attr("flag") == "true" &&
            $("#checkbox").attr("value") == "true"){
            //存入cookie
            var arr = $.cookie("user")?JSON.parse($.cookie("user")):[];
            var use = {
                "username":$("#username").val(),
                "password":$("#password").val(),
                "phoneNum":$("#phoneNum").val()
            };
            arr.push(use);
            $.cookie("user",JSON.stringify(arr),{expires:30, path:"/"});
            location.href = "login.html"
        }else {
            if ($("#username").val()){
                if ($("#username").val().length<4 || $("#username").val().length>20){
                    $("#username").next().html("请确认您输入的用户名在4-20字符");
                    $("#username").unbind("blur");
                    $("#username").css("border","1px solid #e60000");
                }else {
                    if ($.cookie("user")){
                        var userName = JSON.parse($.cookie("user"));
                        for(var i=0;i<userName.length;i++){
                            if ($("#username").val() == userName[i].username){
                                $("#username").next().html("已存在该用户名");
                                $("#username").unbind("blur");
                                $("#username").css("border","1px solid #e60000")
                            }else {
                                $("#username").blur(function(){
                                    $("#username").css("border","1px solid #dadada")
                                });
                                $("#username").next().html("");
                                $("#username").attr("flag","true");
                            }
                        }
                    }else {
                        $("#username").blur(function(){
                            $("#username").css("border","1px solid #dadada")
                        });
                        $("#username").next().html("");
                        $("#username").attr("flag","true");
                    }
                }
            }else {
                $("#username").unbind("blur");
                $("#username").next().html("请输入您的密码");
                $("#username").css("border","1px solid #e60000")
            }
            if($('#phoneNum').val()){
                var regEx = /^[0-9]{11}$/;
                if(regEx.test($('#phoneNum').val())){
                    $('#phoneNum').blur(function(){
                        $('#phoneNum').css("border","1px solid #dadada")
                    });
                    $('#phoneNum').next().html("");
                    $("#phoneNum").attr("flag","true");
                }else {
                    $('#phoneNum').next().html("请正确填写您的手机号码");
                    $('#phoneNum').unbind("blur");
                    $('#phoneNum').css("border","1px solid #e60000")
                }
            }else {
                $('#phoneNum').unbind("blur");
                $('#phoneNum').next().html("请填写您的手机号码");
                $('#phoneNum').css("border","1px solid #e60000")
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
            if ($('#phoneText').val()){
                $('#phoneText').blur(function(){
                    $('#phoneText').css("border","1px solid #dadada")
                });
                $('#phoneText').parent().find('.reg_span').html("");
                $("#phoneText").attr("flag","true");
            }else {
                $('#phoneText').unbind("blur");
                $('#phoneText').parent().find('.reg_span').html("请填写短信验证码");
                $('#phoneText').css("border","1px solid #e60000")
            }
            if ($('#password').val()){
                var regEx  = /^.{6,20}$/g;
                if ($('#password').val()){
                    if (regEx.test($('#password').val())){
                        $('#password').blur(function(){
                            $('#password').css("border","1px solid #dadada")
                        });
                        $('#password').parent().find('.reg_span').html("");
                        $("#password").attr("flag","true");
                    }else {
                        $('#password').unbind("blur");
                        $('#password').parent().find('.reg_span').html("对不起，请检查您的输入。密码设置支持6-20位字母、符号或数字，密码区分大小写");
                        $('#password').css("border","1px solid #e60000")
                    }
                }
            }else {
                $('#password').unbind("blur");
                $('#password').parent().find('.reg_span').html("请设置您的密码");
                $('#password').css("border","1px solid #e60000")
            }
            if ($('#a_password').val()){
                if (flag5 == true){
                    if ($('#a_password').val() == $('#password').val()){
                        $('#a_password').blur(function(){
                            $('#a_password').css("border","1px solid #dadada")
                        });
                        $('#a_password').parent().find('.reg_span').html("");
                        $("#a_password").attr("flag","true");
                    }else {
                        $('#a_password').unbind("blur");
                        $('#a_password').parent().find('.reg_span').html("两次输入密码不一致，请再次输入");
                        $('#a_password').css("border","1px solid #e60000")
                    }
                }else {
                    $('#a_password').unbind("blur");
                    $('#a_password').parent().find('.reg_span').html("对不起，请检查您的输入。密码设置支持6-20位字母、符号或数字，密码区分大小写");
                    $('#a_password').css("border","1px solid #e60000")
                }
            }else {
                $('#a_password').unbind("blur");
                $('#a_password').parent().find('.reg_span').html("请确认密码");
                $('#a_password').css("border","1px solid #e60000")
            }
            if($("#checkbox").attr("value") == "false"){
                $("#checkbox").parent().parent().find(".reg_span").html("抱歉，必须同意协议才能完成注册！")
            }else {
                $("#checkbox").parent().parent().find(".reg_span").html("")
            }
        }
        return false
    })
});