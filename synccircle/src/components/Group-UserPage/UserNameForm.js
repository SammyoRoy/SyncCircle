import React, { useState } from "react";
import JoinButton from "./JoinButton";
import UserTitle from "./UserTitle";

function UserNameForm() {
  const [userName, setUserName] = useState("");

  return (
    <div className="UserNameContainer">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping"><UserTitle /></span>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setUserName(e.target.value)}>
        </input>
      </div>
      <JoinButton userName={userName} />
    </div>
  )
}

export default UserNameForm;