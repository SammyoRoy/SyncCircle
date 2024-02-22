import React, { useState, useContext, useEffect } from "react";
import JoinButton from "./JoinButton";
import UserTitle from "./UserTitle";
import GroupPageButtonCircle from "./GroupPageButtonCircle";
import { AppContext } from "../../context/AppContext";
import { useCookies } from "react-cookie";
import { IndexContext } from "../../context/IndexContext";

function UserNameForm() {
  const { slotTried, setSlotTried, userName, setUserName, isEmptyInput, setEmptyInput, groupId } = useContext(AppContext);
  const { googleUser } = useContext(IndexContext);
  const [hasJoined, setJoined] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([`username_${groupId}`]);

  useEffect(() => {
    const groupCookieKey = `username_${groupId}`;
    if (cookies[groupCookieKey]) {
      setUserName(cookies[groupCookieKey]);
    }
  }, [groupId, cookies, setUserName]);


  const onChange = (e) => {
    setUserName(e.target.value);
    setCookie(`username_${groupId}`, e.target.value, { path: '/' });
  }

  useEffect(() => {
    if (googleUser !== null && googleUser.displayName !== undefined && groupId !== "") {
      if (googleUser.displayName.length < 30 && googleUser.displayName.length > 0) {
        setUserName(googleUser.displayName);
        setCookie(`username_${groupId}`, googleUser.displayName, { path: '/' });
      }
    }
  }, [googleUser, groupId]);


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
        className={`UserNameForm`}
        placeholder="Username"
        value={userName}
        onChange={(e) => onChange(e)}
        disabled={isSubmitted || googleUser !== null}
      />
      <JoinButton
        userName={userName}
        updateJoined={setJoined}
        updateSubmitted={setSubmitted}
        setEmptyInput={setEmptyInput}
        shouldVibrate={hasJoined}
      />
    </div>
  );
}

export default UserNameForm;
