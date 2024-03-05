import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function GroupSlot({ numAvailArr, totalMembers, modifiedRow, modifiedCol, isBooked, matrixKey, days, setPopupMatrixKey, setPopupColor, setGroupSlotClicked, cellValue, scheduleValue, dragging, swiping, touchPosition  }) {
  const { userSlot, scheduleCheck, scheduleArray, setScheduleArray, userId } = useContext(AppContext);
  const { groupId, MAX_COLUMNS_DISPLAYED, startColumn } = useContext(AppContext);
  const [color, setColor] = useState("#F7F7F7");
  const [numAvail, setNumAvail] = useState(0);
  const [selected, setSelected] = useState(false);
  const [style, setStyle] = useState("Slot");
  const [slotTried, setSlotTried] = useState(false);
  const [dragValue, setDragValue] = useState(0);
  const [isModifed, setIsModified] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [content, setContent] = useState("");
  const buttonRef = useRef(null);

  const cols = Math.min(days.length, MAX_COLUMNS_DISPLAYED);
 // console.log("Cols:" + cols);

  const row = Math.floor(matrixKey / (cols + 1));
  const col = matrixKey - (row * (cols + 1)) - 1 + startColumn;

  //Initialize the Slot
  useEffect(() => {
    setNumAvail(cellValue);
  }, [cellValue])

  useEffect(() => {
    if (!scheduleCheck){
      setStyle("Slot");
    }
  }, [scheduleCheck])


  const replaceValueAt = (row, col, value) => {
    if (Array.isArray(scheduleArray) && scheduleCheck){
      const newArray = [...scheduleArray];
      newArray[row] = [...newArray[row]];
      newArray[row][col] = value;

      console.log("New Array: " + newArray)
      setScheduleArray(newArray);
    }
  };

  useEffect(() => {
    if (userId != "" && scheduleCheck) {
      if (scheduleValue == 0) {
        setStyle("Slot NotScheduledSlot");
        setSelected(false);
      }
      else if (scheduleValue == 1 && scheduleCheck) {
        setStyle("Slot ScheduledSlot");
        setSelected(true);
      }
    }
  }, [userId, scheduleValue]);

  useEffect(() => {
    if (swiping && touchPosition && scheduleCheck) {

      handleSwipe();
    }
  }, [touchPosition, swiping]);

  useEffect(() => {
    if (!swiping && scheduleCheck) {
      setIsModified(false);
    }
  }, [swiping]);

  const handleSwipe = async () => {
    console.log("Swiping")
    if (swiping === true && buttonRef.current && !isModifed && scheduleCheck) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      if (
        touchPosition.x >= buttonRect.left &&
        touchPosition.x <= buttonRect.right &&
        touchPosition.y >= buttonRect.top &&
        touchPosition.y <= buttonRect.bottom
      ) {
        setIsModified(true);
        setSelected(scheduleValue === 1);
        setStyle(scheduleValue === 1 ? "Slot ScheduledSlot" : "Slot NotScheduledSlot");
        replaceValueAt(row, col, scheduleValue);

      }
    }
  };

  const handleTouch = (e) => {
    if (!isModifed && swiping && scheduleCheck) {
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
        const newDragValue = scheduleValue === 1 ? 0 : 1;
        setDragValue(newDragValue);
        setSelected(newDragValue === 1);
        setStyle(newDragValue === 1 ? "Slot ScheduledSlot" : "Slot NotScheduledSlot");
        replaceValueAt(row, col, newDragValue);
        setIsModified(true);
      }
    }
  };
  
  




  const handleTouchEnd = async (e) => {
    setIsModified(false);
  }

  useEffect(() => {
    if (!scheduleCheck){
      return;
    }
    const handleTouchMove = (e) => {
      e.preventDefault();
      handleTouch(e);
    };

    const button = buttonRef.current;
    button.addEventListener('touchmove', handleTouchMove, { passive: false });
  
    return () => {
      button.removeEventListener('touchmove', handleTouchMove);
    };
    
  }, []); 


  const handleEnter = async (e) => {
    if (dragging === false && swiping === false && !scheduleCheck) {
      return;
    }

    setSelected(scheduleValue === 1);
    setStyle(scheduleValue === 1 ? "Slot ScheduledSlot" : "Slot NotScheduledSlot");
    replaceValueAt(row, col, scheduleValue);
  
  };

  const handlePress = async (e) => {
    if (!scheduleCheck) {
      return;
    }
    if (userId === "") {
      setSlotTried(true);
      return;
    }
    setSlotTried(false);
    setDragValue(scheduleValue === 1 ? 0 : 1);
    if (selected) {
      setSelected(false);
      setStyle("Slot NotScheduledSlot");
      replaceValueAt(row, col, 0);

    } else {
      setSelected(true);
      setStyle("Slot ScheduledSlot");
     // console.log(matrixKey);
      replaceValueAt(row, col, 1);
    }
  };

  const eventHandlers = {
    onMouseDown: handlePress,
    onMouseEnter: handleEnter,
    onTouchMove: handleTouch,
    onTouchEnd: handleTouchEnd
  }


  function setColorByRatio() {
    const ratio = numAvail / totalMembers;

    if (ratio == 1) {
      setColor(`#5F00CD`);
    } else if (ratio >= 0.9) {
      setColor(`#701BD1`);
    } else if (ratio >= 0.8) {
      setColor(`#8036D6`);
    } else if (ratio >= 0.7) {
      setColor(`#9151DA`);
    } else if (ratio >= 0.6) {
      setColor(`#A16CDF`);
    } else if (ratio >= 0.5) {
      setColor(`#B58BE5`);
    } else if (ratio >= 0.4) {
      setColor(`#C5A6EA`);
    } else if (ratio >= 0.3) {
      setColor(`#D6C1EE`);
    } else if (ratio >= 0.2) {
      setColor(`#E6DCF3`);
    } else if (ratio >= 0.1) {
      setColor(`#F5F4F6`);
    } else if (ratio >= 0) {
      setColor(`#F7F7F7`);
    }
  }

  /*useEffect(() => {
    console.log("Modified: " +modifiedRow+","+modifiedCol);
    console.log(row+","+col);
    if (modifiedRow === row && modifiedCol === col) {
      console.log("This is the matching slot");
      setNumAvail((prevNumAvail) => {
        if (isBooked) {
          console.log("Row " + row + " Col " + col + "Num avail " + numAvail);
          return prevNumAvail + 1;
        } else {
          console.log("Row " + row + " Col " + col + "Num avail " + numAvail);
          return prevNumAvail - 1;
        }
      });

      console.log("Total members: " + totalMembers);
    }
  }, [modifiedRow, modifiedCol, isBooked]);*/

  useEffect(() => {
    if (numAvailArr){
      setNumAvail(numAvailArr[row][col]);
    }
  }, [numAvailArr])

  useEffect(() => {
    setColorByRatio();
  }, [numAvail, totalMembers, startColumn]);

  

  return (
    <>
      <button className={style} style={{ backgroundColor: color }} type="button" ref={buttonRef} {...eventHandlers} onClick={() => {
        setPopupMatrixKey(matrixKey)
        setPopupColor(color)
        setGroupSlotClicked(Math.random)
      }} data-toggle="modal" data-target="#groupModal">
        <div className={MAX_COLUMNS_DISPLAYED >= 6? "SmallerContent": null}>
          {numAvail !== 0? numAvail: null}
        </div>

      </button>
    </>
  )
}

export default GroupSlot;