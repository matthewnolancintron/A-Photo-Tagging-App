import React, { useEffect } from 'react';
import '../App.css';
import { formatTime } from '../components/formatTime'

const Timer = ({ timer, stopTimer }) => {
  const formattedTime = formatTime(timer);

  useEffect(() => {
    if (timer === 0) {
      stopTimer();
    }
  }, [timer, stopTimer]);

  return (
    <div className="Timer">
      {formattedTime}
    </div>
  );
};

export default Timer;
