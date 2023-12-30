import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import GroupPageButton from './GroupPageButton';
import io from 'socket.io-client';
import { useCookies } from 'react-cookie';

function JoinButton({updateJoined, updateSubmitted}) {
  const { groupId, setUserId, userId, setFirst, userName, setEmptyInput} = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([]);
  const [joinSocket, setJoinSocket] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;


  const [cookies, setCookie, removeCookie] = useCookies([`username_${groupId}`]);

  useEffect(() => {
    if (cookies[`username_${groupId}`] && groupId !== "" && days.length > 0 && startTime !== "" && endTime !== "") {
      autoJoin();
    }
  }, [cookies, groupId, days, startTime, endTime]);

  const autoJoin = () => {
    if (cookies[`username_${groupId}`].length > 30) {
      setEmptyInput(true);
      return;
    }
    console.log(cookies[`username_${groupId}`] );
    axios.get(`${API_URL}/groups/findmem/${groupId}`, { params: { userName: cookies[`username_${groupId}`] } })
      .then((response) => {
        if (response.data === "False") {
          //Make new User
          axios.post(`${API_URL}/users/${groupId}`, { name: cookies[`username_${groupId}`], startTime: startTime, endTime: endTime, days: days })
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
  }
  useEffect( () => {
      const socket = io(`${API_URL}`, { transports : ['websocket'] });
      setJoinSocket(socket);
  }, []);


  useEffect(() => {
    if (groupId !== "") {
      axios.get(`${API_URL}/groups/${groupId}`).then((response) => {
        setStartTime(response.data.start_time);
        setEndTime(response.data.end_time);
        setDays(response.data.days);
      });
    }
  }, [groupId]);


  const onSubmit = (event) => {
    event.preventDefault();
    if (userName !== "" && groupId !== "" && days.length !== 0 && startTime !== "" && endTime !== "") {
      if (userName.length > 20) {
        setEmptyInput(true);
        return;
      }
      axios.get(`${API_URL}/groups/findmem/${groupId}`, { params: { userName: userName } })
        .then((response) => {
          if (response.data === "False") {
            //Make new User
            axios.post(`${API_URL}/users/${groupId}`, { name: userName, startTime: startTime, endTime: endTime, days: days })
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