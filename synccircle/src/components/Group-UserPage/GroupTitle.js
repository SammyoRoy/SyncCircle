import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function GroupTitle() {
    const { groupId } = useContext(AppContext);
    const [eventName, setEventName] = useState("");


    useEffect(() => {
        const URL = window.location.href.split("/");
         axios.get(`http://localhost:4000/groups/${URL[URL.length - 1]}`)
         .then((response) => {
             // navigate to /group pages
             setEventName(response.data.group_name);

         })
         .catch((error) => {
             // handle the error
             console.error(error);
         });
       }, [groupId]);


    return (
        <h2 className="GroupTitle"> {eventName} </h2>
    )
}

export default GroupTitle;