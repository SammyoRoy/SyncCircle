import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import './CreateEventPageStyle.css';


function Title() {
    return (
        <h2 className="Title"> SyncCircle</h2>
    );
}

function LightMode() {
    return (
        <div className="LightMode"></div>
    )
}

function EventNameForm({OnEventNameChange}) {
    
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page refresh
        OnEventNameChange(e.target.value);
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <input
            className="EventNameForm"
            type="text"
            placeholder="Enter event name"
            onChange={(e) => OnEventNameChange(e.target.value)}
          />
        </form>
      );
}

function TimeDropdown({style, OnTimeChange, selectedTime, label}) {
    const timeOptions = [
        '6:00 AM',
        '7:00 AM',
        '8:00 AM',
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
        '6:00 PM',
        '7:00 PM',
        '8:00 PM',
        '9:00 PM',
        '10:00 PM',
        '11:00 PM',
        '12:00 PM',
        '1:00 AM',
        '2:00 AM',
        '3:00 AM',
        '4:00 AM',
        '5:00 AM',
    ];

    return (
        <>
            <label htmlFor="time-select"></label>
            <select className={style} id="time-select" value={selectedTime} 
            onChange={(e) => OnTimeChange(e.target.value)}>
                <option value="">{label}</option>
                {timeOptions.map(time => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </>
    );
}

function DayOfTheWeekButton({day}) {
    return (
        <button className="DayOfTheWeekButton" >{day}</button>
    )
}

function DaySelectionFrame() {
    return (
        <div className="DaySelectionFrame">
            <div className="DaySelectionFrameRow">
                <DayOfTheWeekButton day={"Sun"} />
                <DayOfTheWeekButton day={"Mon"} />
                <DayOfTheWeekButton day={"Tue"} />
            </div>
            <div className="DaySelectionFrameRow">
                <DayOfTheWeekButton day={"Wed"} />
                <DayOfTheWeekButton day={"Thur"} />
                <DayOfTheWeekButton day={"Fri"} />
            </div>
            <div className="DaySelectionFrameRow">
                <DayOfTheWeekButton day={"sat"} />
            </div>
        </div>
    )
}

function CreateEventSubmitButton() {
    return (
        <button className="CreateEventSubmitButton">Create Event</button>
    )
}

      
export default function CreateEventPage() {
    const [eventName, setEventName] = useState('');
    const [startTime, setStartTime] = useState('8:00 A.M');
    const [endTime, setEndTime] = useState('10:00 P.M');
    const [days, setDays] = useState('');
    
    return (
        <div className="LightMode">
            <Title />
            <div className="Backdrop">
                <EventNameForm OnEventNameChange={setEventName} /> 
                <div className="TimeSelectionFrame">
                    <TimeDropdown style={"TimeSelectionDropdown"} label="Select start time"
                    OnTimeChange={setStartTime} selectedTime={startTime}/>
                    <TimeDropdown style={"TimeSelectionDropdown2"} label="Select end time"
                    OnTimeChange={setEndTime} selectedTime={endTime}/>
                </div>
                <DaySelectionFrame />
            </div>
            <CreateEventSubmitButton />
        </div>
    );
}


// const title = <title>SyncCircle</title>;
// const groupStores = localStorage.getItem("group");
// const userStores = localStorage.getItem("user");
// let groupName;
// let userName;
// if (groupStores != null) {
//     groupName = groupStores;
// }
// else {
//     groupName = "";
// }
// if (userStores != null) {
//     userName = userStores;
// }
// else {
//     userName = "";
// }

// function CreateEventPage() {
//     const nav = useNavigate();

//     function handleSubmit(event) {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const group = formData.get('Group Title');
//         groupName = group;
//         localStorage.setItem("group", groupName);
//         axios.post(`http://localhost:4000/create?group=${group}`)
//             .then(response => {
//                 // navigate to /group page
//                 nav(`/group/${response.data}`);
//             })
//             .catch(error => {
//                 // handle the error
//                 console.error(error);
//             });
//     }
//     //HTML for the landing page of the site
//     return (
//         <html>
//             <head>
//                 {title}
//             </head>
//             <body>
//                 <center><h1>SyncCircle</h1></center>
//                 <center>
//                     {/*Sends the submitted entry from the button to handleSubmit function*/}
//                     <form onSubmit={handleSubmit} className={EnterEventNameForm}>
//                         <h2>Enter Your Group</h2>
//                         <label>
//                             Group Title:
//                             <input type="text" name="Group Title" className={EnterEventNameForm} />
//                         </label>
//                         <button type="submit" className={EnterEventNameForm}>Submit</button>
//                     </form>
//                 </center>
//             </body>
//         </html>
//     );
// }

//export default CreateEventPage;