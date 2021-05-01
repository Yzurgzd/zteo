from django.db import models

from users.models import User, Address, Payment

from products.models import Product


class Coupon(models.Model):
    code = models.CharField('Код купона', max_length=15)
    initial_amount = models.DecimalField(
        'Начальная сумма', default=0, max_digits=6, decimal_places=0, help_text='Указывать сумму в рублях')
    discount_amount = models.DecimalField(
        'Сумма скидки', default=0, max_digits=6, decimal_places=0, help_text='Указывать сумму в рублях')

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'Купон'
        verbose_name_plural = 'Купоны'


class Cart(models.Model):
    user = models.ForeignKey(
        User, verbose_name='Пользователь', on_delete=models.CASCADE, related_name='cart')
    ordered = models.BooleanField('Заказан', default=False)
    product = models.ForeignKey(
        Product, verbose_name='Товар', on_delete=models.CASCADE)
    quantity = models.IntegerField('Количество', default=1)

    def __str__(self):
        return f'{self.quantity} шт. {self.product.name}'

    def get_total_product_price(self):
        return self.quantity * self.product.price

    def get_total_discount_product_price(self):
        if self.product.discount_price:
            return self.quantity * self.product.discount_price

    def get_amount_saved(self):
        if self.product.discount_price:
            return self.get_total_product_price() - self.get_total_discount_product_price()

    def get_final_price(self):
        if self.product.discount_price:
            return self.get_total_discount_product_price()
        return self.get_total_product_price()

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'


class Order(models.Model):
    user = models.ForeignKey(
        User, verbose_name='Пользователь', on_delete=models.CASCADE)
    products = models.ManyToManyField(Cart, verbose_name='Товары')
    ordered_date = models.DateTimeField('Дата заказа', auto_now_add=True)
    ordered = models.BooleanField('Заказан', default=False)
    coupon = models.ForeignKey(
        Coupon, verbose_name='Купон', on_delete=models.SET_NULL, blank=True, null=True)
    address = models.ForeignKey(Address, verbose_name='Адрес', related_name='shipping_address',
                                on_delete=models.SET_NULL, blank=True, null=True)
    payment = models.ForeignKey(
        Payment, verbose_name='Платеж', on_delete=models.SET_NULL, blank=True, null=True)
    delivered = models.BooleanField('Доставлен', default=False)
    received = models.BooleanField('Получен', default=False)

    def __str__(self):
        return self.user.email

    def get_subtotal(self):
        total = 0
        for order_product in self.products.all():
            total += order_product.get_final_price()
        return total

    def get_total(self):
        total = self.get_subtotal()
        if self.coupon:
            if total >= self.coupon.initial_amount:
                total -= self.coupon.discount_amount
        return total

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
