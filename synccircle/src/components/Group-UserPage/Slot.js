import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function Slot({ matrixKey, days, dragging, swiping, touchPosition}){
  const { setUserSlot, setSlotTried } = useContext(AppContext);
  const {groupId, userId} = useContext(AppContext);
  const [isSelected, setSelected] = useState(false);
  const [style, setStyle] = useState("UnselectedSlot");
  const [isModifed, setIsModified] = useState(false);
  const cols = days.length;

  const row = Math.floor(matrixKey/(cols+1));
  const col = matrixKey - (row *(cols+1)) - 1;
  

  //Initialize
    useEffect(() => {
      console.log("User ID: "+userId);
      if (userId != ""){
              console.log("Only now");
              axios.post(`https://backend.synccircle.net:4000/initializeSlot?group=${groupId}=${userId}=${row}=${col}`)
              .then((response) => {
                if (response.data == "0"){
                  console.log("Initial unselec");
                  setStyle("UnselectedSlot");
                  setSelected(false);
                }
                else if (response.data == "1"){
                  console.log("Select Init");
                  setStyle("SelectedSlot");
                  setSelected(true);
                }
              })
      }
    }, [userId]);

  // The useEffect hook with touchPosition as a dependency
  useEffect(() => {
    handleSwipe();
  }, [touchPosition]);

  useEffect(() => {
    if (swiping === false){
      setIsModified(false);
    }
  }, [swiping]);

  const buttonRef = useRef(null);
  const handleSwipe = async () => {

    if (swiping === true && buttonRef.current && !isModifed) { 
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const touchX = touchPosition.x;
      const touchY = touchPosition.y;
      console.log("X-coord " + touchX);
      console.log("Y-coord " + touchY);

      console.log("button LEFT: "+buttonRect.left);
      console.log("button RIGHT: "+buttonRect.right);
      console.log("button TOP: "+buttonRect.top);
      console.log("button BUTTON: "+buttonRect.bottom);
  
      if (
        touchX >= buttonRect.left &&
        touchX <= buttonRect.right &&
        touchY >= buttonRect.top &&
        touchY <= buttonRect.bottom
      ) {
        console.log("Im inside the Matrix");
        if (isSelected) {
          setSelected(false);
          setStyle("UnselectedSlot");
          const response = await axios.post(`https://backend.synccircle.net:4000/unbook?user=${userId}=group=${groupId}=${row}=${col}`);
          setUserSlot(Math.random());
          setIsModified(true);
        } else {
          setSelected(true);
          setStyle("SelectedSlot");
          const response = await axios.post(`https://backend.synccircle.net:4000/book?user=${userId}=group=${groupId}=${row}=${col}`);
          setUserSlot(Math.random());
          setIsModified(true);
        }
      }
    }
  };
  
  const handleTouchEnd = async (e) => {
    setIsModified(false);
  }

  const handleEnter = async (e) => {
    if (dragging === false && swiping === false ){
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
      const response = await axios.post(`https://backend.synccircle.net:4000/unbook?user=${userId}=group=${groupId}=${row}=${col}`);
      console.log(response);
      setUserSlot(Math.random());

    } else {
      setSelected(true);
      setStyle("SelectedSlot");
  
      const response = await axios.post(`https://backend.synccircle.net:4000/book?user=${userId}=group=${groupId}=${row}=${col}`);
      setUserSlot(Math.random());
    }
  };

  const handlePress = async(e) => {
    if (userId === "") {
      setSlotTried(true);
      return;
    }
    setSlotTried(false);
    if (isSelected) {
      setSelected(false);
      setStyle("UnselectedSlot");
      const response = await axios.post(`https://backend.synccircle.net:4000/unbook?user=${userId}=group=${groupId}=${row}=${col}`);
      setUserSlot(Math.random());

    } else {
      setSelected(true);
      setStyle("SelectedSlot");
  
      const response = await axios.post(`https://backend.synccircle.net:4000/book?user=${userId}=group=${groupId}=${row}=${col}`);
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
