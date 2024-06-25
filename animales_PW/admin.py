from django.contrib import admin

# Register your models here.
from .models import categoria, producto

admin.site.register(categoria)
admin.site.register(producto)