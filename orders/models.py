from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.encoding import smart_str as smart_unicode
# Create your models here.

class Base(models.Model):
    create_date = models.DateTimeField(auto_now_add=True)
    modify_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
'''
- Атрибуты заказа: номер, дата, сумма, контрагент, текст заказа.
'''

class Accounts(Base):
    name = models.CharField(max_length=200, verbose_name=_('Account Name'),)

    class Meta:
        verbose_name = _("Account")
        verbose_name_plural = _("Accounts")

    def __str__(self):
        return self.name

class Orders(Base):
    number = models.CharField(max_length=50, verbose_name=_('Order Number'),)
    order_date = models.DateField(verbose_name=_('Order Date'))
    price = models.FloatField(verbose_name=_('Order Price'))
    account = models.ForeignKey(Accounts, on_delete=models.CASCADE, verbose_name=_('Account'))
    text = models.TextField(max_length=300, verbose_name=_('Order Text'), )

    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")

    def __str__(self):
        return self.number
