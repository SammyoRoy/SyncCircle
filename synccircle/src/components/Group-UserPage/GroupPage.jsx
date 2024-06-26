import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import UserTitle from "./UserTitle";
import GroupCalendar from "./GroupCalender";
import GroupHeader from "./GroupHeader";
import Copy from "./images/copy.png";
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
          zIndex="5000"
        ></button>
        <div className="StickyDiv">
          <div className="offcanvas-header">
            <GroupTitle />
          </div>
        </div>
        <div className="offcanvas-body">
          <div className="StickyDiv">
            <GroupHeader />
          </div>
          {!groupAdminClicked ? <GroupCalendar setPopupMatrixKey={setPopupMatrixKey} setPopupColor={setPopupColor} setGroupSlotClicked={setGroupSlotClicked} /> : <GroupAdminControls />}
          {popupMatrixKey > 0 && <GroupSlotPopup matrixKey={popupMatrixKey} popupColor={popupColor} groupSlotClicked={groupSlotClicked} />}
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
