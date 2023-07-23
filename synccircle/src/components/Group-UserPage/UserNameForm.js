import React, { useContext, useEffect, useState } from "react";
import JoinButton from "./JoinButton";
import UserTitle from "./UserTitle";
import GroupPageButtonCircle from "./GroupPageButtonCircle";

function UserNameForm() {
  const [userName, setUserName] = useState("");
  const [hasJoined, setJoined] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div className="UserNameContainer">
      <GroupPageButtonCircle joined={hasJoined}/>
        <input type="text" className="UserNameForm" placeholder="Enter username"  onChange={(e) => setUserName(e.target.value)} disabled={isSubmitted}>
        </input>
      <JoinButton userName={userName} updateJoined={setJoined} updateSubmitted={setSubmitted}/>
    </div>
  )
}

export default UserNameForm;