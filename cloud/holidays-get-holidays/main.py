from google.cloud import firestore
from google.auth.transport.requests import Request
from google.oauth2 import id_token
import requests
import json
import datetime

def main(request):
    # Get country code parameter from request
    country_code = request.args.get('countryCode')

    # Get current year
    current_year = str(datetime.datetime.now().year)

    # Initialize Firestore client
    db = firestore.Client()

    # Get holidays collection for given country code and year
    holidays_ref = db.collection(f'{country_code}{current_year}')
    docs = holidays_ref.get()

    # If holidays collection does not exist, call holidays_save_holidays function
    if len(docs) == 0:
        # Set up authentication headers
        url = 'https://us-central1-poing-timetab.cloudfunctions.net/holidays_save_holidays?countryCode='+country_code
        headers = {'Authorization': f'Bearer {id_token.fetch_id_token(Request(), audience=url)}'}

        # Call holidays_save_holidays function
        response = requests.get(url, headers=headers)

        # Check if response was successful
        if response.status_code != 200:
            return (f'Error creating holidays collection for {country_code}{current_year}', 500)

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
    return (json.dumps(output), 200)