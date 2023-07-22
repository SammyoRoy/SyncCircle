import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import './UserPageOverhaul.css';
import HeaderCard from "./HeaderCard";
import Calendar from "./Calander";
import GroupPageButton from "./GroupPageButton";
import UserTitle from "./UserTitle";

function UserPage() {

  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const [userSlot, setUserSlot] = useState(null);

  useEffect(() => {
    setGroupId(window.location.pathname.split("/").pop());
  }, [groupId])

  return (
    <div className="UserScreenBackground">
      <AppContext.Provider value={{ groupId, setGroupId, userId, setUserId, userSlot, setUserSlot }}>
        <UserTitle />
        <HeaderCard/>
        <Calendar />
      </AppContext.Provider>
    </div>
  )
}

export default UserPage;