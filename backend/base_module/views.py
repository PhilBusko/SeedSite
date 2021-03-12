"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
BASE MODULE VIEWS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import os, csv, random
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response


DATA_PATH = os.path.join(settings.BACKEND_PATH, 'base_module', 'data')

@api_view(["GET"])
def tabularData(request):
    
    print("tabularData")

    # get lego data from the file

    legoPath = os.path.join(DATA_PATH, 'brickset_set_filter.csv')
    stream = open(legoPath)
    reader = csv.DictReader(stream)
    dataLs = list(reader)

    # pick random sets to return
    
    randomLs = []
    for r in range(0, 5):
        randomSet = random.choice(dataLs)
        randomLs.append({
            'set_no': randomSet['set_no'].split('-')[0],
            'name': randomSet['name'],
            'theme': randomSet['theme'],
            'year': randomSet['year'].split('.')[0],
        })

    messageDx = {'legoSets': randomLs}
    return Response(messageDx)

