from google.cloud import firestore
from google.auth.transport.requests import Request
from google.oauth2 import id_token
import requests
import json
import datetime

def main(request):

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }


    # Get country code parameter from request
    country_code = request.args.get('countryCode')

    # Get year
    year = str(request.args.get('year'))
    print(f'Get holiday {country_code} {year}')
    # Initialize Firestore client
    db = firestore.Client()

    # Get holidays collection for given country code and year
    holidays_ref = db.collection(f'{country_code}{year}')
    docs = holidays_ref.get()

    # If holidays collection does not exist, call holidays_save_holidays function
    if len(docs) == 0:
        # Set up authentication headers
        url = f'https://us-central1-poing-timetab.cloudfunctions.net/holidays_save_holidays?countryCode={country_code}&year={year}'
        headersf = {'Authorization': f'Bearer {id_token.fetch_id_token(Request(), audience=url)}'}

        # Call holidays_save_holidays function
        response = requests.get(url, headers=headersf)
        print(response.status_code)
        # Check if response was successful
        if response.status_code != 200:
            return (f'Error creating holidays collection for {country_code}{year}', 500, headers)

        # Get holidays collection again
        docs = holidays_ref.get()

    # Convert documents to JSON objects with transformed keys
    results = []
    for doc in docs:
        data = doc.to_dict()
        transformed_data = {
            'day': data['date'],
            'description': data['localName'],
            'holiday': True,
            'imported': True
        }
        results.append(transformed_data)

    output = {
        "holidays" : results
    }

    # Return JSON object
    return (json.dumps(output), 200, headers)