// UserInputForm.tsx
import React, { useState } from 'react';
import Loading from '../assets/loading.svg'

interface UserInputFormProps {
  onButtonClick: (url: string, word: string) => void;
}

const UserInputForm: React.FC<UserInputFormProps> = ({ onButtonClick }) => {
  const [url, setUrl] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [isUrlValid, setIsUrlValid] = useState<boolean>(true);
  const [isWordValid, setIsWordValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleButtonClick = async () => {
    // Validate the URL before triggering the callback
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

    // Reset previous states
    setIsLoading(true);
    setIsUrlValid(true);
    setIsWordValid(true);
    setErrorMessage('');

    try {
      // Trigger the callback with user input
      await onButtonClick(url, word);
    } catch (error) {
      // Handle server errors
      setErrorMessage('Server error');
      console.error('Server Error:', error);
    } finally {
      // Stop loading whether there was an error or not
      setIsLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setIsUrlValid(true);
  };

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    setIsWordValid(true);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="url" className="text-gray-700 block mb-2">
          URL:
        </label>
        <input
          type="text"
          id="url"
          value={url}
          placeholder='https://en.wikipedia.org/wiki/Anime'
          onChange={handleUrlChange}
          className={`w-full p-2 border ${isUrlValid ? 'border-gray-300' : 'border-red-500'} rounded-md`}
        />
        {!isUrlValid && <p className="text-red-500 mt-1">Invalid URL</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="word" className="text-gray-700 block mb-2">
          Word:
        </label>
        <input
          type="text"
          id="word"
          value={word}
          placeholder='Enter one word here'
          onChange={handleWordChange}
          className={`w-full p-2 border ${isWordValid ? 'border-gray-300' : 'border-red-500'} rounded-md`}
        />
        {!isWordValid && <p className="text-red-500 mt-1">Please provide a word</p>}
      </div>

      <button
        onClick={handleButtonClick}
        className={isLoading ? "invisible" : "bg-gray-800 text-white p-2 rounded-md relative"}
        disabled={isLoading}
      >
      Count Occurrences
      </button>
      <img src={Loading} alt="Loading" width="50" height="50" className={isLoading ? "visible" : "invisible" }/>

      {errorMessage && (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default UserInputForm;
