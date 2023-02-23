from django.urls import path, include
from accounts import views

urlpatterns = [
  path("", views.AccountsAPIListView.as_view()),
  path("auth/", include("djoser.urls")),
  path("auth/", include("djoser.urls.jwt"))
]