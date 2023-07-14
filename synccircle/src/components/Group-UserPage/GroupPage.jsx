import React from "react";
import UserTitle from "./UserTitle";
import HeaderCard from "./HeaderCard";
import Calendar from "./Calander";



function GroupPage(){

    return(
        <div className="LightMode">
            <UserTitle/>
            <HeaderCard />
            <Calendar />
       </div>
    )
}

export default GroupPage;