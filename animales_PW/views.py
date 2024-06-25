from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import categoria, producto



def index_ani(request):
    return render(request, 'index_ani.html/')

def tienda_ani(request):
    categorias = categoria.objects.all()
    productos = producto.objects.all()
    contex = {
        'categorias': categorias,
        'productos': productos,
    }
    return render(request, 'tienda_ani.html/', contex)

def adopcion_ani(request):
    return render(request, 'adopcion_ani.html/')

def nosotros_ani(request):
    return render(request, 'nosotros_ani.html/')

def contacto_ani(request):
    return render(request, 'contacto_ani.html/')

def reg_ini_sesion_ani(request):
    return render(request, 'reg_ini_sesion_ani.html/')

def pago_ani(request):
    return render(request, 'pago_ani.html/')

@login_required
def dashboard(request):
    return render(request, 'users/dashboard.html', {'section': 'dashboard'})
        
def contacto_ani(request):
    return render(request, 'contacto_ani.html/')

def nosotros_ani(request):
    return render(request, 'nosotros_ani.html/')