import requests
from google.cloud import firestore
import datetime

def get_public_holidays(request):
    # Get the countryCode parameter from the request
    countryCode = request.args.get('countryCode')

    if not countryCode:
        return ('Error: Missing countryCode parameter', 400)

    db = firestore.Client()

    year = str(datetime.datetime.now().year)

    # Check if a collection with the countryCode ID exists
    collection_ref = db.collection(countryCode+year)
    if collection_ref.get():
        # Delete all documents in the collection
        delete_collection(collection_ref, batch_size=100)

    # Make a request to the Nager.Date API to get public holidays    
    response = requests.get(f'https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}')
    if response.status_code != 200:
        print(f'Request failed with status code {response.status_code}')
        return ('Error: Unable to retrieve public holidays', 500)

    # Save the holidays to Firestore
    holidays = response.json()
    for holiday in holidays:
        collection_ref.add(holiday)

    return (f'Public holidays for {countryCode} successfully retrieved and saved', 200)

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
get_public_holidays = handle_error(get_public_holidays)
