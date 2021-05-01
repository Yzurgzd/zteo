from django.contrib import admin

from .models import Product, Category, Specification, SpecificationValue, ProductSpecificationValue, ProductImage, Review

from jet.admin import CompactInline
from django import forms
from django.utils.safestring import mark_safe
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class ProductAdminForm(forms.ModelForm):
    description = forms.CharField(
        label='Описание', widget=CKEditorUploadingWidget())

    class Meta:
        model = Product
        fields = '__all__'


class ProductImageInline(CompactInline):
    model = ProductImage
    extra = 1
    show_change_link = True


class ProductSpecificationValueInline(CompactInline):
    model = ProductSpecificationValue
    extra = 1
    show_change_link = True


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('article', 'name', 'get_image', 'hide')
    list_editable = ('hide', )
    list_filter = ('category', 'hide')
    list_search = ('article', 'name')
    inlines = (ProductImageInline, ProductSpecificationValueInline)
    form = ProductAdminForm

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.poster.url} width="75" height="75"')
    get_image.short_description = 'Постер'


admin.site.register(Category)
admin.site.register(Review)
admin.site.register(Specification)
admin.site.register(SpecificationValue)
admin.site.register(ProductSpecificationValue)
