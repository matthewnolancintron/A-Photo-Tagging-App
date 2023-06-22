import React, { useState, useEffect } from 'react';
import InteractiveImage from './InteractiveImage';
import ContextMenu from './ContextMenu';
// import LoginArea from './LoginArea';
import Progress from './Progress';
import Timer from './Timer';
import Notification from './Notification';
import '../App.css'

const Level = ({ levelData, onLevelCompletion, timer }) => {
  // itemsFound keeps track of the players progress in the level
  const [itemsFound, setItemsFound] = useState([]);

  // the current item the user clicked on the image
  const [clickedItem, setClickedItem] = useState(null);

  //
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  //postition of context menu
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //
  const [notification, setNotification] = useState(null);

  //
  const addNotification = (message) => {
    // const newNotification = { id: Date.now(), message };
    // setNotification(newNotification);

    if (notification) {
      closeNotification();
      setTimeout(() => {
        setNotification({ id: Date.now(), message, slideOut: false });
      }, 300); // Wait for the previous notification to slide out before adding the new one
    } else {
      setNotification({ id: Date.now(), message, slideOut: false });
    }
  };

  //
  const closeNotification = (id) => {
    setNotification((prevNotification) => ({
      ...prevNotification,
      slideOut: true
    }));

    setTimeout(() => {
      setNotification(null);
    }, 300); // Wait for the animation to finish before removing the notification
  };

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

        //todo: add marker to image

      } else {
        addNotification('Incorrect choice. Try again.'); // Add a new notification for an incorrect choice
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
      {/* <LoginArea

      /> */}

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
      <Progress
        numberOfItemsFound={itemsFound.length}
        numberOfItemsToFind={levelData.items.map(item => item.name).length}
      />
      {/*
          add timer similar to progress 
          need to look around to figure out how to get the data for this 
          then displaying it should be similar to the progress display
        */}
      <Timer
        timer={timer}
      />

      {/*
        todo add component that display characters that need to be found
        find a profile or icon picture of the characters and display them
        to the side similar to the progress and timer
        or
        update the progress to include this information by
        instead of using the x / total show the icons and as the player
        find them by highlighting the border of the icon with a green border
        could still keep the x/total maybe make a container that shows the icons
        update the icons as the player finds them and in the corner of the container
        show the progress as the x/total information. 
       */}
      {/* Render the notifications */}
      <div className="notification-container">
        {notification && (
          <Notification
            notification={notification}
            onClose={closeNotification}
            // className={notification ? 'slide-in' : ''}
            className={`notification ${notification.slideOut ? 'slide-out' : ''}`}
          />
        )}
      </div>


      {/* 
        add an error message component to level:
        Provide the user with appropriate feedback (e.g. if wrong, an error message).
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