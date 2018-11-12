from django.conf.urls import url

from huarun.views import *




urlpatterns = [
    url(r'^$',index,name='home'),

    url(r'^login/$',login,name='login'),
    url(r'^register/$',register,name='register'),
    url(r'^goodcart/$',goodcart,name='goodcart'),
    url(r'^goodsInfo/(\d+)/$',newsgoods,name='goodsInfo'),
    url(r'^logout/$',logout,name='logout'),

    url(r'^addcart/$', addcart, name='addcart'),

    url(r'^subcart/$', subcart, name='subcart'),
    url(r'^jiacart/$', jiacart, name='jiacart'),

    url(r'^subding/$', subding, name='subding'),

    url(r'^changecartstatus/$', changecartstatus, name='changecartstatus'),  # 修改选中状态
    url(r'changecartselect/$', changecartselect, name='changecartselect'),  # 全选/取消全选
]