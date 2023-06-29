import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const InteractiveImage = ({
  imageUrl,
  itemData,
  defaultImageWidth,
  defaultImageHeight,
  onItemClick,
  openMenu,
  namesOfMarkersToAdd
}) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const canvasRef = useRef(null);
  const [scaledItemsHitboxes, setScaledItemsHitboxes] = useState([]);
  const [markersData, setMarkersData] = useState([]);

  const calculateScaledHitboxes = () => {
    console.log(imageSize,'?')
    const widthScaleFactor = imageSize.width / defaultImageWidth;
    const heightScaleFactor = imageSize.height / defaultImageHeight;

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

  useEffect(() => {
    console.log('new image')
    setImageLoaded(false);
    const handleImageLoad = () => {
      const { width, height } = image;
      setImageSize({ width, height });
      setImageLoaded(true);
    };

    const image = new Image();
    image.src = imageUrl;
    image.onload = handleImageLoad;

    return () => {
      image.onload = null; // Clean up the event listener
    };
  }, [imageUrl]);

  useEffect(() => {
    const handleImageResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setImageSize({ width, height });
      }
    };

    handleImageResize();
    window.addEventListener('resize', handleImageResize);

    return () => {
      window.removeEventListener('resize', handleImageResize);
    };
  }, []);

  useEffect(() => {
    console.log('update/set image size after load?')
    if (imageLoaded) {
      console.log('hello')
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setImageSize({ width, height });
        console.log('updated?',imageSize)
      }
    }
  }, [imageLoaded]);

  useEffect(()=>{
    calculateScaledHitboxes();
  },[imageSize]);

  useEffect(() => {
    updateMarkersData();
  }, [imageSize, namesOfMarkersToAdd]);

  const updateMarkersData = () => {
    let dataForMarkers = namesOfMarkersToAdd.map((markerData) => {
      const scaledHitbox = scaledItemsHitboxes.find((item) => item.name === markerData.name);
  
      if (scaledHitbox) {
        const { startX, startY, endX, endY } = scaledHitbox;
        const centerX = (startX + endX) / 2;
        const centerY = (startY + endY) / 2;
        const leftPercent = `${((centerX / imageSize.width) * 100)}%`;
        const topPercent = `${((centerY / imageSize.height) * 100)}%`;
  
        return {
          name: markerData.name,
          styles: {
            top: topPercent,
            left: leftPercent,
          },
        };
      }
  
      return null; // Handle case where marker name doesn't have a corresponding scaledHitbox
    });
  
    setMarkersData(dataForMarkers.filter(Boolean)); // Remove any null values from the array
  };
  


  const handleImageClick = (event) => {
    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;

    openMenu(event);
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
        handleMatchedItem(scaledItemsHitbox.name);
        break;
      }
    }
  };

  const handleMatchedItem = (itemName) => {
    onItemClick(itemName);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      drawMarkersOnCanvas(context);
    };

    return () => {
      image.onload = null; // Clean up the event listener
    };
  }, [markersData, defaultImageWidth, defaultImageHeight]);

  const drawMarkersOnCanvas = (context) => {
    for (const marker of markersData) {
      const { left, top } = marker.styles;
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
  
      const markerX = (parseFloat(left) / 100) * canvasWidth;
      const markerY = (parseFloat(top) / 100) * canvasHeight;
  
      context.beginPath();
      context.arc(markerX, markerY, 20, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
    }
  };
  

  return (
    <div id="interactiveImage">
      <canvas
        ref={canvasRef}
        onClick={handleImageClick}
        style={{
          width: '100%',
          height: 'auto',
          position: 'relative',
          objectFit: 'contain',
          maxWidth: defaultImageWidth,
          maxHeight: defaultImageHeight
        }}
        width={defaultImageWidth}
        height={defaultImageHeight}
      />
    </div>
  );
};

export default InteractiveImage;