import React, { useState } from "react";
import JoinButton from "./JoinButton";
import UserTitle from "./UserTitle";

function UserNameForm({ groupId, setUserId }) {
  const [userName, setUserName] = useState("");

  return (
    <div className="UserNameContainer">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping"><UserTitle groupId={groupId}/></span>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setUserName(e.target.value)}>
        </input>
      </div>
      <JoinButton groupId={groupId} userName={userName} setUserId={setUserId} />
    </div>
  )
}

export default UserNameForm;