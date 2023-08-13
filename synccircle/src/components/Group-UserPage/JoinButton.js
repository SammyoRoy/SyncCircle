import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import GroupPageButton from './GroupPageButton';
import io from 'socket.io-client';

function JoinButton({ userName, updateJoined, updateSubmitted, setEmptyInput }) {
  const { groupId, setUserId, userId } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([]);

  const [joinSocket, setJoinSocket] = useState(null);

  useEffect( () => {
      const socket = io('http://localhost:4000', { transports : ['websocket'] });
      setJoinSocket(socket);
  }, []);


  useEffect(() => {
    if (groupId !== "") {
      axios.get(`http://localhost:4000/groups/${groupId}`).then((response) => {
        setStartTime(response.data.start_time);
        setEndTime(response.data.end_time);
        setDays(response.data.days);
      });
    }
  }, [groupId]);


  const onSubmit = (event) => {
    event.preventDefault();
    if (userName !== "" && groupId !== "" && days !== [] && startTime !== "" && endTime !== "") {
      axios.get(`http://localhost:4000/groups/findmem/${groupId}`, { params: { userName: userName } })
        .then((response) => {
          if (response.data === "False") {
            //Make new User
            axios.post(`http://localhost:4000/users/${groupId}`, { name: userName, startTime: startTime, endTime: endTime, days: days })
              .then((response2) => {
                setUserId(response2.data.user_id);
              });
            setShow(false);
            updateJoined(true);
            updateSubmitted(true);
            joinSocket.emit('new user');
            console.log("New user sent");
          }
          else {
            setUserId(response.data);
            setShow(false);
            updateJoined(true);
            updateSubmitted(true);
          }
        });
    } else {
      setEmptyInput(true);
    }

  }
  return (
    <div className="UserButtonContainer">
      {show ? (
        <button type="submit" className={groupId !== ""? "JoinButton": "JoinButton disabled"} onClick={onSubmit} disabled={groupId===""}>Join</button>
      ) : <GroupPageButton groupId={groupId} userId={userId} />}
    </div>
  );
}

export default JoinButton;