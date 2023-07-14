import React from 'react';
import axios from 'axios';

function JoinButton({ groupId, userName, setUserId }){
  
    console.log(groupId);
  
    const onSubmit = (event) => {
      console.log(userName);
      event.preventDefault();
      axios.post(`http://localhost:4000/create?user=${groupId}=${userName}`)
        .then((response) => {
          setUserId(response.data);
          console.log(response.data);
        });
  
    }
    return (
      <button type="submit" className="JoinButton" onClick={onSubmit}>Join</button>
    )
  }

export default JoinButton;