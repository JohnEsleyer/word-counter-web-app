// ResponseDisplay.tsx
import React from 'react';

interface ResponseDisplayProps {
  occurrences: number | null;
  errorMessage: string;
  onReset: () => void;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ occurrences, errorMessage, onReset }) => {
  return (
    <div className="m-10">
     
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {occurrences !== null && !errorMessage && (
        <h1 className="text-2xl font-bold">{occurrences} occurrences</h1>
      )}
      <button
      
        onClick={onReset}
        className="bg-gray-800 text-white p-2 rounded-md mt-4"
      >
        Go back
      </button>
    </div>
  );
};

export default ResponseDisplay;
