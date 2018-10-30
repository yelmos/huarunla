from django.db import models

# Create your models here.
class Lunbo(models.Model):
    src = models.CharField(max_length=200)

  # {
  #   "id":3,
  #   "type":"enjoycity",
  #   "src":"../images/12970750_180X180.jpg",
  #   "name":"【全国配送】KanS韩束橄榄卸妆水200ml",
  #   "intro":"【全国配】",
  #   "price":"29",
  #   "e_name":"",
  #   "del":"",
  #   "smallimg1":"../images/12970750_85X85.jpg",
  #   "smallimg2":"../images/12970752_85X85.jpg",
  #   "smallimg3":"../images/12970749_85X85.jpg",
  #   "smallimg4":"../images/12970751_85X85.jpg",
  #   "smallimg5":"../images/12970751_85X85.jpg",
  #   "bigimg":"../images/p_4380020.png"
  # },
class Enjoycity(models.Model):
    type = models.CharField(max_length=50)
    src = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    intro = models.CharField(max_length=30)
    price = models.IntegerField(max_length=10)
    smallimg1 = models.CharField(max_length=100)
    smallimg2= models.CharField(max_length=100)
    smallimg3 = models.CharField(max_length=100)
    smallimg4 = models.CharField(max_length=100)
    smallimg5 = models.CharField(max_length=100)
    bigimg = models.CharField(max_length=100)

class Fresh(models.Model):
    type = models.CharField(max_length=50)
    src = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    intro = models.CharField(max_length=30)
    price = models.IntegerField(max_length=10)
    smallimg1 = models.CharField(max_length=100)
    smallimg2= models.CharField(max_length=100)
    smallimg3 = models.CharField(max_length=100)
    smallimg4 = models.CharField(max_length=100)
    smallimg5 = models.CharField(max_length=100)
    bigimg = models.CharField(max_length=100)

class Kuajin(models.Model):
    type = models.CharField(max_length=50)
    src = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    intro = models.CharField(max_length=30)
    price = models.IntegerField(max_length=10)
    smallimg1 = models.CharField(max_length=100)
    smallimg2= models.CharField(max_length=100)
    smallimg3 = models.CharField(max_length=100)
    smallimg4 = models.CharField(max_length=100)
    smallimg5 = models.CharField(max_length=100)
    bigimg = models.CharField(max_length=100)

class Newsgoods(models.Model):
    type = models.CharField(max_length=50)
    src = models.CharField(max_length=100)
    price = models.IntegerField(max_length=10)
    intro = models.CharField(max_length=200)
    name = models.CharField(max_length=30)

    smallimg1 = models.CharField(max_length=100)
    smallimg2= models.CharField(max_length=100)
    smallimg3 = models.CharField(max_length=100)
    smallimg4 = models.CharField(max_length=100)
    smallimg5 = models.CharField(max_length=100)
    bigimg = models.CharField(max_length=100)

class Qianggou(models.Model):
    type = models.CharField(max_length=50)
    src = models.CharField(max_length=100)
    price = models.IntegerField(max_length=10)
    name = models.CharField(max_length=200)
    intro = models.CharField(max_length=30)

    smallimg1 = models.CharField(max_length=100)
    smallimg2= models.CharField(max_length=100)
    smallimg3 = models.CharField(max_length=100)
    smallimg4 = models.CharField(max_length=100)
    smallimg5 = models.CharField(max_length=100)
    bigimg = models.CharField(max_length=100)

class Topgoods(models.Model):
    type = models.CharField(max_length=50)
    src = models.CharField(max_length=100)
    price = models.IntegerField(max_length=10)
    name = models.CharField(max_length=200)
    intro = models.CharField(max_length=30)

    smallimg1 = models.CharField(max_length=100)
    smallimg2= models.CharField(max_length=100)
    smallimg3 = models.CharField(max_length=100)
    smallimg4 = models.CharField(max_length=100)
    smallimg5 = models.CharField(max_length=100)
    bigimg = models.CharField(max_length=100)

# 用户
class User(models.Model):
    name = models.CharField(max_length=18, unique=True)
    phone = models.IntegerField(max_length=30)
    pwd = models.CharField(max_length=32)


