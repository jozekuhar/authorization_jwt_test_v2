from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class BaseAPIListView(APIView):
  def get(self, request):
    base_url = request.build_absolute_uri()
    context = {
      "Accounts": base_url + "accounts/",
      "Admin": base_url + "admin/"
    }
    return Response(context, status=status.HTTP_200_OK)