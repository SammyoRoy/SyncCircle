import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function GroupSlot({totalMembers, modifiedKey, isBooked, matrixKey, days, setPopupMatrixKey, setPopupColor, cellValue }) {
  const { userSlot } = useContext(AppContext);
  const { groupId } = useContext(AppContext);
  const [color, setColor] = useState("#F7F7F7");
  const [numAvail, setNumAvail] = useState(0);
  const [showMembers, setShowMembers] = useState(false);
  const [content, setContent] = useState("");
  const cols = days.length;
  //const [totalMembers, setTotalMembers] = useState(0);

  const row = Math.floor(matrixKey / (cols + 1));
  const col = matrixKey - (row * (cols + 1)) - 1;


  /* useEffect(() => {
    async function fetchData() {
      if (groupId !== "") {
        setNumAvail(cellValue.length);
      }
    }

    fetchData();
  }, [userSlot, groupId, row, col]  ); */

  /*useEffect(() => {
    if (groupId !== "") {
      async function fetchData() {
        const response = await axios.get(
          `http://localhost:4000/groups/nummem/${groupId}`
        );
        const totalMembersValue = parseInt(response.data);
        setTotalMembers(totalMembersValue);
      }
      fetchData();
    
      console.log("Getting total mems");
    }

  }, [userSlot]);*/

  //Initialize the Slot
  useEffect(() => {
    setNumAvail(cellValue);
  }, [cellValue])


  function setColorByRatio() {
    const ratio = numAvail / totalMembers;
    console.log("Ratio " + ratio);

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

  useEffect(() => {
    if (modifiedKey === matrixKey){
      setNumAvail((prevNumAvail) => {
        if (isBooked) {
          console.log("Row "+row +" Col " + col+ "Num avail "+ numAvail);
          return prevNumAvail + 1;
        } else {
          console.log("Row "+row +" Col " + col+ "Num avail "+ numAvail);
          return prevNumAvail - 1;
        }
      });

      console.log("Total members: " +totalMembers);
    }
  }, [modifiedKey, isBooked]);

  useEffect(() => {
    setColorByRatio();
  },[numAvail, totalMembers]);

  return (
    <>
      <button className="Slot" style={{ backgroundColor: color }} type="button" onClick={() => {
        setPopupMatrixKey(matrixKey)
        setPopupColor(color)
      }} data-toggle="modal" data-target="#groupModal">
        {numAvail} / {totalMembers}
      </button>
    </>
  )
}

export default GroupSlot;
