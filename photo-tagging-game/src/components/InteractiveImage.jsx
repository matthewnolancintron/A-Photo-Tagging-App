// The ImageComponent can handle the image rendering,
// click detection, 
//and coordinate scaling. 
//When the user clicks on an item,
// it can emit an event or pass the relevant
// data (such as the clicked item's coordinates) to the LevelComponent.  
import React, { useState, useEffect, useRef } from 'react';
import '../App.css'

const InteractiveImage = ({ imageUrl, itemData, defaultImageWidth, defaultImageHeight, onItemClick, openMenu }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);
  const [scaledItemsHitboxes, setScaledItemsHitboxes] = useState([]);

  /**
   Get the width and height of the current image dimensions  
   and use it to set the state variable imageSize 
   This is needed to calculate the scale factors
   for calculating the scaled hitboxes for each item
   */
  useEffect(() => {
    const handleImageResize = () => {
      // Get the width and height of the image
      const { width, height } = imageRef.current.getBoundingClientRect();

      // Set the image size state
      setImageSize({ width, height });
    };

    //  
    handleImageResize(); // Initialize the size on component mount

    //
    window.addEventListener('resize', handleImageResize);

    //
    return () => {

      //
      window.removeEventListener('resize', handleImageResize);
    };
  }, []);

  // Call the calculateScaledHitboxes function
  // whenever the imageSize or itemData changes
  useEffect(() => {
    calculateScaledHitboxes();
  }, [imageSize, itemData]);


  const handleImageResize = () => {
    // Get the width and height of the image
    const { width, height } = imageRef.current.getBoundingClientRect();

    // Set the image size state
    setImageSize({ width, height });
  };

  // Calculate the scaled hitboxes for each item
  const calculateScaledHitboxes = () => {
    // Calculate the scale factors for width and height
    const widthScaleFactor = imageSize.width / defaultImageWidth;
    const heightScaleFactor = imageSize.height / defaultImageHeight;

    // Adjust the hitbox coordinates based on the scale factors  
    const updatedScaledCoordinates = itemData.map((item) => {
      const scaledHitbox = {
        name: item.name,
        startX: Math.round(item.hitbox.startX * widthScaleFactor),
        startY: Math.round(item.hitbox.startY * heightScaleFactor),
        endX: Math.round(item.hitbox.endX * widthScaleFactor),
        endY: Math.round(item.hitbox.endY * heightScaleFactor),
      };
      return scaledHitbox;
    });
    setScaledItemsHitboxes(updatedScaledCoordinates);
  };

  const handleImageClick = (event) => {
    const image = event.target;
    const imageRect = image.getBoundingClientRect();
    const x = (event.clientX - imageRect.left) 
    const y = (event.clientY - imageRect.top) 


    openMenu(event);

    console.log(x, y, 'coords')

    // Check for matching item coordinates
    checkForMatchingItems({ x, y });
  };

  const checkForMatchingItems = (clickedCoords) => {
    for (const scaledItemsHitbox of scaledItemsHitboxes) {
      if (
        clickedCoords.x >= scaledItemsHitbox.startX &&
        clickedCoords.x <= scaledItemsHitbox.endX &&
        clickedCoords.y >= scaledItemsHitbox.startY &&
        clickedCoords.y <= scaledItemsHitbox.endY
      ) {
        console.log('?')
        // Match found, handle the logic for the matched item
        handleMatchedItem(scaledItemsHitbox.name);
        break;
      }
    }
  };

  //send the item that was matched to level
  const handleMatchedItem = (itemName) => {
    // Logic for when a matched item is found
    console.log('Matched item:', itemName);
    onItemClick(itemName);

  };

  return (
    <div id='interactiveImage'>
      <img
        src={imageUrl}
        onClick={handleImageClick}
        ref={imageRef}
        style={{ width: '100%', height: 'auto', position: 'relative', objectFit: "contain"}}
        alt="Game Image"
        onLoad={handleImageResize}
      />
    </div>
  );
};

export default InteractiveImage;