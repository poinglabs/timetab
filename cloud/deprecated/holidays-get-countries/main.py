from google.cloud import firestore
import json

def main(request):

    # Set CORS headers for the preflight request
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


    db = firestore.Client()

    # Get all documents in the available_countries collection
    available_countries_ref = db.collection('available_countries')
    docs = available_countries_ref.get()

    # Convert documents to JSON objects
    countries = []

    for doc in docs:
        data = doc.to_dict()
        countries.append(data)

    results = {
        "countries" : countries
    }

    # Return JSON object
    return (json.dumps(results), 200, headers)