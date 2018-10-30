from django.conf.urls import url

from huarun.views import *

urlpatterns = [
    url(r'^index/$',index,name='home'),
    url(r'^login/$',login,name='login'),
    url(r'^register/$',register,name='register'),
    url(r'^goodcart/$',goodcart,name='goodcart'),
    url(r'^goodsInfo/$',goodsInfo,name='goodsInfo'),
    url(r'^logout/$',logout,name='logout'),
]