from django.shortcuts import render, redirect,reverse

# Create your views here.
from huarun.models import *


def index(request):
    lunbos = Lunbo.objects.all()
    enjoycitys =Enjoycity.objects.all()
    freshs = Fresh.objects.all()
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
        users = User.objects.filter(name=username, pwd=password)
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
                'msg': "用户名长度为4到20的字位"
            }
            return render(request, 'register.html', data)
        users = User.objects.filter(name=username)
        if users.exists():
            data = {
                'msg': "用户名已存在！"
            }
            return render(request, 'register.html', data)

        user = User()
        user.name = username
        user.phone = tel
        user.pwd = password
        user.save()
        request.session['user'] = user.name
        return redirect(reverse('huarun:home'))
    else:
        return render(request,'register.html')


def goodcart(request):

    return render(request,'goodcart.html')


def goodsInfo(request):

    return render(request,'goodsInfo.html')

# 退出
def logout(request):
    del request.session['user']
    request.session.flush()
    return redirect(reverse('huarun:home'))