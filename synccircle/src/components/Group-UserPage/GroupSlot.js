/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GroupSlot({ matrixKey, days, groupId, userId }){
    const [isSelected, setSelected] = useState(false);
    const [style, setStyle] = useState("UnselectedSlot");
    const [color, setColor] = useState("F7F7F7");
    const [numAvail, setNumAvail] = useState(0);
    const [totalMembers, setTotalMembers] = useState(0)
    const cols = days.length;
    
    const row = Math.floor(matrixKey/(cols+1));
    const col = matrixKey - (row *(cols+1)) - 1;

      useEffect(() => {
        
        async function initialize(){
          await axios.post(`http://localhost:4000/slot?group=${groupId}=${row}=${col}`)
          .then((response) => {
              // navigate to /group pages
              setNumAvail(parseInt(response.data));
          })
          .catch((error) => {
              // handle the error
              console.error(error);
          });
      
          await axios.post(`http://localhost:4000/numMem?group=${groupId}`)
            .then((response) => {
              setTotalMembers(parseInt(response.data));
            })
        }
    });

    function colorSet() {
        const ratio = numAvail/totalMembers;
        console.log("Hello");
        
        if (ratio == 1){
          setColor("058ED9");
        }
        else if (ratio >= .9){
          setColor("17881C");
        }
        else if (ratio >= .8){
          setColor("3FB444");
        }
        else if (ratio >= .7){
          setColor("81DE84");
        }
        else if (ratio >= .6){
          setColor("A39E3D");
        }
        else if (ratio >= .5){
          setColor("D2CD67");
        }
    
        else if (ratio >= .4){
          setColor("E5E296");
        }
        else if (ratio >= .3){
          setColor("984A45");
        }
        else if (ratio >= .2){
          setColor("C65E58");
        }
        else if (ratio >= .1){
          setColor("F4A19C");
        }
      }
      initialize();
      colorSet();
      [numAvail, totalMembers, color];

    return (
      <button className="Slot" style={{backgroundColor: color}} type="button" >{numAvail}</button>
    )
}

export default GroupSlot;*/