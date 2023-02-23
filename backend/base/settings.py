from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-)p!rb3b(ut7fg!$-pr2hsxbhp)m!%-o47ei(p9i)4=@y%(hnvo'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    "djoser",
    "accounts.apps.AccountsConfig",
]

CORS_ALLOW_ALL_ORIGINS = True

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'base.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'base.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

DJOSER = {
    # "USER_ID_FIELD" - Default: User._meta.pk.name, uporablja se za /user/<id>/
    # "LOGIN_FIELD" - Default: User.USERNAME_FIELD
    
    "PASSWORD_RESET_CONFIRM_URL": "#/reset/password/{uid}/{token}", # Default: True # Url: #/password-reset/{uid}/{token}
    # "USERNAME_RESET_CONFIRM_URL": True, # Default: True # Url: #/username-reset/{uid}/{token}
    
    "SEND_ACTIVATION_EMAIL": True, # Default: False # Če želiš, da mora user aktivirati account
    # After Createing Account or Updating Email
    # "SEND_CONFIRMATION_EMAIL": True,
    
    # "PASSWORD_CHANGED_EMAIL_CONFIRMATION": False,
    # "USERNAME_CHANGED_EMAIL_CONFIRMATION": False,

    "ACTIVATION_URL": "activate/{uid}/{token}", #True, # Url #/activate/{uid}/{token}
    # "USER_CREATE_PASSWORD_RETYPE": False, # Default: False
    # "SET_USERNAME_RETYPE": False,
    # "SET_PASSWORD_RETYPE": False,
    # "PASSWORD_RESET_CONFIRM_RETYPE": False,
    # "USERNAME_RESET_CONFIRM_RETYPE": False,
    # "PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND": False,
    # "USERNAME_RESET_SHOW_EMAIL_NOT_FOUND": False,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}

EMAIL_HOST = 'sandbox.smtp.mailtrap.io'
EMAIL_HOST_USER = '5e2036e1835554'
EMAIL_HOST_PASSWORD = '5f9d4a8b4544f4'
EMAIL_PORT = '2525'
