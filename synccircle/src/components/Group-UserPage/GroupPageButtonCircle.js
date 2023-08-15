import React, { useContext } from "react";
import GroupPage from "./GroupPage";
import GroupIcon from '@mui/icons-material/Group'
import { AppContext } from "../../context/AppContext";

function GroupPageButtonCircle({joined}) {
  const { groupId, userId}= useContext(AppContext);

  if (joined) {
    return null; // Return null to display nothing when joined is true
  }
  return (
    <div className="GPCircleContainer">
      <button className="GroupPageButtonCircle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasGroup" aria-controls="offcanvasGroup">
        <GroupIcon className="GroupPageButtonCircleIcon" fontSize="large"/>
      </button>
      <GroupPage groupId={groupId} userId={userId}/>
    </div>
  );
}

export default GroupPageButtonCircle;

