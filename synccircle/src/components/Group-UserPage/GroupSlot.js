import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GroupSlot({ matrixKey, days, groupId, userId }){
  const [color, setColor] = useState("#F7F7F7");
  const [numAvail, setNumAvail] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0)
  const cols = days.length;
  
  const row = Math.floor(matrixKey/(cols+1));
  const col = matrixKey - (row *(cols+1)) - 1;
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await axios.post(
          `http://localhost:4000/slot?group=${groupId}=${row}=${col}`
        );
        setNumAvail(parseInt(response1.data));
  
        const response2 = await axios.post(
          `http://localhost:4000/numMem?group=${groupId}`
        );
        setTotalMembers(parseInt(response2.data));
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, [groupId, row, col]);
  
    
  useEffect(() => {
    setColorByRatio();
  }, [numAvail, totalMembers]);
  
  function setColorByRatio() {
    const ratio = numAvail / totalMembers;
    console.log(ratio);
  
    if (ratio == 1) {
      setColor(`#058ED9`);
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
    }
  }
  
  
  return (
    <button className="Slot" style={{backgroundColor: color}} type="button" >{numAvail}</button>
  )
  }
  

export default GroupSlot;