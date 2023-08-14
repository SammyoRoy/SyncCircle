import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

function Slot({ matrixKey, days, dragging, swiping, touchPosition, cellValue , socket}) {
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
    const newArray = [...userArray];
    newArray[row] = [...newArray[row]];
    newArray[row][col] = value;

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
        if (isSelected) {
          socket.emit('unbooked', matrixKey);
        }
        else{
          socket.emit('booked', matrixKey);
        }
      }
    }
  };

  const handleTouch = (e) => {
    if (swiping && !isModifed) {
      const touch = e.touches[0] || e.changedTouches[0];
      const touchX = touch.clientX;
      const touchY = touch.clientY;
      const buttonRect = buttonRef.current.getBoundingClientRect();

      if (
        touchX >= buttonRect.left &&
        touchX <= buttonRect.right &&
        touchY >= buttonRect.top &&
        touchY <= buttonRect.bottom
      ) {
        setSelected(!isSelected);
        setStyle(isSelected ? "UnselectedSlot" : "SelectedSlot");
        replaceValueAt(row, col, isSelected ? 0 : 1);
        if (isSelected) {
          socket.emit('unbooked', matrixKey);
        }
        else{
          socket.emit('booked', matrixKey);
        }
        setIsModified(true);
      }
    }
  };

  useEffect(() => {
    const button = buttonRef.current;

    const handleTouchMove = (e) => {
      handleTouch(e);
      e.preventDefault();
    };

    button.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      button.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleTouch]);



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
      socket.emit('unbooked', matrixKey);

    } else {
      setSelected(true);
      setStyle("SelectedSlot");

      replaceValueAt(row, col, 1);
      socket.emit('booked', matrixKey);
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
      socket.emit('unbooked', matrixKey);
      setUserSlot(Math.random());

    } else {
      setSelected(true);
      setStyle("SelectedSlot");
      replaceValueAt(row, col, 1);
      socket.emit('booked', matrixKey);
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
