/**
 * Created by Administrator on 2016/10/11.
 */
$(function(){
    if ($.cookie('cart')){
        var arr = JSON.parse($.cookie('cart'));
        var sum = 0;
        $('.totalAmount').find('span').html(arr.length);
        $('.selectNumber').html(arr.length);
        for (var i=0;i<arr.length;i++){
            var types = arr[i].type;
            var ids = arr[i].id;
            var num = arr[i].num;
            $.ajaxSettings.async = false;
            $.getJSON('../json/'+types+'.json',function(data){
                for (var j=0;j<data.length;j++){
                    if(ids == data[j].id){
                        var img = data[j].smallimg1;
                        var name = data[j].name;
                        var price = data[j].price;
                        $('.ll').append('<li class="active"><div class="ld1 ld"><div class="checkbox enableSelect active"><input type="hidden"><i></i></div><div class="img_view"><img src='+img+'></div></div><div class="ld2 ld"><a style="color:#333;" href=goodsInfo.html?'+ids+'&'+types+'>'+name+'</a></div><div class="ld3 ld"><span></span></div><div class="ld4 ld">¥'+price+'</div><div class="ld6 ld"><span class="midde"><a class="less"></a><input class="quantity_txt" value='+num+'><a class="add"></a><br><span class="canDelivery"></span></span></div><div class="ld7 ld"><span class="font18">'+num*price+'.00</span></div><div class="ld8 ld"><span class="midde"><a href="" class="del" ids='+ids+' types='+types+'>删除</a></span></div></li>');
                        $('.ll').find('li').eq(i).find('.del').unbind('click');
                        $('.ll').find('li').eq(i).find('.del').click(function(){
                            var idss = $(this).attr('ids');
                            var typess = $(this).attr('types');
                            var cook = JSON.parse($.cookie('cart'));
                            for(var k=0;k<cook.length;k++){
                                if (idss == cook[k].id){
                                    cook.splice(k,1)
                                }
                            }
                            $.cookie("cart", JSON.stringify(cook), {expires:30, path:"/"});
                            window.location.reload();
                            //$(this).parent().parent().parent().remove();
                            return false
                        });
                        sum += parseInt($('.ll').find("li").eq(i).find('.font18').text());

                        //商品减
                        $('.ll').find('li').eq(i).find('.midde').find('.less').click(function(){
                            var val = $(this).parent().find('.quantity_txt');
                            if (val.val() == 1){
                                val.val(1)
                            }else {
                                val.val(val.val()-1)
                            }
                            var nums = val.val();
                            arr[$(this).parent().parent().parent().index()-1].num = nums;
                            $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
                            window.location.reload()
                        });

                        //商品加
                        $('.ll').find('li').eq(i).find('.midde').find('.add').click(function(){
                            var val = $(this).parent().find('.quantity_txt');
                            val.val(parseInt(val.val())+1);
                            var nums = val.val();
                            arr[$(this).parent().parent().parent().index()-1].num = nums;
                            $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
                            window.location.reload()
                        });



                    }
                }
            });
        }
        $('.quantity').find('em').html(sum+'.00');
        $('.payPrice').find('span').html(sum)
    }

    //全选
    $('.th').find('.ld1').find('.checkbox').click(function(){
        if($(this).hasClass('active') == false){
            $(this).addClass("active");
            $('.checkbox').addClass('active');
            $('.checkbox').parent().parent().addClass('active');
            //数量
            $('.selectNumber').html(arr.length);
            //总价
            $('.quantity').find('em').html(sum+'.00');
        }else {
            $(this).removeClass("active");
            $('.checkbox').removeClass('active');
            $('.checkbox').parent().parent().removeClass('active');
            //数量
            $('.selectNumber').html(0);
            //总价
            $('.quantity').find('em').html('0.00');
        }
    });
    $('.float_l').find('.checkbox').click(function(){
        if($(this).hasClass('active') == false){
            $(this).addClass("active");
            $('.checkbox').addClass('active');
            //数量
            $('.selectNumber').html(arr.length);
            //总价
            $('.quantity').find('em').html(sum+'.00');
            $('.checkbox').parent().parent().addClass('active');
        }else{
            $(this).removeClass("active");
            $('.checkbox').removeClass('active');
            $('.checkbox').parent().parent().removeClass('active');
            //数量
            $('.selectNumber').html(0);
            //总价
            $('.quantity').find('em').html('0.00');
        }
    });

    //单选
    $('.ll').find('li').find('.checkbox').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).parent().parent().removeClass('active');
            $('.th').find('.ld1').find('.checkbox').removeClass("active");
            $('.float_l').find('.checkbox').removeClass("active");
            //数量
            $('.selectNumber').html(parseInt( $('.selectNumber').html())-1);
            //总价
            $('.quantity').find('em').html(parseInt($('.quantity').find('em').html())-parseInt($(this).parent().parent().find('.font18').html())+'.00');
        }else {
            $(this).addClass('active');
            $(this).parent().parent().addClass('active');
            //数量
            $('.selectNumber').html(parseInt( $('.selectNumber').html())+1);
            //总价
            $('.quantity').find('em').html(parseInt($('.quantity').find('em').html())+parseInt($(this).parent().parent().find('.font18').html())+'.00');
            var flag = [];
            for(var i=0;i<$('.checkbox').length;i++){
                if($('.checkbox').eq(i).hasClass('active') == false){
                   flag.push(false);
                }
            }
            if (flag.length == 2){
                $('.th').find('.ld1').find('.checkbox').addClass("active");
                $('.float_l').find('.checkbox').addClass("active");
            }
        }
    });

    //全部删除
    $('#delAll').click(function(){
        $.cookie('cart',[],{expires:30, path:"/"})
    });

    //删除指定
    //$('#dels').click(function(){
    //    for(var i=0;i<$('.ll li').length;i++){
    //        if ($('.ll li').eq(i).hasClass("active") == true){
    //            var ids = $('.ll li').eq(i).find('.ld8').find("a").attr('ids');
    //            var types = $('.ll li').eq(i).find('.ld8').find("a").attr('types');
    //        }
    //    }
    //    return false
    //});

});