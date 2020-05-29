import os, requests, uuid, json

# Don't forget to replace with your Cog Services subscription key!
subscription_key = '31dfe30a273742bba0bb7c0af0609320'

# Our Flask route will supply four arguments: input_text, input_language,
# output_text, output_language.
# When the run sentiment analysis button is pressed in our Flask app,
# the Ajax request will grab these values from our web app, and use them
# in the request. See main.js for Ajax calls.

def get_sentiment(input_text):
    base_url = 'https://eastus.api.cognitive.microsoft.com/text/analytics'
    path1 = '/v2.1/sentiment'
    path2 = '/v2.1/keyphrases'
    constructed_url1 = base_url + path1
    constructed_url2 = base_url + path2
    headers = {
        'Ocp-Apim-Subscription-Key': subscription_key,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
    }

    # You can pass more than one object in body.
    body = {
        'documents': [
            {
                'language': 'es',
                'id': '1',
                'text': input_text
            }
        ]
    }
    sentimet = requests.post(constructed_url1, headers=headers, json=body)
    keywords = requests.post(constructed_url2, headers=headers, json=body)
    return sentimet.json(),keywords.json()