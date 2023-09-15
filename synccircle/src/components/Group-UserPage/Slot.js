import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

function Slot({ matrixKey, days, dragging, swiping, touchPosition, cellValue, socket, initialCellValue }) {
  const { setUserSlot, setSlotTried, userArray, setUserArray, setStopped, dragValue, setDragValue } = useContext(AppContext);
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
        setIsModified(true);
        setSelected(dragValue === 1);
        setStyle(dragValue === 1 ? "SelectedSlot" : "UnselectedSlot");
        replaceValueAt(row, col, dragValue);

        if (dragValue === 1) {
          socket.emit('booked', matrixKey, groupId);
        } else {
          socket.emit('unbooked', matrixKey, groupId);
        }
      }
    }
  };

  const handleTouch = (e) => {
    if (!isModifed && swiping) {
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
        const newDragValue = cellValue === 1 ? 0 : 1;
        setDragValue(newDragValue);
        setSelected(newDragValue === 1);
        setStyle(newDragValue === 1 ? "SelectedSlot" : "UnselectedSlot");
        replaceValueAt(row, col, newDragValue);
        setIsModified(true);
  
        if (newDragValue === 1) {
          socket.emit('booked', matrixKey, groupId);
        } else {
          socket.emit('unbooked', matrixKey, groupId);
        }
      }
    }
  };
  
  




  const handleTouchEnd = async (e) => {
    setIsModified(false);
    setStopped(true);
  }

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


  const handleEnter = async (e) => {
    if (dragging === false && swiping === false) {
      return;
    }
    if (userId === "") {
      setSlotTried(true);
      return;
    }
    setSlotTried(false);
  
    setSelected(dragValue === 1);
    setStyle(dragValue === 1 ? "SelectedSlot" : "UnselectedSlot");
    replaceValueAt(row, col, dragValue);
  
    if (dragValue === 1) {
      socket.emit('booked', matrixKey, groupId);
    } else {
      socket.emit('unbooked', matrixKey, groupId);
    }
  };

  const handlePress = async (e) => {
    if (userId === "") {
      setSlotTried(true);
      return;
    }
    setSlotTried(false);
    setDragValue(cellValue === 1 ? 0 : 1);
    if (isSelected) {
      setSelected(false);
      setStyle("UnselectedSlot");
      socket.emit('unbooked', matrixKey, groupId);
      replaceValueAt(row, col, 0);
      setUserSlot(Math.random());

    } else {
      setSelected(true);
      setStyle("SelectedSlot");
      socket.emit('booked', matrixKey, groupId);
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
