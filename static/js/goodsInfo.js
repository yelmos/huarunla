/**
 * Created by Administrator on 2016/10/9.
 */
$(function(){
    //获取id,type
    var str = location.search.replace("?","");
    str = str.split("&");
    var ids = str[0];
    var types = str[1];

  //动态创建
    $.getJSON('../json/'+types+'.json',function(data){
        for (var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            if(ids == obj.id){
                var smallimg1 = obj.smallimg1;
                var smallimg2 = obj.smallimg2;
                var smallimg3 = obj.smallimg3;
                var smallimg4 = obj.smallimg4;
                var smallimg5 = obj.smallimg5;
                var name = obj.name;
                var e_name = obj.e_name;
                var intro = obj.intro;
                var price = obj.price;
                var del = obj.del;
                var bigimg = obj.bigimg;
                $('.good_img').find('img').attr("src",smallimg1.split("_")[0]+"_420x420."+smallimg1.split("_")[1].split(".")[1]);
                $('.bigimg').find('img').attr("src",smallimg1.split("_")[0]+"_800x800."+smallimg1.split("_")[1].split(".")[1]);
                $('.toCar').attr('id',id);
                $('.toCar').attr('type',types);
                $('.imgMenu').find('img').eq(0).attr("src",smallimg1);
                $('.imgMenu').find('img').eq(1).attr("src",smallimg2);
                $('.imgMenu').find('img').eq(2).attr("src",smallimg3);
                $('.imgMenu').find('img').eq(3).attr("src",smallimg4);
                $('.imgMenu').find('img').eq(4).attr("src",smallimg5);
                $('.info_right').find(".name").eq(0).html(name);
                $('.info_right').find(".name").eq(1).html(e_name);
                $('.info_right').find(".introduce").eq(1).html(intro);
                $('.info_right').find(".textPrimary").find("strong").html(price);
                $('.meg_div_0').find('img').attr('src',bigimg)
            }
        }
    });

    //列表菜单
    var listBtn = $(".head_body_nav_list_ul").find("li");
    for(var i=2;i<listBtn.length;i++){
        listBtn.eq(i).mouseenter(function(){
            $('.head_body_nav_list_ul').find('.nav_c_list').hide();
            $('.nav_c_list').eq($(this).index()-2).show();
            $('.nav_c_list').eq($(this).index()-2).mousemove(function(){
                $(this).show();
            });
            $('.nav_c_list').eq($(this).index()-2).mouseout(function(){
                $(this).hide();
            });
        });
        listBtn.eq(i).mouseleave(function(){
            $('.nav_c_list').eq($(this).index()-2).hide();
        })
    }

    //商品分类
    for (var i=1;i<$('.head_body_nav_list_ul').find('li').length;i++){
        $('.head_body_nav_list_ul').find('li').eq(i).css("display","none");
        $('.head_body_nav_list_ul').find('li').eq(i).mousemove(function(){
            for (var j=1;j<$('.head_body_nav_list_ul').find('li').length;j++){
                $('.head_body_nav_list_ul').find('li').eq(j).css("display","block")
            }
        });
        $('.head_body_nav_list_ul').find('li').eq(i).mouseleave(function(){
            for (var k=1;k<$('.head_body_nav_list_ul').find('li').length;k++){
                $('.head_body_nav_list_ul').find('li').eq(k).css("display","none")
            }
        })
    }

    $('.nav_c_list').mousemove(function(){
        for (var i=1;i<$('.head_body_nav_list_ul').find('li').length;i++){
            $('.head_body_nav_list_ul').find('li').eq(i).css("display","block")
        }
    });

    $('.nav_c_list').mouseout(function(){
        for (var i=1;i<$('.head_body_nav_list_ul').find('li').length;i++){
            $('.head_body_nav_list_ul').find('li').eq(i).css("display","none")
        }
    });

    $('.head_body_nav_list_ul').find("li").eq(0).mouseenter(function(){
        for (var i=1;i<$('.head_body_nav_list_ul').find('li').length;i++){
            $('.head_body_nav_list_ul').find('li').eq(i).css("display","block")
        }
    });

    $('.head_body_nav_list_ul').find("li").eq(0).mouseleave(function(){
        for (var i=1;i<$('.head_body_nav_list_ul').find('li').length;i++){
            $('.head_body_nav_list_ul').find('li').eq(i).css("display","none")
        }
    });


    //小图翻页
    $('.smallImgUp').click(function(){
        var left = parseInt($(this).parent().find("ul").css("margin-left"));
        if(left == 0){
            $(this).parent().find("ul").animate({"margin-left":0})
        }else {
            $(this).parent().find("ul").animate({"margin-left":left+95})
        }
    });
    $('.smallImgDown').click(function(){
        var left = parseInt($(this).parent().find("ul").css("margin-left"));
        if (left == -97){
            $(this).parent().find("ul").animate({"margin-left":-95})
        }else {
            $(this).parent().find("ul").animate({"margin-left":left-95})
        }
    });

    //小图
    $('.imgMenu').find('li').mouseover(function(){
        //边框
        $(this).addClass("cur");
        $(this).siblings().removeClass("cur");

        //大图变化
        var sr = $(this).find('img').attr('src').split("_")[0];
        var png = $(this).find('img').attr('src').split("_")[1].split(".")[1];
        $('.good_img').find('img').attr("src",sr+"_420x420."+png);
        $('.bigimg').find('img').attr("src",sr+"_800x800."+png)
    });

    //放大镜
    var scale = $('.bigimg').width() / $('.good_img').width();
    $('.good_img').mousemove(function(e){
        $(this).find('.move').show();
        $('.bigimg').show();
        var x = e.pageX - $(this).offset().left - $(this).find('.move').width()/2;
        var y = e.pageY - $(this).offset().top - $(this).find('.move').height()/2;

        if (x <= 0) { //不超出左边
            x = 0;
        }
        else if (x >= $(this).width()-$(this).find('.move').width()) { //不超出右边
            x = $(this).width()-$(this).find('.move').width();
        }
        if (y <= 0) { //不超出上边
            y = 0;
        }
        else if (y >= $(this).height()-$(this).find('.move').height()) { //不超出下边
            y = $(this).height()-$(this).find('.move').height();
        }

        $(this).find('.move').css({"left": x, "top": y});
        $(this).parent().find('.bigimg').find('div').css({left: -x*scale, top: -y*scale});
    });

    $('.good_img').mouseleave(function(){
        $(this).find('.move').hide();
        $('.bigimg').hide();
    });

    //税价说明
    $('.vtArrow').mouseenter(function(){
        $(this).html("△");
        $('.valoremTaxBox').slideDown(500);
    });
    $('.vtArrow').mouseleave(function(){
        $(this).html("▽");
        $('.valoremTaxBox').slideUp(500);
    });

    //按钮变色
    $('.toCar').mouseenter(function(){
        $(this).css("background","#e60000")
    });
    $('.toCar').mouseleave(function(){
        $(this).css("background","#e14041")
    });
    $('.like').mouseenter(function(){
        $(this).css("border","1px solid #e60000");
        $(this).find('span').css("color","#e60000")
    });
    $('.like').mouseleave(function(){
        $(this).css("border","1px solid #d1d1d1");
        $(this).find('span').css("color"," #333")
    });

    //列表切换
    $('.right_nav').find('a').click(function(){
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('.meg_div').eq( $(this).index()).css("display","block");
        $('.meg_div').eq( $(this).index()).siblings('.meg_div').css("display","none");
        return false
    });

    //评价按钮
    $('.comment-type').find(".ico").click(function(){
        $(this).addClass("active");
        $(this).parent().siblings().find('.ico').removeClass("active")
    });

    //加减按钮
    $('.less').click(function(){
        var val = $('.quantity_txt').attr('value');
        if (val == 1){
            $('.quantity_txt').attr('value',1)
        }else {
            $('.quantity_txt').attr('value',val-1);
        }
    });
    $('.add').click(function(){
        var val = $('.quantity_txt').attr('value');
        $('.quantity_txt').attr('value',parseInt(val)+1);
    });

    // 加入购物车
    $('.toCar').click(function(){
        var carts = $.cookie('cart')?JSON.parse($.cookie('cart')):[];
        var flag = false;
        var id = $(this).attr('id');
        var type = $(this).attr('type');
        for(var i=0;i<carts.length;i++){
            if(id == carts[i].id && type == carts[i].type){
                carts[i].num = parseInt($('.quantity_txt').attr('value'))+ parseInt(carts[i].num);
                flag = true;
                $.cookie("cart", JSON.stringify(carts), {expires:30, path:"/"});
            }
        }
        if(flag == false){
            var good = {
                "id":id,
                "type":type,
                "num":$('.quantity_txt').attr('value')
            };
            carts.push(good);
            $.cookie("cart", JSON.stringify(carts), {expires:30, path:"/"});
        }
        num();
        alert("已加入购物车");
        return false
    });

    //购物车数量
    function num(){
        var arr = $.cookie('cart')?JSON.parse($.cookie('cart')):[];
        $('#goodCartsNum').html(arr.length)
    }
    num();

    //购物车跳转
    $('#goodCartsNum').parent().attr('href','goodcart.html')

});
