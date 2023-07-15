import React, { useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import './GroupPage.css';
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
const [color, setColor] = useState("F7F7F7");
const [numAvail, setNumAvail] = useState(0);
const [totalMembers, setTotalMembers] = useState(0)
const cols = days.length;

const row = Math.floor(matrixKey/(cols+1));
const col = matrixKey - (row *(cols+1)) - 1;


  useEffect(() => {
    
    async function initialize(){
      await axios.post(`http://localhost:4000/slot?group=${groupId}=${row}=${col}`)
      .then((response) => {
          // navigate to /group pages
          setNumAvail(parseInt(response.data));
      })
      .catch((error) => {
          // handle the error
          console.error(error);
      });
  
      await axios.post(`http://localhost:4000/numMem?group=${groupId}`)
        .then((response) => {
          setTotalMembers(parseInt(response.data));
        })
    }


    function setColor() {
      const ratio = numAvail/totalMembers;
      console.log("Hello");
      
      if (ratio == 1){
        setColor("058ED9");
      }
      else if (ratio >= .9){
        setColor("17881C");
      }
      else if (ratio >= .8){
        setColor("3FB444");
      }
      else if (ratio >= .7){
        setColor("81DE84");
      }
      else if (ratio >= .6){
        setColor("A39E3D");
      }
      else if (ratio >= .5){
        setColor("D2CD67");
      }

      else if (ratio >= .4){
        setColor("E5E296");
      }
      else if (ratio >= .3){
        setColor("984A45");
      }
      else if (ratio >= .2){
        setColor("C65E58");
      }
      else if (ratio >= .1){
        setColor("F4A19C");
      }
    }
    initialize();
    setColor();
  }, [numAvail, totalMembers, color]);



return (
  <button className="Slot" style={{backgroundColor: color}} type="button" >{numAvail}</button>
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
}, [startIndex, endIndex, currTimeIndex, start, end]);

const numRows = (endIndex-startIndex);
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

function UserPageButton() {
const navigate = useNavigate();
const handleClick = () => {
  navigate(`/group/${window.location.href.split("/")[window.location.href.split("/").length - 2]}`);
};
return (
  <div>
    <button className="UserPageButton" type="button" onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
        <path d="M8.36273 13.75C10.7002 13.75 12.4877 11.9625 12.4877 9.625C12.4877 7.2875 10.7002 5.5 8.36273 5.5C6.02523 5.5 4.23773 7.2875 4.23773 9.625C4.23773 11.9625 6.02523 13.75 8.36273 13.75ZM12.4877 15.8125H4.23773C1.90023 15.8125 0.112732 17.6 0.112732 19.9375V22H16.6127V19.9375C16.6127 17.6 14.8252 15.8125 12.4877 15.8125ZM13.7252 8.25H13.8627C16.2002 8.25 17.9877 6.4625 17.9877 4.125C17.9877 1.7875 16.2002 0 13.8627 0C11.5252 0 9.73773 1.7875 9.73773 4.125V4.2625C11.6627 4.8125 13.1752 6.325 13.7252 8.25ZM17.9877 10.3125H13.8627C13.5877 12.1 12.6252 13.6125 11.1127 14.4375H12.4877C14.2752 14.4375 15.7877 15.2625 16.7502 16.5H22.1127V14.4375C22.1127 12.1 20.3252 10.3125 17.9877 10.3125Z" fill="white" />
      </svg>
    </button>
  </div>
)
}


function GroupPage(){

const [groupId, setGroupId] = useState("");
const [userId, setUserId] = useState("");

useEffect (() => {
  const groupPath = window.location.pathname.split("/");
  setGroupId(groupPath[2]);
  console.log(groupId);
}, [groupId])

  return(
      <div className="LightMode">
            <Title groupId={groupId}/>
            <UserPageButton />
          <HeaderCard groupId={groupId} setUserId={setUserId}/>
          <Calendar groupId={groupId} userId={userId}/>
     </div>
  )
}

export default GroupPage;