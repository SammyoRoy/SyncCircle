import React, {useContext, useState} from 'react';
import { AppContext } from './AppContext';
import axios from 'axios';
import GroupPageButton from './GroupPageButton';

function JoinButton({ userName, updateJoined}){
  const {groupId, setUserId, userId} = useContext(AppContext);
  const [show, setShow] = useState(true);

  console.log(groupId);
  console.log(userName);

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:4000/create?user=${groupId}=${userName}`)
      .then((response) => {
        setUserId(response.data);
        console.log(response.data);
      });
    setShow(false);
    updateJoined(true);

  }
  return (
    <div className="UserButtonContainer">
    {show ? (
      <button type="submit" className="JoinButton" onClick={onSubmit}>Join</button>
    ): <GroupPageButton groupId={groupId} userId={userId} />}
    </div>
  );
}

export default JoinButton;