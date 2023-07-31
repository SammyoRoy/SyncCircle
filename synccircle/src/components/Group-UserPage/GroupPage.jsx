import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import UserTitle from "./UserTitle";
import GroupCalendar from "./GroupCalender";
import GroupHeader from "./GroupHeader";
import Copy from "./copy.png";
import GroupTitle from "./GroupTitle"
import './GroupPageStyle.css';
import GroupSlotPopup from './GroupSlotPopup';

function GroupPage() {
  const { groupId, userId } = useContext(AppContext);
  const [popupMatrixKey, setPopupMatrixKey] = useState(0);
  const [popupColor, setPopupColor] = useState("white");

  return (
    <div className="LightMode">
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasGroup"
        aria-labelledby="offcanvasGroupLabel"
      >
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        <div className="offcanvas-header">
          <GroupTitle />
        </div>
        <div className="offcanvas-body">
          <GroupHeader />
          <GroupCalendar setPopupMatrixKey={setPopupMatrixKey} setPopupColor={setPopupColor}/>
          <GroupSlotPopup matrixKey={popupMatrixKey} popupColor={popupColor}/>
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
