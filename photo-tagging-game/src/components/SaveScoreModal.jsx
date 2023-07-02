import React, { useState, useEffect } from 'react';
import {formatTime} from '../components/formatTime'

/**
 * could update this component to display a mini leaderboard similar to an arcade machine
 * check highscore or end game screens of aracade game for reference 
 * will need to pull score data from firestore emulators to then render based on that data.
 */

const SaveScoreModal = ({ onClose, onSubmit, scoreTime }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const dialog = document.querySelector('dialog');
    if (dialog && dialog.showModal) {
      dialog.close();
      dialog.showModal(); // Open the dialog when component is mounted
    } else {
      console.error("Dialog API 'showModal' is not supported.");
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      onSubmit(inputValue);
    }
  };

  const handleClose = () => {
    onClose();
    setInputValue('');

    const dialog = document.querySelector('dialog');
    if (dialog && dialog.close) {
      dialog.close(); // Close the dialog
    } else {
      console.error("Dialog API 'close' is not supported.");
    }
  };

  return (
    <dialog>
      <div>
        <p>Your score: {formatTime(scoreTime)}</p>
        <label htmlFor="nameInput">Enter your name:</label>
        <input type="text" id="nameInput" value={inputValue} onChange={handleInputChange} />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </dialog>
  );
};

export default SaveScoreModal;