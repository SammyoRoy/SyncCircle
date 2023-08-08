import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function UserTitle() {
    const { groupId } = useContext(AppContext);
    const [eventName, setEventName] = useState("");


    useEffect(() => {
         axios.post(`https://backend.synccircle.net:4000/name?group=${groupId}`)
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
        <h2 className="UserTitle"> {eventName} </h2>
    )
}

export default UserTitle;