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
function UserPress(){
    console.log("User Pressed");
}

function UserTable({groupId, days, start, end}){
  let dayArray = days.split(",");
  let col =[];
  const [shours, sminutes] = start.split(":");
  const startD = new Date();
  startD.setHours(shours); 
  startD.setMinutes(sminutes);
  const [ehours, eminutes] = end.split(":");
  const endD = new Date();
  endD.setHours(ehours); 
  endD.setMinutes(eminutes);
  while(startD <= endD){
      col.push("<tr>"+"<td>" + startD.toLocaleString('en-US', { hour: 'numeric', hour12: true }) + "</td>" + ('<td id="UserPress"' + "</td>").repeat(dayArray.length) +"</tr>");
      startD.setHours(startD.getHours() + 1);
  }
    window.onload = () => document.getElementById ("UserPress").addEventListener ("click", UserPress, false);
    return(
      <div>
        <table className="UserTable" border="1">
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
      </div>
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
    const [shours, setShours] = useState("");
    const [ehours, setEhours] = useState("");

    useEffect(() => {
        setGroupId(window.location.pathname.split("/").pop());
        axios.post(`http://localhost:4000/days?group=${groupId}`)
        .then((response) => {
          console.log(response.data);
          setDays(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
        axios.post(`http://localhost:4000/shours?group=${groupId}`)
        .then((response) => {
          console.log(response.data);
          setShours(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
        axios.post(`http://localhost:4000/ehours?group=${groupId}`)
        .then((response) => {
          console.log(response.data);
          setEhours(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [groupId]);
    return(
        <div className="LightMode">
            <Title groupId={groupId} />
            <UserNameForm/>
            <UserTable groupId={groupId} days={days} start={shours} end={ehours}/>
        </div>
    )
}

export default UserPage;
