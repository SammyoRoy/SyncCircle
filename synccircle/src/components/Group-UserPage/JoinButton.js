import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import GroupPageButton from './GroupPageButton';
import io from 'socket.io-client';

function JoinButton({ userName, updateJoined, updateSubmitted, setEmptyInput }) {
  const { groupId, setUserId, userId, setFirst, setUsers, users } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([]);

  const [joinSocket, setJoinSocket] = useState(null);

  useEffect( () => {
      const socket = io(`https://backend.synccircle.net`, { transports : ['websocket'] });
      setJoinSocket(socket);
  }, []);


  useEffect(() => {
    if (groupId !== "") {
      axios.get(`https://backend.synccircle.net/groups/${groupId}`).then((response) => {
        setStartTime(response.data.start_time);
        setEndTime(response.data.end_time);
        setDays(response.data.days);
      });
    }
  }, [groupId]);


  const onSubmit = (event) => {
    event.preventDefault();
    if (userName !== "" && groupId !== "" && days !== [] && startTime !== "" && endTime !== "") {
      axios.get(`https://backend.synccircle.net/groups/findmem/${groupId}`, { params: { userName: userName } })
        .then((response) => {
          if (response.data === "False") {
            //Make new User
            axios.post(`https://backend.synccircle.net/users/${groupId}`, { name: userName, startTime: startTime, endTime: endTime, days: days })
              .then((response2) => {
                console.log(response2.data)
                setUserId(response2.data.user_id);
                if(response2.data.users[0].user_id === response2.data.user_id){
                  setFirst(true);
                }
              });
            setShow(false);
            updateJoined(true);
            updateSubmitted(true);
            joinSocket.emit('new user', groupId);
            console.log("New user sent");
          }
          else {
            setUserId(response.data.user_id);
            if(response.data.users[0].user_id === response.data.user_id){
              setFirst(true);
            }
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