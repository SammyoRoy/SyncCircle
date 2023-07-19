import React, { useEffect, useState} from "react";
import UserTitle from "./UserTitle";
import HeaderCard from "./HeaderCard";
import GroupCalendar from "./GroupCalender";



function GroupPage({groupId, userId}){


    return (
        <div className="LightMode">
            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasGroup" aria-labelledby="offcanvasGroupLabel">
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <div className="offcanvas-header"><UserTitle groupId={groupId} /></div>
                <div class="offcanvas-body">

                    <GroupCalendar groupId={groupId} userId={userId} />
                </div>
            </div>
        </div >
    )
}

export default GroupPage;