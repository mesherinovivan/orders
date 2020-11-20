from django.contrib import admin

# Register your models here.


from orders.models import Orders, Accounts

admin.site.register(Orders)
admin.site.register(Accounts)
