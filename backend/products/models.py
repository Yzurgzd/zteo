from django.db import models

from users.models import User

from django.core.validators import MaxValueValidator
from django.db.models import Avg, Q


class Category(models.Model):
    name = models.CharField('Наименование', max_length=100, unique=True)
    poster = models.ImageField(
        'Изображение категории', upload_to='products/category/poster/%Y/%m/%d/')
    parent = models.ForeignKey(
        'self', verbose_name='Родитель', on_delete=models.SET_NULL, null=True, blank=True)
    slug = models.SlugField(max_length=150, unique=True)

    def __str__(self):
        return self.name

    def get_products(self):
        return Product.objects.filter(category=self).order_by('id')[:5]

    def get_children(self):
        return Category.objects.filter(parent__slug=self.slug)

    def get_min_price(self):
        price = []
        products = Product.objects.filter(category=self)
        for product in products:
            price.append(product.price)
        if price:
            min_price = min(price)
            return min_price

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Product(models.Model):
    article = models.CharField('Артикул', max_length=100, unique=True)
    name = models.CharField('Наименование', max_length=100, unique=True)
    poster = models.ImageField(
        'Изображение товара', upload_to='products/poster/%Y/%m/%d/')
    description = models.TextField('Описание')
    category = models.ForeignKey(
        Category, verbose_name='Категория', on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(
        'Цена', default=0, max_digits=6, decimal_places=0, help_text='Указывать сумму в рублях')
    discount_price = models.DecimalField(
        'Цена со скидкой', max_digits=6, decimal_places=0, help_text='Указывать сумму в рублях', blank=True, null=True)
    date_added = models.DateField('Дата добавления', auto_now_add=True)
    hide = models.BooleanField('Скрыть', default=False)
    slug = models.SlugField(max_length=150, unique=True)

    def __str__(self):
        return self.name

    def get_reviews(self):
        return self.reviews.all()

    def get_images(self):
        return self.images.all()

    def get_review_count(self):
        return self.reviews.count()

    def get_avg_rating(self):
        review = self.reviews.aggregate(avarage=Avg('rating'))
        avg = 0
        if review['avarage'] is not None:
            avg = round(float(review['avarage']), 1)
        return avg

    def get_recommend(self):
        reviews = self.reviews.all()
        recommend = 0
        if reviews.count() > 0:
            for review in reviews:
                if review.rating > 3:
                    recommend += 1
            recommend /= reviews.count()
            recommend *= 100
        return recommend

    def get_last_products(self):
        return Product.objects.filter(
            ~Q(id=self.id), category=self.category).order_by('id')[:5]

    class Meta:
        ordering = ['-date_added']
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class Specification(models.Model):
    name = models.CharField(
        verbose_name='Наименование характеристики', max_length=100, unique=True)
    category = models.ManyToManyField(Category, verbose_name='Категория')

    def __str__(self):
        return self.name

    def get_specification_value(self):
        return self.specification

    class Meta:
        verbose_name = 'Характеристика'
        verbose_name_plural = 'Характеристики'


class SpecificationValue(models.Model):
    specification = models.ForeignKey(
        Specification, verbose_name='Характеристика', on_delete=models.CASCADE, related_name='specification')
    value = models.CharField(verbose_name='Значение',
                             max_length=150, unique=True)

    def __str__(self):
        return '{}: {}'.format(self.specification.name, self.value)

    class Meta:
        verbose_name = 'Значение характеристики'
        verbose_name_plural = 'Значения характеристик'


class ProductSpecificationValue(models.Model):
    product = models.ForeignKey(
        Product, verbose_name='Товар', on_delete=models.SET_NULL, null=True, blank=True)
    specification_value = models.ForeignKey(
        SpecificationValue, verbose_name='Характеристика товара', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return '{}: {}'.format(self.specification_value.specification.name, self.specification_value.value)

    class Meta:
        verbose_name = 'Характеристика товара'
        verbose_name_plural = 'Характеристики товара'


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, verbose_name='Товар', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(
        'Изображение', upload_to='products/image/%Y/%m/%d/')

    def __str__(self):
        return self.product.name

    class Meta:
        verbose_name = 'Изображение товара'
        verbose_name_plural = 'Изображения товаров'


class Review(models.Model):
    user = models.ForeignKey(
        User, verbose_name='Пользователь', on_delete=models.CASCADE)
    comment = models.TextField('Комментарий', max_length=5000)
    product = models.ForeignKey(
        Product, verbose_name='Товар', on_delete=models.CASCADE, related_name='reviews')
    date_added = models.DateTimeField('Дата добавления', auto_now_add=True)
    rating = models.PositiveSmallIntegerField(
        'Рейтинг', validators=[MaxValueValidator(5)], default=0)

    def __str__(self):
        return f'{self.user} - {self.product}'

    class Meta:
        ordering = ['-date_added']
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
