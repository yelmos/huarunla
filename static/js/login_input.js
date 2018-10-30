/**
 * Created by Administrator on 2016/9/29.
 */
$(function(){
    //边框颜色
    $('.input').focus(function(){
        $(this).css("border","1px solid #e60000")
    }).blur(function(){
        $(this).css("border","1px solid #dadada")
    });
    $('.text_input').focus(function(){
        $(this).css("border","1px solid #e60000")
    }).blur(function(){
        $(this).css("border","1px solid #dadada")
    });

    //button颜色
    $(".button").find("button").hover(function(){
        $(this).css("background","#e60000")
    },function(){
        $(this).css("background","#e04040")
    });

    //checkbox
    $(".checkbox").find("i").click(function(){
        if ($(".checkbox").find("input").attr("value") == "false"){
            $(".checkbox").find("input").attr("value",true);
            $(".checkbox").find("i").css("background-image","url(../images/50377.png)")
        }else {
            $(".checkbox").find("input").attr("value",false);
            $(".checkbox").find("i").css("background-image","")
        }

    })
});