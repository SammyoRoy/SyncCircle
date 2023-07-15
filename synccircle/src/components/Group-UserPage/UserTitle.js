import React, { useState, useEffect } from "react";
import axios from "axios";

function UserTitle({ groupId }) {
    const [eventName, setEventName] = useState("");
    const [className, setClassName] = useState("UserPageTitle");


    useEffect(() => {
        if (eventName.length > 10) {
            setClassName("UserPageTitleSmall");
        }
         axios.post(`http://localhost:4000/name?group=${groupId}`)
         .then((response) => {
             // navigate to /group pages
             setEventName(response.data);
             console.log(eventName);

         })
         .catch((error) => {
             // handle the error
             console.error(error);
         });
       }, [groupId]);


    return (
        <h2 className={className}> {eventName} </h2>
    )
}

export default UserTitle;