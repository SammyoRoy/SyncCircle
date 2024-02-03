import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import './UserPageOverhaul.css';
import HeaderCard from "./HeaderCard";
import Calendar from "./Calander";
import GroupPageButton from "./GroupPageButton";
import { Alert } from "@mui/material";
import SyncCircleButton from "../SyncCircleButton";
import Tutorial from "./Tutorial";

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
  const [userName, setUserName] = useState("");
  const [isEmptyInput, setEmptyInput] = useState(false);
  const [dragValue, setDragValue] = useState(0);
  const [startColumn, setStartColumn] = useState(0);
  const [loading, setLoading] = useState(true);

  const useMaxColumnsDisplayed = () => {
    const [maxColumnsDisplayed, setMaxColumnsDisplayed] = useState(5);

    const updateMaxColumns = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        setMaxColumnsDisplayed(5);
      } else if (screenWidth < 900) {
        setMaxColumnsDisplayed(6);
      } else {
        setMaxColumnsDisplayed(7);
      }
    };

    useEffect(() => {
      // Set initial value
      updateMaxColumns();

      // Add event listener for window resize
      window.addEventListener('resize', updateMaxColumns);

      // Cleanup listener on component unmount
      return () => window.removeEventListener('resize', updateMaxColumns);
    }, []);

    return maxColumnsDisplayed;
  };


  const MAX_COLUMNS_DISPLAYED = useMaxColumnsDisplayed(); //Detect screen size and set this accordingly

  useEffect(() => {
    const groupIdFromUrl = window.location.pathname.split("/").pop();
    if (groupIdFromUrl !== "") {
      setGroupId(groupIdFromUrl);
    }
  }, []); // Empty dependency array to run only once

  let alertMessages = [];
  if (isEmptyInput) {
    if (userName.length > 20) {
      alertMessages.push("Name Must Be Under 20 Characters");
    }
    else {
      alertMessages.push("Please Enter Your Name");
    }
  }

  if (slotTried) {
    alertMessages.push("Please Enter Your Name And Join Before Selecting A Slot");
    setTimeout(() => {
      setSlotTried(false);
    }, 2000);
  }

  return (
    <div className="UserBase">
      <div className="UserScreenBackground">
        {alertMessages.length > 0 && <div className="alert-container">
          <Alert severity="error">{alertMessages.join(" | ")}</Alert>
        </div>}
        
        <AppContext.Provider value={{ groupId, setGroupId, userId, setUserId, userSlot, setUserSlot, slotTried, setSlotTried, userArray, setUserArray, stopped, setStopped, first, setFirst, groupAdminClicked, setGroupAdminClicked, initialCellValue, setInitialCellValue, userName, setUserName, isEmptyInput, setEmptyInput, dragValue, setDragValue, startColumn, setStartColumn, MAX_COLUMNS_DISPLAYED, loading, setLoading }}>
          <div className="StickyDiv">
            <Tutorial />
            <div className="UserTitleContainer">
              <SyncCircleButton />
              <div>
                <UserTitle />
              </div>
            </div>
            <HeaderCard />
          </div>
          <Calendar />
        </AppContext.Provider>
      </div>
    </div>

  )
}

export default UserPage;