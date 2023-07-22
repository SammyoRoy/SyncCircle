import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import './UserPage2.css';
import HeaderCard from "./HeaderCard";
import Calendar from "./Calander";
import GroupPageButton from "./GroupPageButton";

function UserPage() {

  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const [userSlot, setUserSlot] = useState(null);
  const [joinPressed, setJoinPressed] = useState(false);

  useEffect(() => {
    setGroupId(window.location.pathname.split("/").pop());
  }, [groupId])

  return (
    <div className="LightMode">
      <AppContext.Provider value={{ groupId, setGroupId, userId, setUserId, userSlot, setUserSlot, joinPressed, setJoinPressed }}>
      <div className="content">
        <HeaderCard/>
        <div className="divider">
        <Calendar />
        </div>
      </div>
      </AppContext.Provider>
    </div>
  )
}

export default UserPage;