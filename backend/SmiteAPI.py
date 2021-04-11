
# Python 3 code to demonstrate the 
# working of MD5 (string - hexadecimal)
  
import hashlib
import requests
from datetime import datetime
from datetime import date
import json
import firebase_admin
from firebase_admin import credentials, firestore
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)

with open('session.json', 'r') as f:
    config = json.load(f)


now = datetime.now()
today = date.today()

devId = "3848"
key = "FF49F2B2811C44BD82E6708E9ADAC20B"

session = config['session']

print("VARs loaded")

db = firestore.client()  # this connects to our Firestore database
matchDB = db.collection('match')  # opens 'places' collection
playerDB = db.collection('player')
print("Connected to DB")
# doc = collection.document('rome')  # specifies the 'rome' document
# res = doc.get().to_dict() # gets data from the doc



current_time = "" + today.strftime("%Y%m%d") + now.strftime("%H%M%S")
#print("Current Time =", current_time)




# getplayer[ResponseFormat]/{devId}/{signature}/{sessionId}/{timestamp}/{playerName}
# createsessionJson 
# http://api.smitegame.com/smiteapi.svc/createsessionJson/1004/8f53249be0922c94720834771ad43f0f/20120927183145
def session_setup(devId, current_time, key):
    print("Setting up session")
    str2hash = devId + "createsession" + key + current_time
    result = hashlib.md5(str2hash.encode())
    signature = result.hexdigest()
    uri_session_config = "/" + devId + "/" + signature + "/" + current_time
    endpoint = "createsessionJson"

    uri = "http://api.smitegame.com/smiteapi.svc/" + endpoint + uri_session_config
    #print(uri)
    response = requests.get(uri)
    #print(response)
    session = response.json()
    session = session['session_id']
    #print(session)
    config['session'] = session
    with open('session.json', 'w') as f:
        json.dump(config, f)
    return(session)

#   /getmatchhistory[ResponseFormat]/{developerId}/{signature}/{session}/{timestamp}/{playerId}


def api_call(endpoint, pram):
    #print("API CALL")
    str2hash = devId + endpoint + key + current_time
    result = hashlib.md5(str2hash.encode())
    signature = result.hexdigest()
    uri_config = "/" + devId + "/" + signature + "/" + session + "/" + current_time + "/"
    uri = "http://api.smitegame.com/smiteapi.svc/" + endpoint + "json" + uri_config + pram
    response = requests.get(uri)
    response_json = response.json()
    return(response_json)

def get_match(match):
    print("Fetching data for match: " + match)
    endpoint = "getmatchdetails"
    data = api_call(endpoint, match)
    if(data[0]['ret_msg'] == 'Invalid session id.'):
        session = session_setup(devId, current_time, key)
        data = api_call(session)
        for i in data:
            matchDB.document(str(match)).collection('players').document(str(i['ActivePlayerId'])).set(i)
            playerDB.document(str(i['ActivePlayerId'])).collection('match').document(str(match)).set(i)
    else:
        for i in data:
            matchDB.document(str(match)).collection('players').document(str(i['ActivePlayerId'])).set(i)
            playerDB.document(str(i['ActivePlayerId'])).collection('match').document(str(match)).set(i)

def get_history(player):
    print("Fetching match history for player: " + player)
    endpoint = "getmatchhistory"
    data = api_call(endpoint, player)
    if(data[0]['ret_msg'] == 'Invalid session id.'):
        session = session_setup(devId, current_time, key)
        data = api_call(session, player)
        for i in data:
            matchDB.document(str(i['Match'])).collection('players').document(str(i['playerId'])).set(i)
            playerDB.document(str(i['playerId'])).collection('match').document(str(i['Match'])).set(i)
            get_match(str(i['Match']))
    else:
        for i in data:
            matchDB.document(str(i['Match'])).collection('players').document(str(i['playerId'])).set(i)
            playerDB.document(str(i['playerId'])).collection('match').document(str(i['Match'])).set(i)
            get_match(str(i['Match']))

def get_gods():
    print("Fetching all gods")
    endpoint = "getgods"
    lang_code = "1"
    data = api_call(endpoint, lang_code)
    if(data[0]['ret_msg'] == 'Invalid session id.'):
        session = session_setup(devId, current_time, key)
        data = api_call(session, player)
        print(data)
        #for i in data:
            #matchDB.document(str(i['Match'])).collection('players').document(str(i['playerId'])).set(i)
            #playerDB.document(str(i['playerId'])).collection('match').document(str(i['Match'])).set(i)
            #get_match(str(i['Match']))
    else:
        #for i in data:
            #matchDB.document(str(i['Match'])).collection('players').document(str(i['playerId'])).set(i)
            #playerDB.document(str(i['playerId'])).collection('match').document(str(i['Match'])).set(i)
            #get_match(str(i['Match']))


if('session' not in locals()):
    session = session_setup(devId, current_time, key)
    print(session)
else:
    ares = "714597981"
    kai = "2947487"
    player = ""
    get_history(ares)
    get_history(kai) # Gets match history from player and looks-up match data including all other players performance in the match.
    #get_match()

    print("Done: Data has been loaded into the DB")





    #ares = "714597981" #pupares playerId
    #kai = "2947487" #pupkai playerId
    #rezami = "4383609"
    #match = "1145475382"
    #endpoint = "getmatchhistory"
    #endpoint = "getmatchplayerdetails"
    #endpoint = "getmatchdetails"
    # baby_yoda7292 - freya
