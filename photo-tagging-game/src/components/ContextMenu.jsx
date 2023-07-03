import React, { useState, useEffect } from 'react';

const ContextMenu = ({ itemNames, onOptionSelect, position,isVisible }) => {
  const menuStyle = {
    // display: isVisible ? 'block' : 'none',
    position: 'absolute',
    top: position.y,
    left: position.x,
    padding: '8px',
    background: '#fff',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    zIndex: 9999,
  };

  const listItemStyle = {
    listStyle: 'none',
    margin: '4px 0',
    cursor: 'pointer',
  };

  const listItemHoverStyle = {
    backgroundColor: '#f2f2f2',
  };

  return (
    /**I could update this element to use a dialoge element and use the show dialoge option instead of show modal */
    /**
     * could also display icons of the character your suppose to find
     */
    <div id="contextMenu" style={menuStyle}>
      <ul>
        {itemNames.map((item, index) => (
          <li key={index}
              // onClick={() => onOptionSelect(item)}
              onClick={(event) => {
                event.preventDefault(); // Prevent the default behavior or else the page scroll will jump to the top after each item found
                onOptionSelect(item); // Call the onOptionSelect function with the item
              }}
              style={{ ...listItemStyle, ...listItemHoverStyle }}
          >
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContextMenu;