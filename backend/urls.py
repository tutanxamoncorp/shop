from django.contrib import admin
from django.urls import path
import views

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('api/register/', views.register),
    path('api/login/', views.login_view),
    path('api/cart/', views.get_cart),
    path('api/cart/update/', views.update_cart),
    path('api/cart/clear/', views.clear_cart),
]