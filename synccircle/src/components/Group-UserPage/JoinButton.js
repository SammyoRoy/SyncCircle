import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import GroupPageButton from './GroupPageButton';
import Cookies from 'universal-cookie';

function JoinButton({ userName, updateJoined, updateSubmitted }) {
  const { groupId, setUserId, userId } = useContext(AppContext);
  const [show, setShow] = useState(true);


  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:4000/findMem?group=${groupId}=${userName}`)
      .then((response) => {
        if (response.data === "False") {
          console.log("Make new User")
          //Make new User
          axios.post(`http://localhost:4000/create?user=${groupId}=${userName}`)
            .then((response2) => {
              setUserId(response2.data);
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