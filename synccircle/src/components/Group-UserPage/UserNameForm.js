import React, { useState, useContext, useEffect } from "react";
import JoinButton from "./JoinButton";
import UserTitle from "./UserTitle";
import GroupPageButtonCircle from "./GroupPageButtonCircle";
import { AppContext } from "../../context/AppContext";

function UserNameForm() {
  const { slotTried, setSlotTried } = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const [hasJoined, setJoined] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEmptyInput, setEmptyInput] = useState(false);

  useEffect(() => {
    if (slotTried) {
      setTimeout(() => {
        setSlotTried(false);
      }, 2000);
    }
    if (isEmptyInput) {
      setTimeout(() => {
        setEmptyInput(false);
      }, 2000);
    }
  }, [slotTried, isEmptyInput]);

  return (
    <div className="UserNameContainer">
      <GroupPageButtonCircle joined={hasJoined} />
      <input
        type="text"
        className={`UserNameForm ${isEmptyInput || slotTried ? "is-invalid" : ""}`}
        placeholder={isEmptyInput || slotTried ? "Enter a Valid Username" : "Username"}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        disabled={isSubmitted}
      />
      <JoinButton
        userName={userName}
        updateJoined={setJoined}
        updateSubmitted={setSubmitted}
        setEmptyInput={setEmptyInput}
      />
    </div>
  );
}

export default UserNameForm;
