import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function UserTitle() {
    const { groupId } = useContext(AppContext);
    const [eventName, setEventName] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const URL = window.location.href.split("/");
         axios.get(`${API_URL}/groups/${URL[URL.length - 1]}`)
         .then((response) => {
             setEventName(response.data.group_name);

         })
         .catch((error) => {
             // handle the error
             console.error(error);
         });
       }, [groupId]);


    return (
        <h2 className={eventName.length > 20? "UserTitle UserTitleSmall": "UserTitle"}> {eventName} </h2>
    )
}

export default UserTitle;