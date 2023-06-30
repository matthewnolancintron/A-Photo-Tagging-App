import React from 'react';
import '../App.css';

const Timer = ({ timer }) => {
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}h:${formattedMinutes}m:${formattedSeconds}s`;
  };

  const formattedTime = formatTime(timer);

  return (
    <div className="Timer">
      {formattedTime}
    </div>
  );
};

export default Timer;
