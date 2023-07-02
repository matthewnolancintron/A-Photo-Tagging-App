import { useState, useEffect, useRef } from 'react';
import './App.css';
import Level from './components/Level.jsx';
import SaveScoreModal from './components/SaveScoreModal';

function App({ levelsData }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [nextLevelData, setNextLevelData] = useState(levelsData[currentLevel]);
  const [timer, setTimer] = useState(0);
  const startTimeRef = useRef(null);
  const intervalIdRef = useRef(null);
  const [scoreTime, setScoreTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isGameFinished,setIsGameFinished] = useState(false);

  useEffect(() => {
    startTimer();
  }, [currentLevel]);

  const startTimer = () => {
    startTimeRef.current = new Date();
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const elapsedSeconds = Math.floor((currentTime - startTimeRef.current) / 1000);
      setTimer(elapsedSeconds);
    }, 1000);
    intervalIdRef.current = intervalId;
  };

  const stopTimer = () => {
    clearInterval(intervalIdRef.current);
    // intervalIdRef.current = null; // Set intervalIdRef.current to null
    startTimeRef.current = null;
    setTimer(0);
  };

  const saveLevelTime = (elapsedSeconds) => {
    setScoreTime(elapsedSeconds);
    console.log(`Level ${currentLevel} completion time: ${elapsedSeconds} seconds`);
  };

  const handleLevelCompletion = () => {
    if (currentLevel < levelsData.length - 1) {
      const endTime = new Date();
      const elapsedSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
      saveLevelTime(elapsedSeconds);
      stopTimer();
      setShowModal(true);
  
    } else {
      console.log('Congratulations! You completed the game');
      const endTime = new Date();
      const elapsedSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
      saveLevelTime(elapsedSeconds);
      stopTimer();
      setShowModal(true);
      setIsGameFinished(true);
    }
  };

  const handleSubmitName = (name) => {
    setPlayerName(name);
    setShowModal(false);
    handleSaveScoreModalClose()
  };

  const handleSaveScoreModalClose = () => {
      if(!isGameFinished){
        setShowModal(false);
        const nextLevel = currentLevel + 1;
        setCurrentLevel(nextLevel);
        setNextLevelData(levelsData[nextLevel]);
      } else {
        console.log('game is finished')
      }
  };

  return (
    <div id="app">
      <Level 
      levelData={nextLevelData}
      onLevelCompletion={handleLevelCompletion}
      timer={timer}
      stopTimer={stopTimer}
      />
      {showModal && (
        <SaveScoreModal
          onClose={handleSaveScoreModalClose}
          onSubmit={handleSubmitName}
          scoreTime={scoreTime}
        />
      )}
    </div>
  );
}

export default App;