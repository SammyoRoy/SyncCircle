import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function Slot({ matrixKey, days, dragging, swiping, touchPosition, cellValue }) {
  const { setUserSlot, setSlotTried, userArray, setUserArray, setStopped } = useContext(AppContext);
  const { groupId, userId } = useContext(AppContext);
  const [isSelected, setSelected] = useState(false);
  const [style, setStyle] = useState("UnselectedSlot");
  const [isModifed, setIsModified] = useState(false);
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

  // The useEffect hook with touchPosition as a dependency
  useEffect(() => {
    handleSwipe();
  }, [touchPosition]);

  useEffect(() => {
    if (swiping === false) {
      setIsModified(false);
    }
  }, [swiping]);

  const buttonRef = useRef(null);
  const handleSwipe = async () => {

    if (swiping === true && buttonRef.current && !isModifed) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const touchX = touchPosition.x;
      const touchY = touchPosition.y;
      replaceValueAt(row, col, isSelected ? 0 : 1);

      if (
        touchX >= buttonRect.left &&
        touchX <= buttonRect.right &&
        touchY >= buttonRect.top &&
        touchY <= buttonRect.bottom
      ) {
        if (isSelected) {
          setSelected(false);
          setStyle("UnselectedSlot");
          replaceValueAt(row, col, 0);
          setIsModified(true);
        } else {
          setSelected(true);
          setStyle("SelectedSlot");
          replaceValueAt(row, col, 1);
          setIsModified(true);
        }
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
      replaceValueAt(row, col, 0);
      setUserSlot(Math.random());

    } else {
      setSelected(true);
      setStyle("SelectedSlot");
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
      onTouchEnd={handleTouchEnd}
      type="button"
    ></button>
  )
}

export default Slot;
