// App.tsx
import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import ResponseDisplay from './components/ResponseDisplay';

const App: React.FC = () => {
  const [occurrences, setOccurrences] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showResponse, setShowResponse] = useState<boolean>(false);

  const handleButtonClick = async (url: string, word: string) => {
    try {
      setErrorMessage('');

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
        setShowResponse(true);
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

  const handleReset = () => {
    setShowResponse(false);
    setOccurrences(null);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
       <h1 className="text-2xl font-semibold mb-4 pr-20">Word Occurrence Counter</h1>
      <div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
        {showResponse ? (
          <ResponseDisplay occurrences={occurrences} errorMessage={errorMessage} onReset={handleReset} />
        ) : (
          <UserInputForm onButtonClick={handleButtonClick} />
        )}
      </div>
    </div>
  );
};

export default App;
