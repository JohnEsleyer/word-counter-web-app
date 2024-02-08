from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup


app = Flask(__name__)
CORS(app)

def count_word_occurrences(url, target_word):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        text_content = soup.get_text()
        word_count = text_content.lower().split().count(target_word.lower())
        return word_count
    else:
        return 0

@app.route('/api', methods=['POST'])
def api_count_word_occurrences():
    try:
        data = request.get_json()

        if 'word' not in data or 'url' not in data:
            return jsonify({"error": "Both 'word' and 'url' must be provided in the JSON body."}), 400

        target_word = data['word']
        url = data['url']

        word_occurrences = count_word_occurrences(url, target_word)

        return jsonify({"word": target_word, "url": url, "occurrences": word_occurrences})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
