import React, { useState } from 'react';
import axios from 'axios';

function Slot({ matrixKey, days, groupId, userId }){
  const [isSelected, setSelected] = useState(false);
  const [style, setStyle] = useState("UnselectedSlot");
  const cols = days.length;

  const row = Math.floor(matrixKey/(cols+1));
  const col = matrixKey - (row *(cols+1)) - 1;

  const handlePress = async (e) => {
    if (isSelected) {
      setSelected(false);
      setStyle("UnselectedSlot");
      const response = await axios.post(`http://localhost:4000/unbook?user=${userId}=group=${groupId}=${row}=${col}`);
      console.log(response);

    } else {
      setSelected(true);
      setStyle("SelectedSlot");
  
      const response = await axios.post(`http://localhost:4000/book?user=${userId}=group=${groupId}=${row}=${col}`);
      console.log(response);
    }
  };
  

  return (
    <button className={style} onClick={handlePress} type="button" ></button>
  )
}
  
export default Slot;
