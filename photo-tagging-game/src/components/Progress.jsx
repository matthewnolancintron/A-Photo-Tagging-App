//display progress to the player
import React from 'react';
import '../App.css'

// 

const Progress = ({numberOfItemsFound,numberOfItemsToFind}) => {

  return (
    <div className='Progress'>
        {numberOfItemsFound} Items found
        <hr></hr>
        {numberOfItemsToFind} Items to find
    </div>
  );
};

export default Progress;