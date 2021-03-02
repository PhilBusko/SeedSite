"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
WEBSOCKET URLS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

from django.urls import re_path
import base_module.consumer as BC
import base_module.consumer_dev as CD

websocket_urlpatterns = [
    re_path(r'ws/base-module/$', BC.BaseConsumer ),
    re_path(r'ws/layer-test/$', CD.LayerConsumer ),
    #re_path(r'ws/basic-page/(?P<room_name>\w+)/$', CD.BasicConsumer),
]


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
CHANNELS APPLICATION
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})

