import React, { useEffect, useState } from "react";
import './UserPage.css';
import HeaderCard from "./HeaderCard";
import Calendar from "./Calander";

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
      {/*<GroupPageButton />*/}
    </div>
  )
}

export default UserPage;