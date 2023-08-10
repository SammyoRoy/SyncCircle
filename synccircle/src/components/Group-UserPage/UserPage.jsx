import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import './UserPageOverhaul.css';
import HeaderCard from "./HeaderCard";
import Calendar from "./Calander";
import GroupPageButton from "./GroupPageButton";

import UserTitle from "./UserTitle";

function UserPage() {

  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const [userSlot, setUserSlot] = useState(null);
  const [joinPressed, setJoinPressed] = useState(false);
  const [slotTried, setSlotTried] = useState(false);

  useEffect(() => {
    const groupIdFromUrl = window.location.pathname.split("/").pop();
    if (groupIdFromUrl !== ""){
      setGroupId(groupIdFromUrl);
    }
  }, []); // Empty dependency array to run only once
  

  return (
    <div className="UserBase">
      <div className="UserScreenBackground">
        <AppContext.Provider value={{ groupId, setGroupId, userId, setUserId, userSlot, setUserSlot, slotTried, setSlotTried }}>
          <UserTitle />
          <HeaderCard/>
          <Calendar />
        </AppContext.Provider>
      </div>
    </div>

  )
}

export default UserPage;