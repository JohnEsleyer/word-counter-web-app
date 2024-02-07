import React, { useState } from 'react';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [occurrences, setOccurrences] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isUrlValid, setIsUrlValid] = useState<boolean>(true);
  const [isWordValid, setIsWordValid] = useState<boolean>(true);

  const handleButtonClick = async () => {
    try {
      setErrorMessage('');

      // Validate the URL before making the request
      const urlPattern = new RegExp('^(https?://)?[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+(\\/[^\\s]*)?$');
      if (!urlPattern.test(url)) {
        setIsUrlValid(false);
        return;
      }

      // Check if the word is empty
      if (word.trim() === '') {
        setIsWordValid(false);
        return;
      }

      const response = await fetch('http://127.0.0.1:5000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, url }),
      });

      if (response.ok) {
        const data = await response.json();
        setOccurrences(data.occurrences);
      } else if (response.status === 400) {
        setErrorMessage('Invalid input');
      } else {
        setErrorMessage('Internal server error');
        console.error(`Failed to fetch. Status code: ${response.status}`);
      }
    } catch (error) {
      setErrorMessage('Network error');
      console.error('Error:', error);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setErrorMessage('');
    setIsUrlValid(true);
  };

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    setErrorMessage('');
    setIsWordValid(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Word Occurrence Counter</h1>
        
        <div className="mb-4">
          <label htmlFor="url" className="text-gray-700 block mb-2">URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={handleUrlChange}
            className={`w-full p-2 border ${isUrlValid ? 'border-gray-300' : 'border-red-500'} rounded-md`}
          />
          {!isUrlValid && <p className="text-red-500 mt-1">Invalid URL</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="word" className="text-gray-700 block mb-2">Word:</label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={handleWordChange}
            className={`w-full p-2 border ${isWordValid ? 'border-gray-300' : 'border-red-500'} rounded-md`}
          />
          {!isWordValid && <p className="text-red-500 mt-1">Please provide a word</p>}
        </div>

        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Count Occurrences
        </button>

        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
        {occurrences !== null && !errorMessage && (
          <p className="mt-4">Occurrences of the word: {occurrences}</p>
        )}
      </div>
    </div>
  );
}

export default App;
