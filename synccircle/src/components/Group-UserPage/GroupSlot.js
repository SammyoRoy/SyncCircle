import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function GroupSlot({ numAvailArr, totalMembers, modifiedRow, modifiedCol, isBooked, matrixKey, days, setPopupMatrixKey, setPopupColor, setGroupSlotClicked, cellValue  }) {
  const { userSlot } = useContext(AppContext);
  const { groupId, MAX_COLUMNS_DISPLAYED, startColumn } = useContext(AppContext);
  const [color, setColor] = useState("#F7F7F7");
  const [numAvail, setNumAvail] = useState(0);
  const [showMembers, setShowMembers] = useState(false);
  const [content, setContent] = useState("");
  const cols = Math.min(days.length, MAX_COLUMNS_DISPLAYED);
 // console.log("Cols:" + cols);

  const row = Math.floor(matrixKey / (cols + 1));
  const col = matrixKey - (row * (cols + 1)) - 1 + startColumn;

  //Initialize the Slot
  useEffect(() => {
    setNumAvail(cellValue);
  }, [cellValue])


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
      <button className="Slot" style={{ backgroundColor: color }} type="button" onClick={() => {
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