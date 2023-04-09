import requests
from google.cloud import firestore

def main(request):
    db = firestore.Client()
    collection_ref = db.collection('available_countries')
    # Delete all documents in the "countries" collection
    delete_collection(collection_ref, batch_size=20)

    # Make a request to the Nager.Date API to get available countries
    response = requests.get('https://date.nager.at/api/v3/AvailableCountries')
    if response.status_code != 200:
        print(f'Request failed with status code {response.status_code}')
        return ('Error: Unable to retrieve available countries', 500)

    # Save the countries to Firestore
    countries = response.json()
    for country in countries:
        doc_ref = collection_ref.document(country['countryCode'])
        doc_ref.set(country)

    return ('Countries successfully retrieved and saved', 200)

def delete_collection(coll_ref, batch_size):
    docs = coll_ref.limit(batch_size).get()
    deleted = 0

    for doc in docs:
        doc.reference.delete()
        deleted += 1

    if deleted >= batch_size:
        return delete_collection(coll_ref, batch_size)

# Handle errors and print traceback
def handle_error(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            import traceback
            traceback.print_exc()
            return (f'Error: {str(e)}', 500)

    return wrapper

# Decorate the function with error handling
main = handle_error(main)
