from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class AccountsAPIListView(APIView):
  def get(self, request):
    base_url = request.build_absolute_uri()
    context = {
      "Users [GET, POST]": base_url + "auth/users/",
      "User Me [GET, PUT, PATCH, DELETE]": base_url + "auth/users/me/",
      "User <ID> [GET, PUT, PATCH, DELETE]": base_url + "auth/users/<id>/",
      "User Activation Request": base_url + "auth/users/resend_activation/",
      "User Activation Confirm [POST]": base_url + "auth/users/activation/",
      "?": base_url + "auth/users/confirm/",
      "Set New Password [POST] | AUTH": base_url + "auth/users/set_password/",
      "Reset Password Request [POST]": base_url + "auth/users/reset_password/",
      "Reset Password Confirm [POST]": base_url + "auth/users/reset_password_confirm/",
      "??????": base_url + "auth/users/set_username/",
      "???????": base_url + "auth/users/reset_username/",
      "???????": base_url + "auth/users/reset_username/confirm/",
      "JWT Create": base_url + "auth/jwt/create/",
      "JWT Refresh": base_url + "auth/jwt/refresh/",
      "JWT Verify": base_url + "auth/jwt/verify/",
    }
    return Response(context, status=status.HTTP_200_OK)
