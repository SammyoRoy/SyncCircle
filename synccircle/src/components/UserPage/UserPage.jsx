import React, { useEffect, useState, useRef} from "react";
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


function Title({ groupId }) {
    const [eventName, setEventName] = useState("");

    useEffect(() => {
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
        <h2 className="UserPageTitle"> {eventName} </h2>
    )
}

function UserNameForm({ groupId, setUserId }){
  const [userName, setUserName] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.username.value;
    setUserName(inputValue);
  };

  return (
    <div className="UserNameContainer">
      <form onSubmit={handleSubmit}>
        <input
          className="UserNameForm"
          type="text"
          name="username"
          placeholder="Enter username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>
      <JoinButton groupId={groupId} userName={userName} setUserId={setUserId}/>
    </div>
  )
}

function JoinButton({ groupId, userName, setUserId }){
  
  console.log(groupId);
  console.log(userName);

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:4000/create?user=${groupId}=${userName}`)
      .then((response) => {
        setUserId(response.data);
        console.log(response.data);
      });

  }
  return (
    <button type="submit" className="JoinButton" onClick={onSubmit}>Join</button>
  )
}

function DaysOfTheWeek() {
  const [days, setDays] = useState([]);
  const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;

  useEffect(() => {
    async function fetchData() {
      const daysData = await GetDays();
      setDays(daysData);
    }

    fetchData();
  }, []);

  return (
    <div className="DOTWBar" style={{gridTemplateColumns}}>
      <ScrollIcon />
      {days.map((day, index) => (
        <DayLabels key={index} day={day} length={days.length} />
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

function DayLabels({ day }){
  return (
    <div className="DayLabel"> {day} </div>
  )
}

function HeaderCard({ groupId, setUserId }){

  return (
      <div>
        <div className= "HeaderCard">
          <UserNameForm groupId={groupId} setUserId={setUserId}/>
        </div>
        <DaysOfTheWeek />
      </div>
  )


}


function TimeLabel({currTimeIndex}){
  const [currentTime, setCurrentTime] = useState("6:00 AM");

  const timeOptions = [
    '6:00 AM', //06:00 -> 0
    '7:00 AM', //07:00 -> 1
    '8:00 AM', //08:00 -> 2
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM', //12:00 -> 6
    '1:00 PM', // 13:00 -> 7
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM', //23:00 -> 17
    '12:00 AM', //00:00 -> 18
    '1:00 AM',  //01:00 -> 19
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM', //05:00 -> 23
  ];

  useEffect (() => {
    setCurrentTime(timeOptions[currTimeIndex]);
  }, [currTimeIndex, timeOptions])
  
  return (
    <div className="TimeLabel">{currentTime}</div>
  )
}

function Slot({ matrixKey, days, groupId, userId }){
  const [isSelected, setSelected] = useState(false);
  const [style, setStyle] = useState("UnselectedSlot");
  const cols = days.length;

  const row = Math.floor(matrixKey/(cols+1));
  const col = matrixKey - (row *(cols+1)) - 1;

  const handlePress = (e) => {

    if (isSelected) {
      setSelected(false);
      setStyle("UnselectedSlot");
      //Remove booking
    }
    else{
      setSelected(true);
      setStyle("SelectedSlot");

      axios.post(`https://localhost:4000/book?user=${userId}=group=${groupId}=${row}=${col}`, {
        timeout: 5000,
      });
    }
  }


  return (
    <button className={style} onClick={handlePress} type="button" >{matrixKey} ({row},{col}) </button>
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

async function convertTimeToIndex(time) {
  const [hour] = time.split(':');
  const parsedHour = parseInt(hour, 10);

  if (parsedHour >= 6){
    return (parsedHour-6);
  }
  else{
    return (parsedHour+18)
  }
}


function Calendar( {groupId, userId}){
  const [days, setDays] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currTimeIndex, setCurrTimeIndex] = useState(0);


  useEffect(() => {
    async function fetchData() {
      const daysData = await GetDays();
      const startData = await GetStart();
      const endData = await GetEnd();

      setDays(daysData);
      setStart(startData);
      setEnd(endData);
    }

    async function initializeIndices() {
      const startTimeIndex = await convertTimeToIndex(start);
      const endTimeIndex = await convertTimeToIndex(end);
      const timeIndex = await convertTimeToIndex(start);
      
      setStartIndex(startTimeIndex);
      setCurrTimeIndex(timeIndex);
      setEndIndex(endTimeIndex);
    }

    fetchData();
    initializeIndices();
    console.log(startIndex);
    console.log(endIndex);
    console.log(currTimeIndex);
  }, [startIndex, endIndex, currTimeIndex, start, end]);

  const numRows = (endIndex-startIndex);
  console.log(numRows);
  const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;
  const gridTemplateRows = `repeat(${numRows}, 1fr)`;
  const totalCells = (days.length+1) * (endIndex-startIndex);

  // Set CSS variables
  
  return (
    <div className="CalendarGrid" style={{gridTemplateColumns, gridTemplateRows}}>
      {/* Generate and render grid items */}

      {Array.from({ length: totalCells }, (_, index) => (
        index % (days.length+1) === 0 ? (
         <TimeLabel 
          key={index} 
          currTimeIndex={startIndex + Math.floor(index / (days.length + 1))} 
         />
         ) : (<Slot key={index} matrixKey={index} days={days} groupId={groupId} userId={userId}/>
         ))
      )}
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

  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect (() => {
    setGroupId(window.location.pathname.split("/").pop());
  }, [groupId])

    return(
        <div className="LightMode">
            <Title groupId={groupId}/>
            <HeaderCard groupId={groupId} setUserId={setUserId}/>
            <Calendar groupId={groupId} userId={userId}/>
            {/*<GroupPageButton />*/}
       </div>
    )
}

export default UserPage;