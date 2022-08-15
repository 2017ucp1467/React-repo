from .models import Product,Review
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model= Product
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'