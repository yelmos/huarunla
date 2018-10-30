/**
 * Created by Administrator on 2016/9/28.
 */
$(function(){
    //登录
    var href = location.href;
    if (href.split("?")[1]){
        var useName = href.split("?")[1].split("=")[1];
        if (useName){
            $("#user").html(useName)
        }
    }

    // 浏览历史
    if($.cookie('cart')){
        var arrfix = JSON.parse($.cookie('cart'));
        for (var i = 0; i < arrfix.length; i++) {
            var types = arrfix[i].type;
            var ids = arrfix[i].id;
            var nums = arrfix[i].num;
            $.ajaxSettings.async = false;
            $.getJSON('/static/json/' + types + '.json', function (data) {
                for (var j = 0; j < data.length; j++) {
                    if (ids == data[j].id) {
                        var img = data[j].smallimg1;
                        var name = data[j].name;
                        $('.clearfix').append('<li><div class="mask"><a href=goodsInfo.html?'+ids+'&'+types+'><img src=' + img + ' alt="" width="140" height="140"> <div class="s_name">' + name + '</div></a></div></li>');
                        $('.mask').mouseenter(function(){
                            $(this).css("border","1px solid #e60000");
                        }).mouseleave(function(){
                            $(this).css("border","1px solid #ededed")
                        });
                    }
                }
            });
            $.ajaxSettings.async = true;
        }
    }

    //购物车数量变化
    function num(){
        var arr = $.cookie('cart')?JSON.parse($.cookie('cart')):[];
        $('#goodCartsNum').html(arr.length);
        $('.numCar').html(arr.length);
    }
    num();

    //楼梯
    $('.nav_lift').find("li").mouseenter(function(){
        $(this).find('.topyc').css("display","none");
        $(this).find('.topxs').css("display","block");
    });
    $('.nav_lift').find('li').mouseleave(function(){
        $(this).find('.topyc').css("display","block");
        $(this).find('.topxs').css("display","none");
    });
    $('.nav_lift').find("li").eq(0).unbind();
    $('.louti').find('a').click(function(){
        return false
    });

    $(window).scroll(function(){
        var currentTop = $(this).scrollTop();
        if( currentTop>=300 ){
            $(".louti").show();
            $('.cart').show();
        }else {
            $(".louti").hide();
            $('.cart').hide();
        }
        $('.center_body').children('div').each(function(index,ele){
            if(currentTop>=$(this).offset().top-80 &&  currentTop<= $(this).offset().top + $(this).outerHeight()/2){
                $('.louti').find('li').find('.topyc').css("display","block");
                $('.louti').find('li').find('.topxs').css("display","none");
                $('.louti').find("li").mouseenter(function(){
                    $(this).find('.topyc').css("display","none");
                    $(this).find('.topxs').css("display","block");
                });
                $('.louti').find('li').mouseleave(function(){
                    $(this).find('.topyc').css("display","block");
                    $(this).find('.topxs').css("display","none");
                });
                $('.louti').find('li').eq(index).find('.topyc').css("display","none");
                $('.louti').find('li').eq(index).find('.topxs').css("display","block");
                $('.louti').find('li').eq(index).unbind();
            }
        });
    });
    $('.louti').find('li').find('a').click(function(){
        $("body").stop();
        $("body").animate({
            scrollTop:$('.center_body').children('div').eq($(this).parent().index()).offset().top
        },function(){
            $('.louti').find('li').find('.topyc').css("display","block");
            $('.louti').find('li').find('.topxs').css("display","none");
            $(this).parent().find('.topyc').css("display","none");
            $(this).parent().find('.topxs').css("display","block");
        });
    });

    //右楼梯
    $('.cartLayer').find('li').eq(2).mouseenter(function(){
        $(this).css('background','url("../images/14840050.png") no-repeat -50px -50px')
    });
    $('.cartLayer').find('li').eq(2).mouseleave(function(){
        $(this).css('background','url("../images/14840050.png") no-repeat 0 -50px')
    });
    $('.cartLayer').find('li').eq(3).mouseenter(function(){
        $(this).css('background','url("../images/14840050.png") no-repeat -50px -100px')
    });
    $('.cartLayer').find('li').eq(3).mouseleave(function(){
        $(this).css('background','url("../images/14840050.png") no-repeat 0 -100px')
    });
    $('.cartLayer').find('li').eq(3).click(function(){
        $("body").animate({
            scrollTop:0
        },500);
    });
    $('.cartLayer').find('li').eq(3).click(function(){
        return false
    });



    //获取轮播图数据
    $.getJSON("/static/json/lunboimg.json",function(data){
        for (var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            var src = obj.src;


        }
        //轮播图
        var timer = setInterval(move,3000);
        var index = 0;
        var len = $('.body_img_ul').find('img').length;
        function move(){
            index++;
            if(index >= len){
                index = 0
            }
            $('.body_img_ul').find('img').eq(index).animate({"opacity":1}).parent().parent().siblings().find("img").animate({"opacity":0});
            $('.body_img_ul_2').find('li').eq(index).addClass("active").siblings().removeClass("active");
        }
        $('.body_img_ul_2').find("li").eq(0).addClass('active');
        for(var i=0;i<len;i++){
            $('.body_img_ul_2').find('li').eq(i).mouseenter(function(){
                clearInterval(timer);
                index = $(this).index()-1;
                move();
            });
            $('.body_img_ul_2').find('li').eq(i).mouseleave(function(){
                timer = setInterval(move,3000);
            })
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

    //限时抢购
    $.getJSON("../json/qianggou.json",function(data){
        for (var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            var type = obj.type;
            var name = obj.name;
            var price = obj.price;
            var intro = obj.intro;
            var src = obj.src;
            $('.shop_cont').find("ul").append('<li class="newGoodsList"><div class="mask"><a href=goodsInfo.html?'+id+'&'+type+' class="img_view"><img src='+src+' alt="" height="258" width="258"> <div class="jx_box"> <i><img src="../images/Australia.png" width="18" height="18"></i> <span>澳大利亚|保税</span></div></a><div class="bottom"><div class="shop_info"><div class="shop_name"><a class="qcnameStyle" href=""><span>'+name+'</span></a> <p class="intro"><a class="qcpointStyle" href="">'+intro+'</a></p></div></div><div class="shop_pri"><span><em>¥&nbsp;</em>'+price+'<em>.00</em></span><s>¥&nbsp;139.00</s></div> </div> </div> </li>')
        }

        //抢购动画
        $('.newGoodsList').mouseenter(function(){
            $(this).find('.shop_info').stop();
            $(this).find('.shop_info').animate({
                height: 65
            },function(){
                $(this).find('.shop_name').animate({
                    top:-30
                })
            });
        });
        $('.newGoodsList').mouseleave(function(){
            $(this).find('.shop_info').stop();
            $(this).find('.shop_info').find('.shop_name').animate({
                top:0
            },300);
            $(this).find('.shop_info').animate({
                height: 30
            },200)
        });

        //边框渐变
        $('.mask').mouseenter(function(){
            $(this).css("border","1px solid #e60000");
        }).mouseleave(function(){
            $(this).css("border","1px solid #ededed")
        });
    });


    //尖货推荐
    $.getJSON("../json/topGoods.json",function(data){
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            var type = obj.type;
            var src = obj.src;
            var intro = obj.intro;


            var name = obj.name;
            var price = obj.price;
            $('.shop_top_body_ul').append('<li><div class="mask"><a href=goodsInfo.html?'+id+'&'+type+' class="shop_top_body_ul_a"><img src='+src+' alt="" width="100%"><div class="jx_box"><i><img src="../images/14810860.png" alt="" width="18" height="18"></i><span>万家精选</span></div> <div class="tag"><img src="../images/14810859.png" alt=""></div></a><div class="bottom"><div class="shop_name"><a href="">'+name+'</a></div><p class="info"><a href="">'+intro+'</a></p><p class="price"><span>¥<strong style="margin-left: 4px;">'+price+'</strong>.00</span><s style="font-size: 12px;">¥&nbsp;<strong style="font-size: 14px;">196</strong>.00</s></p></div></div></li>')
        }

        //边框渐变
        $('.mask').mouseenter(function(){
            $(this).css("border","1px solid #e60000");
        }).mouseleave(function(){
            $(this).css("border","1px solid #ededed")
        });
    });

    //新品动态添加
    $.getJSON("../json/newGoods.json",function(data){
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            var type = obj.type;
            var src = obj.src;
            var intro = obj.intro;
            var name = obj.name;
            var price = obj.price;
            $('.shop_new_body_ul').append('<li class="newGoods"><div class="mask"><a href=goodsInfo.html?'+id+'&'+type+' class="img_view"><img src='+src+' alt="" width="280" height="280"> <span class="isNewSq"></span> <div class="tag"> <img src="../images/14810858.png" alt=""> </div> </a> <div class="bottom"> <div class="jj_box"> <i><img src="../images/America.png" alt="" width="18" height="18"></i> <span>美国|保税</span> </div> <div class="shop_name"> <a href="">'+name+'</a> </div> <p class="intro"> <a href="">'+intro+'</a> </p> <p class="textPrimary price"><span>¥<strong style="margin-left: 4px;">'+price+'</strong>.00</span></p> <div class="btn_box"><a href="" id='+id+' type='+type+'>加入购物车</a><div class="s_join"><i class="white_arrow"></i><i class="icon_tick"></i><span class="gocar">已成功加入购物车</span></div></div></div></div></li>')
            $('.shop_new_body_ul').find('.btn_box').find('a').eq(i).click(function(){
                cook($(this));
            })
        }
        goods();
    });

    //按钮渐变
    $('.listTags').find('a').mouseenter(function(){
        $(this).css({"background":"#fff", "color":"black"})
    });
    $('.listTags').find('a').mouseleave(function(){
        $(this).css({"background":"", "color":"#fff"})
    });

    //跨境精选
    $.getJSON("../json/kuajin.json",function(data){
        for (var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            var type = obj.type;
            var src = obj.src;
            var intro = obj.intro;
            var name = obj.name;
            var price = obj.price;
            $('.floor1').find('.floor_body_ul').append('<li class="newGoods"><div class="mask"><a href=goodsInfo.html?'+id+'&'+type+' class="img_view"><img src='+src+' alt="" width="180" height="180"><span class="isSq"></span><div class="tag"><img src="../images/14810858.png" alt=""></div></a><div class="bottom"><div class="jx_box"><i><img src="../images/France.png" alt="" width="18" height="18"></i><span>法国|直邮</span></div><div class="shop_name"><a href="">'+name+'</a></div><p class="intro"><a href="">'+intro+'</a> </p> <p class="textPrimary price"><span>¥<strong style="margin-left: 4px;">'+price+'</strong>.00</span></p><div class="btn_box"><a href="" id='+id+' type='+type+'>加入购物车</a><div class="s_join"><i class="white_arrow"></i><i class="icon_tick"></i><span class="gocar">已成功加入购物车</span></div></div></div></div></li>');
            $('.floor1').find('.floor_body_ul').find('.btn_box').find('a').eq(i).click(function(){
                cook($(this));
            })
        }
        goods();
    });

    //enjoy city
    $.getJSON("../json/enjoycity.json",function(data){
        for (var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            var type = obj.type;
            var src = obj.src;
            var intro = obj.intro;
            var name = obj.name;
            var price = obj.price;
            $('.floor2').find('.floor_body_ul').append('<li class="newGoods"><div class="mask"><a href=goodsInfo.html?'+id+'&'+type+' class="img_view"><img src='+src+' alt="" width="180" height="180"><span class="isSq"></span><div class="tag"><img src="../images/14810858.png" alt=""></div></a><div class="bottom"><div class="jx_box"><i><img src="../images/France.png" alt="" width="18" height="18"></i><span>法国|直邮</span></div><div class="shop_name"><a href="">'+name+'</a></div><p class="intro"><a href="">'+intro+'</a> </p> <p class="textPrimary price"><span>¥<strong style="margin-left: 4px;">'+price+'</strong>.00</span></p><div class="btn_box"><a href="" id='+id+' type='+type+'>加入购物车</a><div class="s_join"><i class="white_arrow"></i><i class="icon_tick"></i><span class="gocar">已成功加入购物车</span></div></div></div></div></li>')
            $('.floor2').find('.floor_body_ul').find('.btn_box').find('a').eq(i).click(function(){
                cook($(this));
            })
        }
        goods();
    });

    //产地直采
    $.getJSON("../json/fresh.json",function(data){
        for (var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            var type = obj.type;
            var src = obj.src;
            var intro = obj.intro;
            var name = obj.name;
            var price = obj.price;
            $('.floor3').find('.floor_body_ul').append('<li class="newGoods"><div class="mask"><a href=goodsInfo.html?'+id+'&'+type+' class="img_view"><img src='+src+' alt="" width="180" height="180"><span class="isSq"></span><div class="tag"><img src="../images/14810858.png" alt=""></div></a><div class="bottom"><div class="jx_box"><i><img src="../images/France.png" alt="" width="18" height="18"></i><span>法国|直邮</span></div><div class="shop_name"><a href="">'+name+'</a></div><p class="intro"><a href="">'+intro+'</a> </p> <p class="textPrimary price"><span>¥<strong style="margin-left: 4px;">'+price+'</strong>.00</span></p><div class="btn_box"><a href="" id='+id+' type='+type+'>加入购物车</a><div class="s_join"><i class="white_arrow"></i><i class="icon_tick"></i><span class="gocar">已成功加入购物车</span></div></div></div></div></li>')
            $('.floor3').find('.floor_body_ul').find('.btn_box').find('a').eq(i).click(function(){
                cook($(this));
            })
        }
        goods();
    });


    //商品特效
    function goods(){
        //边框渐变
        $('.mask').mouseenter(function(){
            $(this).css("border","1px solid #e60000");
        }).mouseleave(function(){
            $(this).css("border","1px solid #ededed")
        });

        //按钮渐变
        $(".btn_box").mouseenter(function(){
            $(this).find("a").css("background","#e60000");
            $(this).find("a").css("color","#fff")
        }).mouseleave(function(){
            $(this).find("a").css("background","#fff");
            $(this).find("a").css("color","#e60000")
        });

        //加入购物车
        $('.btn_box').click(function(){
            //显示提示
            $(this).find('.s_join').css("display","block");
            var self = $(this);
            var timer = setTimeout(function(){
                self.find('.s_join').css("display","none");
            },3000);

            return false
        })
    }
    function cook(that){
        //存入购物车
        var carts = $.cookie('cart')?JSON.parse($.cookie('cart')):[];
        var flag = false;
        var ids = that.attr('id');
        var types = that.attr('type');
        for(var i=0;i<carts.length;i++){
            if(ids == carts[i].id && types == carts[i].type){
                carts[i].num++;
                flag = true;
                $.cookie("cart", JSON.stringify(carts), {expires:30, path:"/"});
            }
        }
        if(flag == false){
            var good = {
                "id":ids,
                "type":types,
                "num":1
            };
            carts.push(good);
            $.cookie("cart", JSON.stringify(carts), {expires:30, path:"/"});
        }
        num()
    }
});