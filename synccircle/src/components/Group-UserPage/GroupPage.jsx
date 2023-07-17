import React, { useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import UserTitle from "./UserTitle";
import HeaderCard from "./HeaderCard";
import GroupCalendar from "./GroupCalender";



function GroupPage(){
    const [groupId, setGroupId] = useState("");
    const [userId, setUserId] = useState("");
    
    useEffect (() => {
      const groupPath = window.location.pathname.split("/");
      setGroupId(groupPath[2]);
      console.log(groupId);
    }, [groupId])

    return(
        <div className="LightMode">
            <UserTitle groupId={groupId}/>
            <HeaderCard groupId={groupId} setUserId={setUserId}/>
            <GroupCalendar groupId={groupId} userId={userId}/>
       </div>
    )
}

export default GroupPage;