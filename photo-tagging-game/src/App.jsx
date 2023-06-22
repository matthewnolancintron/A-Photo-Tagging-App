import { useState, useEffect, useRef } from 'react'
// import Level from './components/Level';
import './App.css'
import Level from './components/Level.jsx';

function App({ levelsData }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [nextLevelData, setNextLevelData] = useState(levelsData[currentLevel]);
  const [timer, setTimer] = useState(0);
  // const [startTime, setStartTime] = useState(null);
  // const [intervalId, setIntervalId] = useState(null);
  const startTimeRef = useRef(null);
  const intervalIdRef = useRef(null);

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
    startTimeRef.current = null;
    setTimer(0);
  };

  const saveLevelTime = (elapsedSeconds) => {
    // Save the elapsed time for the completed level
    // You can store it in state, send it to a server, or perform any necessary action
    // For example:
    console.log(`Level ${currentLevel} completion time: ${elapsedSeconds} seconds`);
  };

  function handleLevelCompletion() {
    if (currentLevel < levelsData.length - 1) {
      stopTimer();

      const endTime = new Date();
      const elapsedSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
      saveLevelTime(elapsedSeconds);


      // progress to the next level
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setNextLevelData(levelsData[nextLevel]);
    } else {
      // Handle game completion logic if all levels are completed
      console.log('congratulations you completed the game');
      stopTimer();

      const endTime = new Date();
      const elapsedSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
      saveLevelTime(elapsedSeconds);
    }
  }

  return (
    <div id="app">
      <Level levelData={nextLevelData} onLevelCompletion={handleLevelCompletion} timer={timer} />
    </div>
  )
}

export default App