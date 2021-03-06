# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-11-06 12:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('huarun', '0007_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('isselect', models.BooleanField(default=True)),
                ('goods', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='huarun.Newsgoods')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='huarun.User')),
            ],
        ),
    ]
