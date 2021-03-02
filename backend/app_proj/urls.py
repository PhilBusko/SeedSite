"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
BACKEND URLS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import os
from django.conf import settings
from django.conf.urls import url, include
from django.http import HttpResponse
from django.views.generic import View
import base_module.views as BV

class FrontendAppView(View):
    def get(self, request):
        try:
            indexPath = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')
            stream = open(indexPath)
            return HttpResponse(stream.read())
        except:
            return HttpResponse("FileNotFoundError", status=501,)


module_url = [
    url(r'^tabular/', BV.tabularData),
]

urlpatterns = [
   url(r'^api/base-module/', include((module_url, 'module'))),

   # base template 
   url(r'^', FrontendAppView.as_view())
]

