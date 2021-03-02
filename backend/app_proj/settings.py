"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
BACKEND SETTINGS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

import os, sys, socket
BACKEND_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# C:\Projects\SeedSite\codebase\backend

# not sure why this needs to be added for daphne to run on production 
sys.path.append(BACKEND_PATH)
os.environ['PATH'] = f"{os.environ['PATH']};{BACKEND_PATH};"     # for windows only ?


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
APPLICATION CONFIGURATION
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

INSTALLED_APPS = [
    # django base
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
	# installed packages
	'rest_framework',
    'corsheaders',
    'channels',
    'django_extensions',
    # custom apps
    'base_module',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

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


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
CONNECTIONS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

ROOT_URLCONF = 'app_proj.urls'
STATIC_URL = '/static/'
STATIC_ROOT = 'app_proj/static'     # collect static goes here 
MEDIA_ROOT = 'app_proj/media'  

# used by server files
ASGI_APPLICATION = 'app_proj.routing.application'
WSGI_APPLICATION = 'app_proj.wsgi.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('127.0.0.1', 6379)],
            'capacity': 1500,
            'expiry': 10,
        },
    },
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': 'localhost',
        'PORT': '5432',
        'NAME': 'seed-site',
        'USER': 'postgres',
        'PASSWORD': '123rty',
    }
}

if 'webserver' in socket.gethostname() or os.environ.get("CLOUD_DB", False):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'HOST': '', 
            'PORT': '5432',
            'NAME': 'research',
            'USER': 'postgres',
            'PASSWORD': '3r4t5y6u7i',
        }
    }

print(f"Database Host: {DATABASES['default']['HOST']}")

REACT_APP_DIR = os.path.join(os.path.dirname(BACKEND_PATH), 'frontend') 
STATICFILES_DIRS = [
    os.path.join(REACT_APP_DIR, 'build', 'static'),
    os.path.join(REACT_APP_DIR, 'build'),
]

CORS_ORIGIN_ALLOW_ALL = True  


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
SERVER
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

SECRET_KEY = 'v8oo&wtz8swcseni)1ekzg^e=0ta7b4u4s)xoqh&c#yx#@lq^%'
DEBUG = True
ALLOWED_HOSTS = ['*']   

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
MEMBERS CONFIG
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

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

