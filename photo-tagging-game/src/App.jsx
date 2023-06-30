import { useState, useEffect, useRef } from 'react'
// import Level from './components/Level';
import './App.css'
import Level from './components/Level.jsx';

function App({ levelsData }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [nextLevelData, setNextLevelData] = useState(levelsData[currentLevel]);
  const [timer, setTimer] = useState(0);
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

  const formatTime = (timeInSeconds) => {
    console.log(timeInSeconds,'?')
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}h:${formattedMinutes}m:${formattedSeconds}s`;
  };

  const saveLevelTime = (elapsedSeconds) => {
    // Save the elapsed time for the completed level
    // You can store it in state, send it to a server, or perform any necessary action
    // For example:
    formatTime(elapsedSeconds);


    console.log(`Level ${currentLevel} completion time: ${elapsedSeconds} seconds`);
  };

  // function handleLevelCompletion() {
  //   if (currentLevel < levelsData.length - 1) {
  //     stopTimer();

  //     const endTime = new Date();
  //     const elapsedSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
  //     saveLevelTime(elapsedSeconds);


  //  /**
  //  add functionality for saving players score:
  //  part 1:
  //  Once a round/level is complete, display the players score (time it took to complete the level).
  //  which is the timers value at level completion, then similar to an arcade machine.
  //  create a popup that asks them to enter their name for the high scores table.

  //  part 2:
  //  once I have part one complete I can use that data to 
  //  to update a collection in firebase that will be used to represent the high scores of players 
  //  and then later used for creating a leaderboard display 
  //  I don't have the collection yet and the parent component of app which is my main component handles 
  //  the info about firebase such as firestore I have notes about Firebase instance available throughout your application by using React's context 
  //  which I will read when updating the collection I need to make for player highscores

  //  part 3: update the overall function to not progress to the next level until the user decided to enter their name for the high scores table or not
  //  */

  //     // Trigger the logic for the next level



  //     // progress to the next level
  //     const nextLevel = currentLevel + 1;
  //     setCurrentLevel(nextLevel);
  //     setNextLevelData(levelsData[nextLevel]);
  //   } else {
  //     // Handle game completion logic if all levels are completed
  //     console.log('congratulations you completed the game');
  //     stopTimer();

  //     const endTime = new Date();
  //     const elapsedSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
  //     saveLevelTime(elapsedSeconds);
  //   }
  // }

  function handleLevelCompletion() {
    if (currentLevel < levelsData.length - 1) {
      stopTimer();

      const endTime = new Date();
      const elapsedSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
      saveLevelTime(elapsedSeconds);

      

      // Display player's score and ask for their name
      const playerName = prompt(`Congratulations! You completed the level in  \nEnter your name for the high scores table:`);
      if (playerName) {
        // Save the player's score to the high scores table (e.g., Firebase collection)
        // You can perform the necessary action here, such as sending the data to a server or updating a database
        // For example:
        const highScoreData = {
          playerName,
          level: currentLevel,
          time: elapsedSeconds
        };
        console.log('High score data:', highScoreData);

        // Trigger the logic for the next level

        // Progress to the next level
        const nextLevel = currentLevel + 1;
        setCurrentLevel(nextLevel);
        setNextLevelData(levelsData[nextLevel]);
      } else {
        // Player chose not to enter their name, handle accordingly
        // For example, you can prompt again or stay on the current level
        console.log('Player chose not to enter their name');
        // Add your desired logic here
      }
    } else {
      // Handle game completion logic if all levels are completed
      console.log('Congratulations! You completed the game');
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