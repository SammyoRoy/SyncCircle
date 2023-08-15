import React, { useContext } from "react";
import GroupPage from "./GroupPage";
import { AppContext } from "../../context/AppContext";
import GroupIcon from '@mui/icons-material/Group'

function GroupPageButton() {
  const { groupId, userId}= useContext(AppContext);
  return (
    <div className="Groups">
      <button className="GroupPageButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasGroup" aria-controls="offcanvasGroup">
        <GroupIcon className="GroupPageButtonIcon" fontSize="medium"/>
      </button>
      <GroupPage groupId={groupId} userId={userId}/>
    </div>
  );
}

export default GroupPageButton;

