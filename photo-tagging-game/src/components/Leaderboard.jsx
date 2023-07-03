import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../Leaderboard.css'

const Leaderboard = ({ db }) => {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    fetchHighScores(selectedLevel);
  }, [selectedLevel]);

  const fetchHighScores = async (level) => {
    const highScoresQuery = query(
      collection(db, 'highScores'),
      where('level', '==', level)
    );

    const highScoresSnapshot = await getDocs(highScoresQuery);
    const highScoresData = highScoresSnapshot.docs.map((doc) => doc.data());
    setHighScores(highScoresData);
  };

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div>
      <div>
        {[0, 1, 2].map((level) => (
          <button
            key={level}
            onClick={() => handleLevelClick(level)}
            className={selectedLevel === level ? 'active' : ''}
          >
            Level {level}
          </button>
        ))}
      </div>
      <div className="scrollable-area">
        <table>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Level</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((score) => (
              <tr key={score.playerName}>
                <td>{score.playerName}</td>
                <td>{score.level}</td>
                <td>{score.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
