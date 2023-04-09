import requests
from google.cloud import firestore
from datetime import datetime, timedelta
from error_manager import ErrorManager

error_manager = ErrorManager("save_holidays")

def get_public_holidays(request):
    # Get the countryCode parameter from the request
    countryCode = request.args.get('countryCode')
    year = str(request.args.get('year'))

    print(f'Get holiday {countryCode} {year}')

    if not countryCode:
        error_manager.report("Missing countryCode parameter")
        return ('Error: Missing countryCode parameter', 400)

    db = firestore.Client()

    # Check if a collection with the countryCode ID exists
    collection_ref = db.collection(countryCode+year)
    if collection_ref.get():
        # Delete all documents in the collection
        delete_collection(collection_ref, batch_size=100)

    # Make a request to the Nager.Date API to get public holidays    
    response = requests.get(f'https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}')
    if response.status_code != 200:
        err_msg = f'Get Public holidays: Request failed with status code {response.status_code}'
        error_manager.report(err_msg)
        print(err_msg)
        return ('Error: Unable to retrieve public holidays', 500)
    holidays = response.json()

     # Make a request to the Nager.Date API to get bridge days 
    response = requests.get(f'https://date.nager.at/api/v3/LongWeekend/{year}/{countryCode}')
    if response.status_code != 200:
        err_msg = f'Get Long Weekends: Request failed with status code {response.status_code}'
        error_manager.report(err_msg)
        print(err_msg)
        return ('Error: Unable to retrieve long weekends', 500)
    long_weekends = response.json()

    bridge_days = []
    for long_weekend in long_weekends:
        bridge_day = find_bridge_day(long_weekend, holidays)
        if bridge_day is not None:
            bridge_holiday = {
                "date": bridge_day,
                "localName": "Bridge day",
                "name": "Bridge Day",
                "countryCode": countryCode
            }
            bridge_days.append(bridge_holiday)
    
    holidays = holidays + bridge_days
    
    # Save the holidays to Firestore
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
            err_msg = f'Error: {str(e)}'
            error_manager.report(err_msg)
            return (err_msg, 500)

    return wrapper

def find_bridge_day(long_weekend, public_holidays):
    start_date = datetime.strptime(long_weekend["startDate"], "%Y-%m-%d")
    end_date = datetime.strptime(long_weekend["endDate"], "%Y-%m-%d")
    day_count = long_weekend["dayCount"]
    need_bridge_day = long_weekend["needBridgeDay"]

    # Check if a bridge day is needed
    if not need_bridge_day:
        return None

    # Create a set of public holidays
    public_holidays_set = set([datetime.strptime(h["date"], "%Y-%m-%d").date() for h in public_holidays])

    # Find the bridge day
    delta = timedelta(days=1)
    current_date = start_date + delta
    while current_date < end_date:
        if current_date.weekday() < 5 and current_date.date() not in public_holidays_set:
            return current_date.date().strftime('%Y-%m-%d')
        current_date += delta

    return None

# Decorate the function with error handling
get_public_holidays = handle_error(get_public_holidays)
