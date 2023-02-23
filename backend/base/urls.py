from django.contrib import admin
from django.urls import path, include
from base import views

urlpatterns = [
    path("", views.BaseAPIListView.as_view()),
    path("accounts/", include("accounts.urls")),
    path('admin/', admin.site.urls),
]