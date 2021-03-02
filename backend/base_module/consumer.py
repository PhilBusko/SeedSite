"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
BASE CONSUMER
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import os, json, time, threading
import pandas as PD
import plotly.graph_objects as GO
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import app_proj.common.utility as UT
import base_module.models as DM

MODULE_PATH = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(MODULE_PATH, 'data')


class BaseConsumer(WebsocketConsumer):


    # CONSUMER FUNCTIONS 

    def connect(self):
        # accept the frontend websocket connection

        self.room_name = 'base-room'
        self.room_group_name = 'base-group'
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name)

    def receive(self, text_data):
        wsMessage = json.loads(text_data) if text_data else {}
        self.endpointRouter(wsMessage)

    def broadcast(self, event):
        # send message to frontend
        wsMessage = event['wsMessage']
        #print(f"received broadcast {wsMessage.get('progress')}")
        self.send(json.dumps(wsMessage))

    def groupSend(self, wsMessage):
        """Shortcut for channel_layer.group_send"""
        layerMessage = {
            'type': 'broadcast',
            'wsMessage': wsMessage,
        }
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, layerMessage)

    def endpointRouter(self, wsMessage):
        functionType = wsMessage.get('functionType')

        if functionType == 'base-data':
            self.getBaseData()

        elif functionType == 'run-process':
            self.runProcess()

        else:
            print(f'function-type unknown: {functionType}')


    # ENDPOINTS



    def getBaseData(self):

        # get the data and the table

        csvPath = os.path.join(DATA_PATH, 'brickset_set_filter.csv')
        sampleDf = PD.read_csv(csvPath) 

        sampleDf = sampleDf[['set_no', 'name', 'theme', 'year']]
        sampleDf['set_no'] = sampleDf['set_no'].apply(lambda x: x.split('-')[0])
        sampleDf['year'] = sampleDf['year'].apply(lambda x: int(x))
        setTable = sampleDf.to_dict('records')

        # create the plot 

        fig = GO.Figure()
        fig.add_trace(GO.Histogram(x=sampleDf['year'], xbins={'size': 1}, marker_color='DarkOrchid'))

        fig.update_layout(
            title="Lego Sets per Year", xaxis_title="Year", yaxis_title="Number of Sets",
            width=600, height=400,
            margin=GO.layout.Margin(t=40, r=0, b=50, l=60, pad=0),
            paper_bgcolor="white",
        )

        setPlot = UT.convertFigureToJson(fig)
        
        wsMessage = {
            'functionType': 'base-data-results',
            'setTable': setTable,
            'setPlot': setPlot,
        }
        self.send(json.dumps(wsMessage))

    def runProcess(self): 

        # define a recursive function to simulate a process

        def processRecursive(progressIncr, progressMax):

            # calculate for this iteration

            time.sleep(2)
            progressIncr += 1

            # send update to frontend

            wsMessage = {
                'functionType': 'process-update',
                'progress': round(progressIncr / progressMax * 100, 2),
                'status': 'Making progress' if progressIncr != progressMax else 'Finished',
            }
            self.groupSend(wsMessage)

            # launch next iteration in a thread

            if progressIncr < progressMax:
                thread = threading.Thread(target=processRecursive, args=(progressIncr, progressMax))
                thread.start()

        # launch the first iteration

        progressIncr = 0
        progressMax = 5

        thread = threading.Thread(target=processRecursive, args=(progressIncr, progressMax))
        thread.start()

        # send update to frontend
        # messages are only sent once function finishes

        wsMessage = {
            'functionType': 'process-update',
            'progress': 1,
            'status': 'Starting the process',
        }
        self.groupSend(wsMessage)

