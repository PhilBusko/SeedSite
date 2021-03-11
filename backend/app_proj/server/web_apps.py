"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
SERVER APP INTERFACE
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

from django.core.wsgi import get_wsgi_application
wsgi_app = get_wsgi_application()


# import django
# from channels.routing import get_default_application
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
# django.setup()
# application = get_default_application()

from django.core.asgi import get_asgi_application
asgi_app = get_asgi_application()

