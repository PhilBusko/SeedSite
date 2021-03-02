"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
TEST CONSUMERS
BasicConsumer: plain http communication, no layers used
LayerConsumer: use channel layers to broadcast to groups
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import os, sys, time, json, base64
import socket, socketserver, traceback, threading, subprocess
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import app_proj.common.utility as UT


class BasicConsumer(WebsocketConsumer):

    def connect(self):
        print(f"connect")
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        print('receive')
        messageDx = json.loads(text_data) if text_data else {}
        functionType = messageDx.get('functionType')

        if functionType == 'start-process':
            self.basicProcess()

        else:
            print(f"function-type unknown: {functionType}")

    def basicProcess(self):
        message = {
            'functionType': 'update',
            'progress': 0, 
            'status': 'Starting the process',
            'data': {},
        }
        messageJson = json.dumps(message)
        self.send(messageJson)

        timer = threading.Timer(2, self.sendProgress2)
        timer.start() 
 
    def sendProgress2(self):
        print('sendProgress2')
        message = {
            'functionType': 'update',
            'progress': 33, 
            'status': 'Making progress',
            'data': {},
        }
        messageJson = json.dumps(message)
        self.send(messageJson)
        timer = threading.Timer(2, self.sendProgress3)
        timer.start() 

    def sendProgress3(self):
        print('sendProgress3')
        message = {
            'functionType': 'update',
            'progress': 66, 
            'status': 'Making progress',
            'data': {},
        }
        messageJson = json.dumps(message)
        self.send(messageJson)
        timer = threading.Timer(2, self.sendProgress4)
        timer.start() 

    def sendProgress4(self):
        print('sendProgress4')
        message = {
            'functionType': 'update',
            'progress': 100, 
            'status': 'Finished',
            'data': {},
        }
        messageJson = json.dumps(message)
        self.send(messageJson)


class LayerConsumer(WebsocketConsumer):

    # consumer functions 

    def connect(self):
        self.room_name = 'room-name'
        self.room_group_name = 'group-name'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name)

    # receive from frontend
    def receive(self, text_data):
        #print(f"receive")
        wsMessage = json.loads(text_data) if text_data else {}
        self.endpointRouter(wsMessage)

    # receive from room group
    def broadcast(self, event):
        # send message to frontend
        wsMessage = event['wsMessage']
        print(f"received broadcast {wsMessage.get('progress')}")
        self.send(json.dumps(wsMessage))

    def groupSend(self, wsMessage):
        """Shortcut for channel_layer.group_send"""
        layerMessage = {
            'type': 'broadcast',
            'wsMessage': wsMessage,
        }
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, layerMessage)


    # route functions

    def endpointRouter(self, wsMessage):
        functionType = wsMessage.get('functionType')
        print(f"receive: {functionType}")

        if functionType == 'data-request':
            self.getData()

        elif functionType == 'run-process':
            self.runProcess()

        else:
            print(f"function-type unknown: {functionType}")

    def getData(self):
        myData = { 'key1': 'value1' }
        wsMessage = {
            'functionType': 'data-request-results',
            'data': myData
        }
        self.send(json.dumps(wsMessage))

    def runProcess(self): 

        # start the process

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

        progressIncr = 0
        progressMax = 9

        thread = threading.Thread(target=processRecursive, args=(progressIncr, progressMax))
        thread.start()

        # send update to frontend
        # messages are only sent once function finishes

        wsMessage = {
            'functionType': 'run-process-update',
            'progress': 1,
            'status': 'Starting the process',
        }
        self.groupSend(wsMessage)

