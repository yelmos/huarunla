$(function () {

    //   var price = $('#id4').attr('price')
    // console.log(price)
    // var number = $('.quantity_txt').attr('value')
    // console.log(number)
    // var pri = parseInt(price) * parseInt(number)
    // $('.font18').html(pri)
    $('.less').click(function () {
        var goodsid = $(this).attr('goodsid')
        var $that = $(this)
        $.get('/subcart/', {'goodsid': goodsid}, function (response) {
            if (response.status == 1) {  // 操作成功
                var number = response.number
                var price = response.price

                $that.next().attr('value', number)
                $that.parent().parent().next().children().html(price)
            }
        })


    })


    $('.add').click(function () {
        var goodsid = $(this).attr('goodsid')
        var $that = $(this)
        $.get('/jiacart/', {'goodsid': goodsid}, function (response) {
            if (response.status == 1) {  // 操作成功
                var number = response.number
                var price = response.price
                $that.prev().attr('value', number)
                $that.parent().parent().next().children().html(price)
            }
        })


    })

    $('.sha').click(function () {
        var goodsid = $(this).attr('goodsid')
        var $that = $(this)
        $.get('/subding/', {'goodsid': goodsid}, function (response) {
            // console.log(response)
        })
    })

    $('.warper').click(function () {
        var cartid = $(this).attr('cartid')
        var $that = $(this)


        $.get('/changecartstatus/', {'cartid': cartid}, function (response) {
            // console.log(response)
            if (response.status == 1) {
                var isselect = response.isselect
                $that.attr('isselect', isselect)
                $that.children().remove()   // 清空
                if (isselect) {
                    $that.append('      <div class="checkbox enableSelect active">\n' +
                        '                        <input type="hidden">\n' +
                        '                        <i></i>')
                } else {
                    $that.append('                <div class="checkbox enableSelect">\n' +
                        '                        <input type="hidden">\n' +
                        '                        <i></i>')
                }

                // 总计
                total()
            }
        })

    })

        // 全选/取消
      $('.all').click(function () {
        var isselect = $(this).attr('isselect')
        isselect = (isselect == 'false') ? true : false
        $(this).attr('isselect', isselect)


        if (isselect){
            $(this).find('div').removeClass('checkbox enableSelect').addClass('checkbox enableSelect active')
        } else {
            $(this).find('div').removeClass('checkbox enableSelect active').addClass('checkbox enableSelect')
        }

        $.get('/changecartselect/', {'isselect':isselect}, function (response) {
            // console.log(response)
            if (response.status == 1){
                // 遍历
                $('.warper').each(function () {
                    $(this).attr('isselect', isselect)
                    if (isselect){
                        $(this).find('div').removeClass('checkbox enableSelect').addClass('checkbox enableSelect active')
                    } else {
                       $(this).find('div').removeClass('checkbox enableSelect active').addClass('checkbox enableSelect')
                    }
                })

                总计
                total()
            }
        })
    })


       function total() {
        var sum = 0

        // 遍历操作
        $('#goods').each(function () {
            var $confirm = $(this).find('.warper')
            var $content = $(this).find('#ld4')
            var $content2 = $(this).find('.ld6 ld').find('.quantity_txt')
                console.log($content2)
             console.log($content)
            if ($confirm.find('.checkbox enableSelect active').length) {
                var price = $content.attr('price')
                var num = $content2.attr('value')
                sum += price * num
               console.log(num)
                 console.log(price )
            }

        })

        // 显示
        $('.quantity em').html(parseInt(sum))
    }


})