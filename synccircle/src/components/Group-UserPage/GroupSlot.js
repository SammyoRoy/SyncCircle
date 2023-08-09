import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function GroupSlot({ matrixKey, days, setPopupMatrixKey, setPopupColor}) {
  const { userSlot } = useContext(AppContext);
  const { groupId } = useContext(AppContext);
  const [color, setColor] = useState("#F7F7F7");
  const [numAvail, setNumAvail] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [showMembers, setShowMembers] = useState(false);
  const [content, setContent] = useState("");
  const cols = days.length;

  const row = Math.floor(matrixKey / (cols + 1));
  const col = matrixKey - (row * (cols + 1)) - 1;

  const timeOptions = [
    '6:00 AM', //06:00 -> 0
    '7:00 AM', //07:00 -> 1
    '8:00 AM', //08:00 -> 2
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM', //12:00 -> 6
    '1:00 PM', // 13:00 -> 7
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM', //23:00 -> 17
    '12:00 AM', //00:00 -> 18
    '1:00 AM',  //01:00 -> 19
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM', //05:00 -> 23
    '6:00 AM'
];

  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await axios.post(
          `https://backend.synccircle.net:4000/slot?group=${groupId}=${row}=${col}`
        );
        setNumAvail(parseInt(response1.data));

        const response2 = await axios.post(
          `https://backend.synccircle.net:4000/numMem?group=${groupId}`
        );
        setTotalMembers(parseInt(response2.data));
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userSlot]);


  useEffect(() => {
    setColorByRatio();
  }, [numAvail, totalMembers]);

  function setColorByRatio() {
    const ratio = numAvail / totalMembers;
    console.log(ratio);

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

  const handleOver = async () => {
    const response = await axios.get(`https://backend.synccircle.net:4000/display?slot=group=${groupId}=${row}=${col}`);
    if (response.data.length != 0) {
      setShowMembers(!showMembers);
    }
    return (
      setContent(response.data.toString().slice(1, -1))
    )
  };


  return (
    <>
      <button className="Slot" style={{ backgroundColor: color }} type="button" onClick={() => {
        setPopupMatrixKey(matrixKey)
        setPopupColor(color)}} data-toggle="modal" data-target="#groupModal">
        {numAvail}
      </button>
    </>


  )
}

export default GroupSlot;


