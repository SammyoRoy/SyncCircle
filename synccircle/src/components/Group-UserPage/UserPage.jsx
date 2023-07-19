import React, { useEffect, useState } from "react";
import './UserPage2.css';
import HeaderCard from "./HeaderCard";
import Calendar from "./Calander";
import GroupPageButton from "./GroupPageButton";

function UserPage() {

  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setGroupId(window.location.pathname.split("/").pop());
  }, [groupId])

  return (
    <div className="LightMode">
      <div className="content">
        <HeaderCard groupId={groupId} setUserId={setUserId} />
        <div className="divider">
        <Calendar groupId={groupId} userId={userId} />
        </div>
      </div>
      <GroupPageButton groupId={groupId} userId={userId} />
    </div>
  )
}

export default UserPage;