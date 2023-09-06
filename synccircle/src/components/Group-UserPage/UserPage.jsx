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
  const [userSlot, setUserSlot] = useState("");
  const [slotTried, setSlotTried] = useState(false);
  const [userArray, setUserArray] = useState([]);
  const [stopped, setStopped] = useState(false);
  const [first, setFirst] = useState(false);
  const [groupAdminClicked, setGroupAdminClicked] = useState(false);
  const [initialCellValue, setInitialCellValue] = useState(false);

  useEffect(() => {
    const groupIdFromUrl = window.location.pathname.split("/").pop();
    if (groupIdFromUrl !== ""){
      setGroupId(groupIdFromUrl);
    }
  }, []); // Empty dependency array to run only once
  

  return (
    <div className="UserBase">
      <div className="UserScreenBackground">
        <AppContext.Provider value={{ groupId, setGroupId, userId, setUserId, userSlot, setUserSlot, slotTried, setSlotTried, userArray, setUserArray, stopped, setStopped, first, setFirst, groupAdminClicked, setGroupAdminClicked, initialCellValue, setInitialCellValue}}>
          <UserTitle />
          <HeaderCard/>
          <Calendar />
        </AppContext.Provider>
      </div>
    </div>

  )
}

export default UserPage;