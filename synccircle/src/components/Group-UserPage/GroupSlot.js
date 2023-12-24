import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function GroupSlot({ totalMembers, modifiedRow, modifiedCol, modifiedArr, setModifiedArr, isBooked, matrixKey, days, setPopupMatrixKey, setPopupColor, setGroupSlotClicked, cellValue, setNumAvailArr, numAvailArr }) {
  const { userSlot } = useContext(AppContext);
  const { groupId, MAX_COLUMNS_DISPLAYED, startColumn } = useContext(AppContext);
  const [color, setColor] = useState("#F7F7F7");
  const [numAvail, setNumAvail] = useState(0);
  const [showMembers, setShowMembers] = useState(false);
  const [content, setContent] = useState("");
  const cols = Math.min(days.length, MAX_COLUMNS_DISPLAYED);
  console.log("Cols:" + cols);

  const row = Math.floor(matrixKey / (cols + 1));
  const col = matrixKey - (row * (cols + 1)) - 1 + startColumn;

  const replaceValueAt = (row, col, value) => {
    if (Array.isArray(numAvailArr) && numAvailArr[row] && Array.isArray(numAvailArr[row])) {
      const newArray = [...numAvailArr];
      newArray[row] = [...numAvailArr[row]];
      newArray[row][col] = value;
      console.log(newArray);

      setNumAvailArr(newArray);
    }
  };

  //Initialize the Slot
  useEffect(() => {
    setNumAvail(cellValue);
  }, [cellValue])


  function setColorByRatio() {
    const ratio = numAvail / totalMembers;

    if (ratio == 1) {
      setColor(`#3943f7`);
    } else if (ratio >= 0.9) {
      setColor(`#17881C`);
    } else if (ratio >= 0.8) {
      setColor(`#3FB444`);
    } else if (ratio >= 0.7) {
      setColor(`#81DE84`);
    } else if (ratio >= 0.6) {
      setColor(`#A39E3D`);
    } else if (ratio >= 0.5) {
      setColor(`#D2CD67`);
    } else if (ratio >= 0.4) {
      setColor(`#E5E296`);
    } else if (ratio >= 0.3) {
      setColor(`#984A45`);
    } else if (ratio >= 0.2) {
      setColor(`#C65E58`);
    } else if (ratio >= 0.1) {
      setColor(`#F4A19C`);
    } else if (ratio >= 0) {
      setColor(`#F7F7F7`);
    }
  }
useEffect(() =>{
  if (Array.isArray(modifiedArr) && modifiedArr.length !== 0) {
    const locate = (row, col) => {
      for (let i = 0; i < modifiedArr.length; i++) {
        if (modifiedArr[i][0] === row && modifiedArr[i][1] === col) {
          return i;
        }
      }
      return -1;
    };
  
    const index = locate(row, col);  // Use the locate function directly
    if (index !== -1) {  // Use strict inequality
      console.log("Modified: " + row + "," + col);
      
      setNumAvail((prevNumAvail) => {
        const newNumAvail = modifiedArr[index][2] ? prevNumAvail + 1 : prevNumAvail - 1;
        replaceValueAt(row, col, newNumAvail);
        
        // Remove the item from modifiedArr without mutating the original state
        const newModifiedArr = modifiedArr.filter((_, i) => i !== index);
        setModifiedArr(newModifiedArr);
        
        return newNumAvail;
      });
    }
  }
},[modifiedArr])
  
  

  useEffect(() => {
    setColorByRatio();
  }, [numAvail, totalMembers, startColumn]);

  return (
    <>
      <button className="Slot" style={{ backgroundColor: color }} type="button" onClick={() => {
        setPopupMatrixKey(matrixKey)
        setPopupColor(color)
        setGroupSlotClicked(Math.random)
      }} data-toggle="modal" data-target="#groupModal">
        <div className={days.length >= 6? "SmallerContent": null}>
          {numAvail !== 0? numAvail: null}
        </div>
      {row},{col}</button>
    </>
  )
}

export default GroupSlot;
