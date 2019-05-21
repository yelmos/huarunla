import hashlib

from django.http import JsonResponse
from django.shortcuts import render, redirect,reverse

# Create your views here.
from huarun.models import *


def index(request):
    lunbos = Lunbo.objects.all()
    enjoycitys =Enjoycity.objects.all()
     Fresh.objects.all()
    kuajins = Kuajin.objects.all()
    newsgoods = Newsgoods.objects.all()
    qianggous = Qianggou.objects.all()
    topgoods = Topgoods.objects.all()
    data ={
        "lunbos": lunbos,
        "enjoycitys":enjoycitys,
        "freshs":freshs,
        "kuajins":kuajins,
        "newsgoods":newsgoods,
        "qianggous":qianggous,
        "topgoods":topgoods,
        "name": "",

    }
    user = request.session.get('user',0)
    users = User.objects.filter(name=user)
    if users.exists():
        data["name"] = users.first().name
    return render(request,'index.html',context=data)


def login(request):
    if request.method == "POST":
        username = request.POST.get('username1')
        password = request.POST.get('password1')



        print(password)
        users = User.objects.filter(name=username, pwd=my_md5(password))
        if users.exists():
            # 登录成功,保存登录状态，然后自动跳转到‘我的’页面
            request.session['user'] = users.first().name
            return redirect(reverse('huarun:home'))
        else:
            data = {
                "msg": '用户名或密码不正确'
            }
            return render(request, 'login.html', data)
    else:
        return render(request,'login.html')


def register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        tel = request.POST.get('tel')
        password = request.POST.get('password')
        if len(username)  < 4 or len(username)  > 20 :
            data = {
                'msg1': "用户名长度为4到20的字位"
            }
            return render(request, 'register.html', data)
        users = User.objects.filter(name=username)
        if len(tel) != 11:
            data = {
                'msg2': "电话名应为11字位"
            }
            return render(request, 'register.html', data)
        if len(password)  < 6 or len(username)  > 20 :
            data = {
                'msg3': "密码长度为6到20的字位"
            }
            return render(request, 'register.html', data)

        if users.exists():
            data = {
                'msg1': "用户名已存在！"
            }
            return render(request, 'register.html', data)

        user = User()
        user.name = username
        user.phone = tel
        user.pwd = my_md5(password)
        user.save()
        request.session['user'] = user.name
        return redirect(reverse('huarun:home'))
    else:
        return render(request,'register.html')


def goodcart(request):
    user = request.session.get('user')
    if user:
        user = User.objects.get(name=user)
        carts = Cart.objects.filter(user=user)
        # list = []
        # for cart in carts:
        #     number = cart.number
        #     price = cart.goods.price
        #     numpri = price * number
        #     list.append(numpri)
        # print(list)
        data = {
            'carts':carts,
            # 'list':list,
            'name':''
        }
        user = request.session.get('user', 0)
        users = User.objects.filter(name=user)
        if users.exists():
            data["name"] = users.first().name
        return render(request,'goodcart.html',context=data,)
    else:
        return redirect(reverse('huarun:login'))


def my_md5(password):
    md5 = hashlib.md5()
    md5.update(password.encode('utf-8'))
    return md5.hexdigest()


def newsgoods(request,newsgood_id):


    newsgood = Newsgoods.objects.get(id = newsgood_id)
    data ={
        "newsgood":newsgood,
        "name":""
    }
    # context = data
    user = request.session.get('user', 0)
    users = User.objects.filter(name=user)
    if users.exists():
        data["name"] = users.first().name

    return render(request,'goodsInfo.html',context = data )

# 退出
def logout(request):
    del request.session['user']
    request.session.flush()
    return redirect(reverse('huarun:home'))

def addcart(request):
    goodsid = request.GET.get('goodsid')
    number = request.GET.get('number')
    print(number)
    name = request.session.get('user')
    print(goodsid)
    responseData = {
        'msg':'添加购物车成功',
        'status': 1 # 1标识添加成功，0标识添加失败，-1标识未登录
    }
    if name:
        user = User.objects.get(name=name)
        goods = Newsgoods.objects.get(pk=goodsid)
        pri = goods.price
        price = pri * int(number)
        print(price)
        carts = Cart.objects.filter(user=user).filter(goods=goods)
        if carts.exists():
            cart = carts.first()
            cart.number = cart.number + int(number)
            cart.save()
        else:
            cart = Cart()
            cart.user = user
            cart.goods = goods
            cart.number = number
            cart.price = price
            cart.save()

        return JsonResponse(responseData)
    else:
        responseData['msg'] = '未登录，请登录后操作'
        responseData['status'] = -1
        return JsonResponse(responseData)

def subcart(request):
    # 获取数据
    token = request.session.get('user')
    goodsid = request.GET.get('goodsid')

    # 对应用户 和 商品
    user = User.objects.get(name=token)
    goods = Newsgoods.objects.get(pk=goodsid)



    # 删减操作
    cart = Cart.objects.filter(user=user).filter(goods=goods).first()
    if cart.number > 1:
        cart.number = cart.number - 1
        cart.save()
    price = cart.number * goods.price
    print(price)
    responseData = {
        'msg': '购物车减操作成功',
        'status': 1,
        'number': cart.number,
        'price' : price,
    }

    return JsonResponse(responseData)


def jiacart(request):
    # 获取数据
    token = request.session.get('user')
    goodsid = request.GET.get('goodsid')

    # 对应用户 和 商品
    user = User.objects.get(name=token)
    goods = Newsgoods.objects.get(pk=goodsid)


    # jia操作
    cart = Cart.objects.filter(user=user).filter(goods=goods).first()

    cart.number = cart.number + 1
    cart.save()
    price = cart.number * goods.price
    responseData = {
        'msg': '购物车加操作成功',
        'status': 1,
        'number': cart.number,
        'price': price
    }

    return JsonResponse(responseData)

def subding(request):
    # 获取数据
    token = request.session.get('user')
    goodsid = request.GET.get('goodsid')
    print(goodsid)
    # 对应用户 和 商品
    user = User.objects.get(name=token)
    goods = Newsgoods.objects.get(pk=goodsid)


    # 删除物品操作
    cart = Cart.objects.filter(user=user).filter(goods=goods).first()
    cart.delete()

    responseData = {
        'msg': '删除商品成功',
        'status': 1,


    }

    return JsonResponse(responseData)

def changecartstatus(request):
    cartid = request.GET.get('cartid')
    cart = Cart.objects.get(pk=cartid)
    cart.isselect = not cart.isselect
    cart.save()

    responseData = {
        'msg': '选中状态改变',
        'status': 1,
        'isselect': cart.isselect
    }

    return JsonResponse(responseData)


def changecartselect(request):
    isselect = request.GET.get('isselect')
    if isselect == 'true':
        isselect = True
    else:
        isselect = False

    token = request.session.get('user')
    user = User.objects.get(name=token)
    carts = Cart.objects.filter(user=user)
    for cart in carts:
        cart.isselect = isselect
        cart.save()

    return JsonResponse({'msg':'反选操作成功', 'status':1})
