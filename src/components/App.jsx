import './App.css';
import { useState, useEffect } from 'react';
import Description from './Description/Description';
import Feedback from './Feedback/Feedback';
import Options from './Options/Options';
import Notification from './Notification/Notification';

function App() {
  const savedRating = JSON.parse(localStorage.getItem('saved-rating'));
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    positive: 0,
  };
  const [clicks, setClicks] = useState(
    savedRating ? savedRating : initialState
  );

  const updateFeedback = feedbackType => {
    setClicks(prevState => {
      if (feedbackType === 'Reset') {
        return initialState;
      } else {
        const newClicks = {
          ...prevState,
          [feedbackType === 'Good'
            ? 'good'
            : feedbackType === 'Neutral'
            ? 'neutral'
            : 'bad']: prevState[feedbackType.toLowerCase()] + 1,
        };
        newClicks.total = newClicks.good + newClicks.neutral + newClicks.bad;
        newClicks.positive =
          Math.round(
            ((newClicks.good + newClicks.neutral) / newClicks.total) * 100
          ) + '%';
        return newClicks;
      }
    });
  };

  const handleClick = e => {
    updateFeedback(e.target.textContent);
  };

  useEffect(() => {
    localStorage.setItem('saved-rating', JSON.stringify(clicks));
  }, [clicks]);

  return (
    <div className="container">
      <Description />
      <ul className="button-wrapper">
        <Options handleClick={handleClick}>Good</Options>
        <Options handleClick={handleClick}>Neutral</Options>
        <Options handleClick={handleClick}>Bad</Options>
        {clicks.total > 0 && <Options handleClick={handleClick}>Reset</Options>}
      </ul>
      {clicks.total ? <Feedback rating={clicks} /> : <Notification />}
    </div>
  );
}

export default App;
