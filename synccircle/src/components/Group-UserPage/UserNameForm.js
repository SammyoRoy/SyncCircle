import React, { useContext, useEffect, useState } from "react";
import JoinButton from "./JoinButton";
import UserTitle from "./UserTitle";
import { AppContext } from "./AppContext";

function UserNameForm() {
  const [userName, setUserName] = useState("");
  const {joinPressed, groupId} = useContext(AppContext);

  return (
    <div className="UserNameContainer">
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping"><UserTitle /></span>
        <input type="text" className="form-control" placeholder="New User..." aria-label="Username" aria-describedby="addon-wrapping" required onChange={(e) => setUserName(e.target.value) } disabled={joinPressed}/>
      </div>
      <JoinButton userName={userName} />
    </div>
  )
}

export default UserNameForm;