import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import CreateEventPage from "../CreateEventPage/CreateEventPage.jsx";

function Title( {groupId}) {

    const [eventName, setEventName] = useState("");

        axios.post(`http://localhost:4000/display?group=${groupId}`)
        .then((response) => {
          // navigate to /group pages
          setEventName(response.data);
          console.log(eventName);
          
        })
        .catch((error) => {
          // handle the error
          console.error(error);
        });
    
    
    return (
        <h2 className="Title"> {eventName} </h2> 
    )
}



function UserNameForm(){
    return(
        <div className="UserNameForm">
            <form>
                <input type="text" placeholder="Enter your name" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

function DaysOfTheWeek(){

}

function Calendar(){

}

function GroupPageButton(){

}


function UserPage(){
    const[groupId, setGroupId] = useState("");
    useEffect(() => {
        setGroupId(window.location.pathname.split("/").pop());
        console.log(groupId);
    }, [groupId]);
    console.log(groupId);

    return(
        <div className="LightMode">
            <Title groupId={groupId} />
            <div className="HeaderCard">
                <UserNameForm />
                <DaysOfTheWeek />
            </div>
            <Calendar />
            <GroupPageButton />
        </div>
    )
}

export default UserPage;
