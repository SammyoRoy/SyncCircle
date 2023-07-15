import React from "react";
import UserTitle from "./UserTitle";
import HeaderCard from "./HeaderCard";
import GroupCalendar from "./GroupCalander";



function GroupPage(){

    return(
        <div className="LightMode">
            <UserTitle/>
            <HeaderCard />
            <GroupCalendar />
       </div>
    )
}

export default GroupPage;