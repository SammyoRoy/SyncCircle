import React, { useState, useContext } from "react";
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

  const handleJoinButtonClick = () => {
    if (!userName.trim()) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
      setJoined(true);
      setSubmitted(true);
    }
    setTimeout(() => {
      setEmptyInput(false);
    }, 2000);
  };

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
        onJoin={handleJoinButtonClick}
      />
    </div>
  );
}

export default UserNameForm;
