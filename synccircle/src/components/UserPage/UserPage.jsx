import React, { useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import './UserPage.css';
import CreateEventPage from "../CreateEventPage/CreateEventPage.jsx";


function Title() {

    // const [eventName, setEventName] = useState("");

    // useEffect(() => {
    //     axios.post(`http://localhost:4000/display?group=${groupId}`)
    //     .then((response) => {
    //         // navigate to /group pages
    //         setEventName(response.data);
    //         console.log(eventName);

    //     })
    //     .catch((error) => {
    //         // handle the error
    //         console.error(error);
    //     });
    //   }, [groupId]);


    return (
        <h2 className="UserPageTitle"> Nithin's Birthday </h2>
    )
}

function UserNameForm(){
  return (
    <div className="UserNameContainer">
      <form>
        <input
          className="UserNameForm"
          type="text"
          placeholder="Enter username"
        />
      </form>
      <JoinButton />
    </div>
  )
}

function JoinButton(){
  return (
    <button type="submit" className="JoinButton">Join</button>
  )
}

function DaysOfTheWeek() {
  const [days, setDays] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const daysData = await GetDays();
      setDays(daysData);
    }

    fetchData();
  }, []);

  const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;

  return (
    <div className="DOTWBar" style={{gridTemplateColumns}}>
      <ScrollIcon />
      {days.map((day, index) => (
        <DayLabels key={index} day={day} index={index} length={days.length} />
      ))}
    </div>
  );
}

function ScrollIcon(){
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 15L12 20L7 15" stroke="#6ABEA7" stroke-width="2"/>
      <path d="M17 9L12 4L7 9" stroke="#6ABEA7" stroke-width="2"/>
    </svg>
  )
}

function DayLabels(){
  return (
    <div className="DayLabel"> S</div>
  )
}

function HeaderCard(){

  return (
      <div>
        <div className= "HeaderCard">
          <UserNameForm />
        </div>
        <DaysOfTheWeek />
      </div>
  )


}


// function UserNameForm({ OnUserNameChange }) {

//     const handleSubmit = (e) => {
//         e.preventDefault(); // prevent page refresh
//         OnUserNameChange(e.target.value);
//         // Create user
//     };

//     return (
//         <div className="UserNameContainer">
//             <form onSubmit={handleSubmit} >
//                 <input
//                     className="UserNameForm"
//                     type="text"
//                     placeholder="Enter username"
//                     onChange={(e) => OnUserNameChange(e.target.value)}
//                 />
//                 <input 
//                     className="JoinButton"
//                     type="submit"
                    
//                 />
//             </form>
//         </div>
//     );
// }

function TimeLabel(){
  return (
    <div className="TimeLabel">6:00 AM</div>
  )
}

function Slot(){
  return (
    <button type="button" className="Slot"></button>
  )
}
async function GetDays() {
  const URL = window.location.href.split("/");
  try {
    const response = await axios.post(`http://localhost:4000/days?group=${URL[URL.length - 1]}`);
    return response.data.split(",");
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function GetStart() {
  const URL = window.location.href.split("/");
  try {
    const response = await axios.post(`http://localhost:4000/shours?group=${URL[URL.length - 1]}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return "";
  }
}

async function GetEnd() {
  const URL = window.location.href.split("/");
  try {
    const response = await axios.post(`http://localhost:4000/ehours?group=${URL[URL.length - 1]}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return "";
  }
}
function Calendar(){
  const [days, setDays] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    async function fetchData() {
      const daysData = await GetDays();
      const startData = await GetStart();
      const endData = await GetEnd();

      setDays(daysData);
      setStart(startData);
      setEnd(endData);
    }

    fetchData();
  }, []);
  const startDate = new Date(`January 1, 2021 ${start}:00`);
  const endDate = new Date(`January 1, 2021 ${end}:00`);
  const hours = endDate.getHours() - startDate.getHours();
  const totalCells = (days.length + 1) * hours;
  // Set CSS variables
  document.documentElement.style.setProperty('--rows', hours);
  document.documentElement.style.setProperty('--cols', days.length + 1);
  return (
    <div className="CalendarGrid">
      {/* Generate and render grid items */}
      {Array.from({ length: totalCells }, (_, index) => (
        index % 8 === 0 ? <TimeLabel key={index} /> : <Slot key={index} />
      ))}
    </div>
  );
}

function GroupPageButton(){
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/group/${window.location.href.split("/")[window.location.href.split("/").length - 1]}/ALL`);
  };
  return (
      <div>
          <button type="button" onClick={handleClick}>Group Page</button>
      </div>
  )
}


function UserPage(){

    return(
        <div className="LightMode">
            <Title/>
            <HeaderCard />
            <Calendar />
            <GroupPageButton />
       </div>
    )
}

export default UserPage;