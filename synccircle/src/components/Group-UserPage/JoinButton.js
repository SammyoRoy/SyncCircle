import React, {useState} from 'react';
import axios from 'axios';

function JoinButton({ groupId, userName, setUserId }){
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

  }
  return (
    <div>
    {show ? (
      <button type="submit" className="JoinButton" onClick={onSubmit}>Join</button>
    ): (null)}
    </div>
  );
}

export default JoinButton;