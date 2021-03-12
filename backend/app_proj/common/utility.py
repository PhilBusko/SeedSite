"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
COMMON UTILITY
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import os, time
ROOT_PATH = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
#print(ROOT_PATH)


def getNowStamp():
    timeDigits = f"{time.time():.2f}"
    return f"T{timeDigits[-7:]}"


def convertFigureToJson(figure):
    """
    Takes a plotly figure object and converts it to json for frontend.
    """
    import json
    from plotly.utils import PlotlyJSONEncoder

    redata = json.loads(json.dumps(figure.data, cls=PlotlyJSONEncoder))
    relayout = json.loads(json.dumps(figure.layout, cls=PlotlyJSONEncoder))
    fig_json=json.dumps({'data': redata,'layout': relayout})

    return fig_json


def getGoogleSheetRows(sheetId, tabRange):
    
    # google sheets API must be enabled
    # the google sheet must be shared with the service account
    # injurycheck1-account@injurycheck1.iam.gserviceaccount.com

    from google.oauth2 import service_account
    from googleapiclient.discovery import build

    credPath = os.path.join(ROOT_PATH, 'app_proj', 'common', 'gcp-cred-injurycheck1.json')
    sheetsScopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    oauthCreds = service_account.Credentials.from_service_account_file(
        credPath, scopes=sheetsScopes)

    service = build('sheets', 'v4', credentials=oauthCreds)
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=sheetId, range=tabRange).execute()
    sheetRows = result.get('values', [])

    return sheetRows

