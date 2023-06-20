import { useState } from 'react'
// import Level from './components/Level';
import './App.css'
import Level from './components/Level';

function App({levelsData}) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [nextLevelData, setNextLevelData] = useState(levelsData[currentLevel]);

  function handleLevelCompletion() {
    if (currentLevel < levelsData.length - 1) {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setNextLevelData(levelsData[nextLevel]);
    } else {
      // Handle game completion logic if all levels are completed
      console.log('congratulations you completed the game');
    }
  }
  
  return (
   <div id="app">
     <Level levelData={nextLevelData} onLevelCompletion={handleLevelCompletion} />
   </div>
  )
}

export default App