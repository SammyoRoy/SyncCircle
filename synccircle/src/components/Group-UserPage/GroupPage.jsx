import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import UserTitle from "./UserTitle";
import GroupCalendar from "./GroupCalender";
import GroupHeader from "./GroupHeader";
import Copy from "./copy.png";
import GroupTitle from "./GroupTitle"
import './GroupPageStyle.css';

function GroupPage() {
  const { groupId, userId } = useContext(AppContext);

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
          <GroupCalendar />
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
