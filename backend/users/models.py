from django.db import models

from django.contrib.auth.models import AbstractUser, Group

from .managers import UserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(
        verbose_name='Email адрес', max_length=255, unique=True)
    avatar = models.ImageField(
        'Аватар', upload_to='users/avatar/%Y/%m/%d/', default='users/avatar/default.jpg')
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_quantity_products_in_cart(self):
        quantity = 0
        carts = self.cart.filter(ordered=False)
        for cart in carts:
            quantity += cart.quantity
        return quantity

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Address(models.Model):
    user = models.ForeignKey(
        User, verbose_name='Пользователь', on_delete=models.CASCADE)
    region = models.CharField('Регион', max_length=100)
    town = models.CharField('Город или населённый пункт', max_length=100)
    apartment = models.CharField('Улица, дом/квартира/блок', max_length=100)
    postal = models.CharField('Почтовый индекс', max_length=100)
    default = models.BooleanField(
        'Задать как адрес по умолчанию', default=False)
    date_added = models.DateTimeField('Дата добавления', auto_now_add=True)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = 'Адрес'
        verbose_name_plural = 'Адреса'


class Payment(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(User, verbose_name='Пользователь',
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.PositiveIntegerField('Сумма', default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = 'Платеж'
        verbose_name_plural = 'Платежи'


class UserGroup(Group):
    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


class Feedback(models.Model):
    user = models.ForeignKey(
        User, verbose_name='Пользователь', on_delete=models.CASCADE)
    subject = models.CharField('Тема', max_length=100)
    message = models.TextField('Сообщение')

    def __str__(self):
        return f'{self.user} - {self.subject}'

    class Meta:
        verbose_name = 'Обратная связь'
        verbose_name_plural = 'Обратные связи'
