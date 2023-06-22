
import React, { useState, useEffect, useRef } from 'react';
import '../App.css'



const Timer = ({timer}) => {

  return (
    <div className='Timer'>
        {timer}
    </div>
  );
};

export default Timer;