import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import UserTitle from "./UserTitle";
import GroupCalendar from "./GroupCalender";
import GroupHeader from "./GroupHeader";
import Copy from "./copy.png";
import GroupTitle from "./GroupTitle"
import './GroupPageStyle.css';
import GroupSlotPopup from './GroupSlotPopup';
import GroupAdminControls from "./GroupAdminControls";

function GroupPage() {
  const { groupId, userId, groupAdminClicked } = useContext(AppContext);
  const [popupMatrixKey, setPopupMatrixKey] = useState(0);
  const [popupColor, setPopupColor] = useState("white");
  const [groupSlotClicked, setGroupSlotClicked] = useState(0);

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
          {!groupAdminClicked? <GroupCalendar setPopupMatrixKey={setPopupMatrixKey} setPopupColor={setPopupColor}/>: <GroupAdminControls />}
          {popupMatrixKey > 0 && <GroupSlotPopup matrixKey={popupMatrixKey} popupColor={popupColor}/>}
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
