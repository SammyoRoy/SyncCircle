import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function Slot({ matrixKey, days, dragging, swiping, touchPosition, cellValue, socket}) {
  const { setUserSlot, setSlotTried, userArray, setUserArray, setStopped } = useContext(AppContext);
  const { groupId, userId } = useContext(AppContext);
  const [isSelected, setSelected] = useState(false);
  const [style, setStyle] = useState("UnselectedSlot");
  const [isModifed, setIsModified] = useState(false);
  const buttonRef = useRef(null);
  const cols = days.length;

  const row = Math.floor(matrixKey / (cols + 1));
  const col = matrixKey - (row * (cols + 1)) - 1;

  const replaceValueAt = (row, col, value) => {
    // Make a shallow copy of the userArray
    const newArray = [...userArray];

    // Make a shallow copy of the specific row you're modifying
    newArray[row] = [...newArray[row]];

    // Replace the value at the specified row and column
    newArray[row][col] = value;

    // Call the setter function to update the state
    setUserArray(newArray);
  };



  //Initialize
  useEffect(() => {
    if (userId != "") {
      if (cellValue == 0) {
        setStyle("UnselectedSlot");
        setSelected(false);
      }
      else if (cellValue == 1) {
        setStyle("SelectedSlot");
        setSelected(true);
      }
    }
  }, [userId, cellValue]);

  useEffect(() => {
    if (swiping && touchPosition) {
      handleSwipe();
    }
  }, [touchPosition, swiping]);

  useEffect(() => {
    if (!swiping) {
      setIsModified(false);
    }
  }, [swiping]);

  const handleSwipe = async () => {
    if (swiping === true && buttonRef.current && !isModifed) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      if (
        touchPosition.x >= buttonRect.left &&
        touchPosition.x <= buttonRect.right &&
        touchPosition.y >= buttonRect.top &&
        touchPosition.y <= buttonRect.bottom
      ) {
        setIsModified(true); // Mark this slot as modified
        setSelected(!isSelected);
        setStyle(isSelected ? "UnselectedSlot" : "SelectedSlot");
        replaceValueAt(row, col, isSelected ? 0 : 1);
      }
    }
  };

  const handleTouch = (e) => {
    // If swiping is active and this slot has not been modified during this swipe
    if (swiping && !isModifed) {
      const touch = e.touches[0] || e.changedTouches[0];
      const touchX = touch.clientX;
      const touchY = touch.clientY;
      const buttonRect = buttonRef.current.getBoundingClientRect();

      // Check if the touch is within this slot's boundaries
      if (
        touchX >= buttonRect.left &&
        touchX <= buttonRect.right &&
        touchY >= buttonRect.top &&
        touchY <= buttonRect.bottom
      ) {
        // Toggle the slot's state
        setSelected(!isSelected);
        setStyle(isSelected ? "UnselectedSlot" : "SelectedSlot");
        replaceValueAt(row, col, isSelected ? 0 : 1);
        setIsModified(true);
      }
    }
  };



  const handleTouchEnd = async (e) => {
    setIsModified(false);
    setStopped(true);
  }


  const handleEnter = async (e) => {
    if (dragging === false && swiping === false) {
      return;
    }
    if (userId === "") {
      setSlotTried(true);
      return;
    }
    setSlotTried(false);

    if (isSelected) {
      setSelected(false);
      setStyle("UnselectedSlot");
      replaceValueAt(row, col, 0);

    } else {
      setSelected(true);
      setStyle("SelectedSlot");

      replaceValueAt(row, col, 1);
    }
  };

  const handlePress = async (e) => {
    if (userId === "") {
      setSlotTried(true);
      return;
    }
    setSlotTried(false);
    if (isSelected) {
      setSelected(false);
      setStyle("UnselectedSlot");

      socket.emit('unbooked', matrixKey);
      replaceValueAt(row, col, 0);
      setUserSlot(Math.random());

    } else {
      setSelected(true);
      setStyle("SelectedSlot");

      socket.emit('booked', matrixKey);
      console.log(matrixKey);
      replaceValueAt(row, col, 1);
      setUserSlot(Math.random());
    }
  };


  return (
    <button
      ref={buttonRef}
      className={style}
      onMouseDown={handlePress}
      onMouseEnter={handleEnter}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouchEnd}
      type="button"
    ></button>
  )
}

export default Slot;
