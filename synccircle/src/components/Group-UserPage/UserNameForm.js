import React, { useContext, useEffect, useState } from "react";
import JoinButton from "./JoinButton";
import UserTitle from "./UserTitle";
import GroupPageButtonCircle from "./GroupPageButtonCircle";

function UserNameForm() {
  const [userName, setUserName] = useState("");
  const [hasJoined, setJoined] = useState(false);

  return (
    <div className="UserNameContainer">
      <GroupPageButtonCircle joined={hasJoined}/>
        <input type="text" className="UserNameForm" placeholder="Enter username"  onChange={(e) => setUserName(e.target.value)}>
        </input>
      <JoinButton userName={userName} updateJoined={setJoined} />
    </div>
  )
}

export default UserNameForm;