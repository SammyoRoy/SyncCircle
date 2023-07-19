import React, {useContext} from "react";
import { AppContext } from "./AppContext";
import UserTitle from "./UserTitle";
import HeaderCard from "./HeaderCard";
import GroupCalendar from "./GroupCalender";



function GroupPage(){
    const {groupId, userId} = useContext(AppContext);


    return (
        <div className="LightMode">
            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasGroup" aria-labelledby="offcanvasGroupLabel">
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <div className="offcanvas-header"><UserTitle /></div>
                <div class="offcanvas-body">

                    <GroupCalendar />
                </div>
            </div>
        </div >
    )
}

export default GroupPage;