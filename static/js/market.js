$(function () {
    $('.buttom .toCar').click(function () {
        var goodsid = $(this).attr('goodsid')
        var number = $('.quantity_txt').attr('value')
        console.log(number)
        var $that = $(this)

         $.get('/addcart/',{'goodsid':goodsid,'number':number}, function (response){

             console.log(response)
             if (response.status == -1){ // 未登录
                window.open('/login/', target="_self")}
         })
    })


    $('.showimg li').click(function () {
        $('#show1').attr('src',($(this).find('img').attr('src')))
    })



})