


{/* <div className="min-h-screen flex items-center justify-center bg-white">
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

        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
        {occurrences !== null && !errorMessage && (
          <p className="mt-4">Occurrences of the word: {occurrences}</p>
        )}
      </div>
    </div> */}