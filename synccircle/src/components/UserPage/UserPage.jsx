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

    useEffect(() => {
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
    }, [groupId]);

    
    return (
        <h2 className="Title"> {eventName} </h2> 
    )
}

function DaysOfTheWeekTable({groupId, days}){

    let dayArray = days.split(",");
    let col =[];
    for (let j=0; j<12; j++){
        col.push("<tr>"+"<td>" + (j+1) + "</td>" + ("<td>" + "</td>").repeat(dayArray.length) +"</tr>");
    }
    return(
        <table className="DaysOfTheWeekTable" border="1">
            <thead>
              <tr>
                  <th>Hours</th>
                  {dayArray.map(day => (
                    <th dangerouslySetInnerHTML={{ __html: day }}></th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {col.map(row => (
                <tr dangerouslySetInnerHTML={{ __html: row }}></tr>
              ))}
            </tbody>
        </table>
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

function Calendar(){

}

function GroupPageButton(){

}


function UserPage(){
    const [groupId, setGroupId] = useState("");
    const [days, setDays] = useState("");

    useEffect(() => {
        setGroupId(window.location.pathname.split("/").pop());
        axios.post(`http://localhost:4000/days?group=${groupId}`)
        .then((response) => {
          setDays(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [groupId]);

    return(
        <div className="LightMode">
            <Title groupId={groupId} />
            <UserNameForm/>
            <DaysOfTheWeekTable groupId={groupId} days={days}/>
        </div>
    )
}

export default UserPage;
