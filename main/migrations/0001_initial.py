# Generated by Django 2.2b1 on 2021-11-07 17:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('answer', models.CharField(max_length=120)),
                ('is_marked', models.BooleanField(default=False)),
                ('open_answer', models.TextField(blank=True, null=True)),
                ('date_answer', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='GroupOfUsers',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('group_name', models.CharField(max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('poll_name', models.CharField(max_length=50)),
                ('poll_description', models.TextField(blank=True, null=True)),
                ('deadline', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=120)),
                ('is_single_choice', models.BooleanField(default=False)),
                ('is_multi_choice', models.BooleanField(default=False)),
                ('is_open', models.BooleanField(default=False)),
                ('is_date_choice', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='UserPoll',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Poll')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.User')),
            ],
        ),
        migrations.CreateModel(
            name='UserGroup',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.GroupOfUsers')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.User')),
            ],
        ),
        migrations.CreateModel(
            name='UserAnswer',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Answer')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.User')),
            ],
        ),
    ]
