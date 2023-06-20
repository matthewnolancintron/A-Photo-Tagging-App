// The ImageComponent can handle the image rendering,
// click detection, 
//and coordinate scaling. 
//When the user clicks on an item,
// it can emit an event or pass the relevant
// data (such as the clicked item's coordinates) to the LevelComponent.  
import React, { useState, useEffect, useRef } from 'react';
import '../App.css'

const LoginArea = ({}) => {

  return (
    <div className='loginArea'>
        <button className='loginButton'>login in</button>
    </div>
  );
};

export default LoginArea;