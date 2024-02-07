

import React, { useState } from 'react';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [occurrences, setOccurrences] = useState<number | null>(null);

  const handleButtonClick = async () => {
    try {
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
      } else {
        console.error(`Failed to fetch. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="word" className="text-gray-700 block mb-2">Word:</label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Count Occurrences
        </button>

        {occurrences !== null && (
          <p className="mt-4">Occurrences of the word: {occurrences}</p>
        )}
      </div>
    </div>
  );
}

export default App;
