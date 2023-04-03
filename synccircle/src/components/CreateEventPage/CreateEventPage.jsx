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

function DayOfTheWeekButton({ day, setDays, days }) {
    const [isPressed, setPressed] = useState(false);
    const [style, setStyle] = useState("DayOfTheWeekButton");
  
    const handlePress = (e) => {
      if (isPressed) {
        setPressed(false);
        setStyle("DayOfTheWeekButton");
        setDays(days.filter((d) => d !== day));
        console.log(days);
      } else {
        setPressed(true);
        setStyle("DayOfTheWeekButtonPressed");
        setDays([...days, day]);
        console.log(days);
      }
    };
  
    return (
      <button className={style} onClick={handlePress} onTouchStart={handlePress}>{day}</button>
    );
  } 

  function DaySelectionFrame({days, setDays}) {
    if (days === null || days === undefined) {
      setDays([]);
    }
    
    return (
      <div className="DaySelectionFrame">
        <div className="DaySelectionFrameRow">
          <DayOfTheWeekButton day={"Sun"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Mon"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Tue"} setDays={setDays} days={days} />
        </div>
        <div className="DaySelectionFrameRow">
          <DayOfTheWeekButton day={"Wed"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Thur"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Fri"} setDays={setDays} days={days} />
        </div>
        <div className="DaySelectionFrameRow">
          <DayOfTheWeekButton day={"Sat"} setDays={setDays} days={days} />
        </div>
      </div>
    );
  }


  function CreateEventSubmitButton({ eventName, startTime, endTime, days }) {
    const nav = useNavigate();
    const eventSubmit = (event) => {
      event.preventDefault();
      const dayString = days.join(",");
      console.log(days);
      console.log(dayString);
      axios.post(`http://localhost:4000/create?group=${eventName}=${startTime}=${endTime}=${dayString}`)
        .then((response) => {
          // navigate to /group page
          nav(`/group/${response.data}`);
        })
        .catch((error) => {
          // handle the error
          console.error(error);
        });
    };
    return (
      <button type="submit" className="CreateEventSubmitButton" onClick={eventSubmit}>Create Event</button>
    );
  }
  
  function CreateEventPage() {
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState("8:00 A.M");
    const [endTime, setEndTime] = useState("10:00 P.M");
    const [days, setDays] = useState([]);
    const handleEventNameChange = (value) => {
      setEventName(value);
    };

    return (
      <div className="LightMode">
        <Title />
          <div className="Backdrop">
            <EventNameForm OnEventNameChange={handleEventNameChange} />
            <div className="TimeSelectionFrame">
              <TimeDropdown style="TimeSelectionDropdown" OnTimeChange={setStartTime} selectedTime={startTime} label="Start Time" />
              <TimeDropdown style="TimeSelectionDropdown2" OnTimeChange={setEndTime} selectedTime={endTime} label="End Time" />
            </div>
            <DaySelectionFrame setDays={setDays} days={days} />
          </div>
        <CreateEventSubmitButton eventName={eventName} startTime={startTime} endTime={endTime} days={days} />
      </div>
    );
  }
  
export default CreateEventPage;

// const title = titleSyncCircle</title>;
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