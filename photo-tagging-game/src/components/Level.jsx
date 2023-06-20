/**     
  3. Render the image and items based on the retrieved data.
    Use the dynamic image URL to display the image and
    create interactive elements for the items based on 
    their hitbox coordinates.

  4. Implement the logic to detect when the user finds all the items
     in the level. 
     You can track the user's progress by keeping a count of the found
     items or using any other suitable method.
     When all the items are found, consider the level as complete.

  5. Upon level completion,
     update the game state to progress to the next level.
     This can involve updating the current level identifier 
     or any other relevant level information.

  create a dynamic and evolving game experience 
  where the images and item data change with each level.
  It adds variety and challenges for the player,
  keeping the game engaging and exciting.
  level system where the image changes
  when the user finds all the items in the current level.
  Upon completion, you can fetch the data for the next level
  and update the game accordingly.

  Remember to handle any necessary
  cleanup or reset operations
  when transitioning between levels to ensure
  a smooth gameplay experience.
 */



/**
 * question to ask gpt later:
 * 
 * I'm importing firebase in main.jsx and in level.jsx
in main it's to set up the firebase app and connect the emulators,
in level it's to retrieve some data from firestore.

I'm not sure if i should be importing firebase twice
or if I should pass it down to app and then have app pass it down
to level?

or if I should use the context api?

eventually I'll have to work with auth and anonymous users
not sure of the specifices just yet.
 */

import React, { useState, useEffect } from 'react';
import InteractiveImage from './InteractiveImage';
import ContextMenu from './ContextMenu';
import LoginArea from './LoginArea';
import '../App.css'

const Level = ({ levelData, onLevelCompletion }) => {
  // itemsFound keeps track of the players progress in the level
  const [itemsFound, setItemsFound] = useState([]);

  // the current item the user clicked on the image
  const [clickedItem, setClickedItem] = useState(null);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  //postition of context menu
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // This function will be triggered whenever `itemsFound` is updated
    // Perform the action or trigger the function here
    //if check if user found all of the items
    if (levelData.items.map(item => item.name).length === itemsFound.length
      && levelData.items.map(item => item.name).every((item) => itemsFound.includes(item))) {
      // userFound all items level complete:
      handleLevelComplete();
    }
  }, [itemsFound]);

  // saves the most recent item the user clicked on the image to setClickedItem
  const handleItemClick = (item) => {
    setClickedItem(item);
  };

  const openContextMenu = (e) => {
    e.preventDefault(); // Prevent the default browser context menu from showing up
    setIsContextMenuOpen(true);
    setPosition({ x: e.pageX, y: e.pageY }); // Set the position based on the click coordinates
  };

  // saves the most recent option the user selected from the context menu to setSelectedOption
  const handleOptionSelect = (option) => {
    // console.log(option);

    // Perform the necessary checks and update the game state
    // based on the clicked item and selected option
    // if selectedOption and clickedItem are equal and item isn't already in
    // itemsFound add it to itemsFound
    //check if items found has all of the items that need to found 
    // in the level and using a check if all item have been found function
    //todo make that function and the condtion in this function for that logic

    //if the option selected hasn't already been found 
    if (!itemsFound.includes(option)) {
      //if the clicked item matches the option seletec
      if (clickedItem === option) {
        // add the option to itemsFound
        setItemsFound((prevItems) => [...prevItems, option]); // Update the array state by creating a new array
      }
    }

    // close the context menu
    handleContextMenuClose();
  };


  // clears setClickedItem and setSelectedOption when the context menu is closed
  const handleContextMenuClose = () => {
    // Clear the clicked item and selected option when the context menu is closed
    setClickedItem(null);


    //close menu
    setIsContextMenuOpen(false);
  };

  // Perform necessary logic for level completion
  function handleLevelComplete() {
    // Perform necessary logic for level completion
    // clean up level's state for the next level
    setItemsFound([]);
    setClickedItem(null);
    setIsContextMenuOpen(false);
    setPosition({ x: 0, y: 0 });

    // Trigger the logic for the next level
    onLevelCompletion();
  }

  return (
    <div id='level'>
      {/* todo:
       add functionality to login area,
       add users and add data for users to firestore
       what data needs to be saved and retrived
       check docs for setting up auth
        */}
      <LoginArea

      />
      <InteractiveImage
        imageUrl={levelData.imageUrl}
        defaultImageWidth={levelData.intrinsicSize.width}
        defaultImageHeight={levelData.intrinsicSize.height}
        onItemClick={handleItemClick}
        itemData={levelData.items}
        openMenu={openContextMenu}
      />

      {/* todo add the progress component
           make it display off to the side of the image in the margins
           also make it sticky so that it is visible when scrolling.
       */}

       {/*
          add timer similar to progress 
          need to look around to figure out how to get the data for this 
          then displaying it should be similar to the progress display
        */}

      {isContextMenuOpen &&
        <ContextMenu
          itemNames={levelData.items.map(item => item.name)}
          onOptionSelect={handleOptionSelect}
          position={position}
          isVisible={isContextMenuOpen}
        />


      }
    </div>
  );
};

export default Level;