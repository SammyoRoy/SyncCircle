import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import GroupPageButton from './GroupPageButton';
import Cookies from 'universal-cookie';

function JoinButton({ userName, updateJoined, updateSubmitted }) {
  const { groupId, setUserId, userId } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [startTime, setStartTime] = useState("12:00 AM");
  const [endTime, setEndTime] = useState("6:00 AM");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/groups/${groupId}`).then((response) => {
      setStartTime(response.data.start_time);
      setEndTime(response.data.end_time);
      setDays(response.data.days);
    });
    }, []);


  const onSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:4000/groups/findmem/${groupId}`, {params: {userName: userName}} )
      .then((response) => {
        if (response.data === "False") {
          console.log("Make new User")
          //Make new User
          axios.post(`http://localhost:4000/users/${groupId}`, { name: userName, startTime: startTime, endTime: endTime, days: days })
            .then((response2) => {
              setUserId(response2.data.user_id);
            });
          setShow(false);
          updateJoined(true);
          updateSubmitted(true);
        }
        else {
          console.log("Found user")
          setUserId(response.data);
          setShow(false);
          updateJoined(true);
          updateSubmitted(true);
        }
      });

  }
  return (
    <div className="UserButtonContainer">
      {show ? (
        <button type="submit" className="JoinButton" onClick={onSubmit}>Join</button>
      ) : <GroupPageButton groupId={groupId} userId={userId} />}
    </div>
  );
}

export default JoinButton;