from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from models import CartItem

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Логин уже занят'}, status=400)
    user = User.objects.create_user(username=username, password=password)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=201)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    return Response({'error': 'Неверные данные'}, status=400)

from django.http import HttpResponse
def home(request):
    return HttpResponse("OK")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    items = CartItem.objects.filter(user=request.user)
    data = [{'product_id': i.product_id, 'qty': i.qty} for i in items]
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart(request):
    product_id = request.data.get('product_id')
    qty = request.data.get('qty')
    if qty <= 0:
        CartItem.objects.filter(user=request.user, product_id=product_id).delete()
    else:
        CartItem.objects.update_or_create(
            user=request.user, product_id=product_id,
            defaults={'qty': qty}
        )
    return Response({'ok': True})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    CartItem.objects.filter(user=request.user).delete()
    return Response({'ok': True})