import React, { useState } from "react";
import JoinButton from "./JoinButton";
import UserTitle from "./UserTitle";

function UserNameForm() {
  const [userName, setUserName] = useState("");

  return (
    <div className="UserNameContainer">
        <input type="text" className="UserNameForm" placeholder="Enter username"  onChange={(e) => setUserName(e.target.value)}>
        </input>
      <JoinButton userName={userName} />
    </div>
  )
}

export default UserNameForm;