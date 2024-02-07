import requests
from bs4 import BeautifulSoup

def count_word_occurrences(url, target_word):
    response = requests.get(url)

    if response.status_code == 200:
        
        soup = BeautifulSoup(response.text, 'html.parser')
        text_content = soup.get_text()
        word_count = text_content.lower().split().count(target_word.lower())

        return word_count
    else:
        print(f"Failed to retrieve content from {url}. Status code: {response.status_code}")
        return 0

def main():
 
    target_word = input("Enter the word to count occurrences: ")
    url = input("Enter the URL to scrape: ")
    word_occurrences = count_word_occurrences(url, target_word)
    
    print(f"The word '{target_word}' occurs {word_occurrences} times on the page at {url}.")

if __name__ == "__main__":
    main()
