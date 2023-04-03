from google.cloud import firestore
import json

def main(request):
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
    return (json.dumps(results), 200)