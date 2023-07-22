import React, {useContext, useState} from 'react';
import { AppContext } from './AppContext';
import axios from 'axios';
import GroupPageButton from './GroupPageButton';
import Cookies from 'universal-cookie';

function JoinButton({ userName}){

  const {groupId, setUserId, userId, setJoinPressed} = useContext(AppContext);  
  const [show, setShow] = useState(true);

  console.log(groupId);
  console.log(userName);

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:4000/create?user=${groupId}=${userName}`)
      .then((response) => {
        setUserId(response.data);
        setJoinPressed(true);
        console.log(response.data);
      });
    setShow(false);

  }
  return (
    <div>
    {show ? (
      <button type="submit" className="JoinButton" onClick={onSubmit}>Join</button>
    ): <GroupPageButton groupId={groupId} userId={userId} />}
    </div>
  );
}

export default JoinButton;