import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the custom styles

function App() {
  const [numbers, setNumbers] = useState([]);
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [average, setAverage] = useState(0);
  const accessToken = "YOUR_ACCESS_TOKEN_HERE";

  const fetchNumbers = async (numberId) => {
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${numberId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const { windowPrevState, windowCurrState, numbers, avg } = response.data;

      setWindowPrevState(windowPrevState);
      setWindowCurrState(windowCurrState);
      setNumbers(numbers);
      setAverage(avg);
    } catch (error) {
      console.error('Error fetching numbers:', error);

      if (error.response && error.response.status === 401) {
        console.log('Token expired or unauthorized');
      }
    }
  };

  useEffect(() => {
    fetchNumbers('e'); // Fetch even numbers ('e') on initial load
  }, []);

  return (
    <div className="container">
      <h1>Average Calculator</h1>
      <div className="button-container">
        <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
        <button onClick={() => fetchNumbers('f')}>Fetch Fibonacci Numbers</button>
        <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
        <button onClick={() => fetchNumbers('r')}>Fetch Random Numbers</button>
      </div>
      <div className="list-container">
        <h2>Previous Window State</h2>
        <ul className="number-list">
          {windowPrevState.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      <div className="list-container">
        <h2>Current Window State</h2>
        <ul className="number-list">
          {windowCurrState.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      <div className="list-container">
        <h2>Numbers</h2>
        <ul className="number-list">
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      <div className="average-container">
        <h2>Average</h2>
        <p>{average.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
