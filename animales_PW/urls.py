from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index_ani, name='index_ani'),
    path('tienda_ani', views.tienda_ani, name='tienda_ani'),
    path('adopcion_ani', views.adopcion_ani, name='adopcion_ani'),
    path('nosotros_ani', views.nosotros_ani, name='nosotros_ani'),
    path('contacto_ani', views.contacto_ani, name='contacto_ani'),
    path('reg_ini_sesion_ani', views.reg_ini_sesion_ani, name='reg_ini_sesion_ani'),
    path('pago_ani', views.pago_ani, name='pago_ani'),
    path('contacto', views.contacto_ani, name='contacto_ani'),
    path('nosotros', views.nosotros_ani, name='nosotros_ani'),
]

