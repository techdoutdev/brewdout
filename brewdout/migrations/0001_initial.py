# Generated by Django 3.2.6 on 2021-08-20 21:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Beverage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('style', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Brewery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=30)),
                ('state_code', models.CharField(max_length=2)),
                ('country', models.CharField(default='USA', max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Check_in',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submission_date', models.DateTimeField()),
                ('rating', models.CharField(choices=[(1, 'Bad'), (2, 'Meh'), (3, 'Good'), (4, 'Great'), (5, 'Phenomenal')], max_length=10)),
                ('cost', models.CharField(choices=[(1, '$'), (2, '$$'), (3, '$$$'), (4, '$$$$'), (5, '$$$$$')], max_length=5)),
                ('tasting_notes', models.CharField(max_length=1000)),
                ('beverage', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='brewdout.beverage')),
            ],
        ),
        migrations.AddField(
            model_name='beverage',
            name='brewery',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='brewdout.brewery'),
        ),
    ]
