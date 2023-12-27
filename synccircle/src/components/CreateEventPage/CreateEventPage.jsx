import React, { useState } from "react";
import './CreateEventStyleOverhaul.css';
import Title from "./Title";
import EventNameForm from "./EventNameForm";
import TimeDropdown from "./TimeDropdown";
import DaySelectionFrame from "./DaySelectionFrame";
import CreateEventSubmitButton from "./CreateEventSubmitButton";
import { AppContext } from "../../context/AppContext";
import Alert from '@mui/material/Alert';
import { IOSSwitch } from "./IosSwitch";
import CalenderSelectionFrame from "./CalenderSelectionFrame";


function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("8:00 AM");
  const [endTime, setEndTime] = useState("10:00 PM");
  const [days, setDays] = useState([]);
  const [eventTrigger, setEventTrigger] = useState(false);
  const [startTrigger, setStartTrigger] = useState(false);
  const [endTrigger, setEndTrigger] = useState(false);
  const [dayTrigger, setDayTrigger] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [isDaysOftheWeek, setIsDaysOftheWeek] = useState(false);


  const handleEventNameChange = (value) => {
    setEventTrigger(false);
    setEventName(value);
  };

  /*const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
    setIsDaysOftheWeek(event.target.checked);
    if (isDaysOftheWeek == true){
      setDays(["isDaysOftheWeek"]);
    }
    else{
      setDays([]);
    }
  };*/

  const handleSwitchChange = (event) => {
    const isChecked = event.target.checked;
  
    setSwitchState(isChecked);
    setIsDaysOftheWeek(isChecked);
  
    if (isChecked) {
      setDays(["isDaysOftheWeek"]);
    } else {
      setDays([]);
    }
  };

  console.log("EVENTNAME" + eventName)
  let alertMessages = [];
  if(eventTrigger) {
    if(eventName.length > 30) {
      alertMessages.push("Event Name Must Be Under 30 Characters");
    }
    if(eventName === "") {
      alertMessages.push("Please Enter Event Name");
    }
  }
  if(dayTrigger) {
    alertMessages.push("Please Select At Least One Day");
  }
  return (
    <div className="Base">
      <div className="ScreenBackground">
      {alertMessages.length > 0 && (
          <div className="alert-container">
            <Alert severity="error">{alertMessages.join(' | ')}</Alert>
          </div>)}
        <Title />
        <AppContext.Provider value={{ eventTrigger, setEventTrigger, startTrigger, setStartTrigger, endTrigger, setEndTrigger, dayTrigger, setDayTrigger, eventName, setEventName }}>
          <div className="Backdrop">
            <EventNameForm OnEventNameChange={handleEventNameChange} />
            <div className="TimeSelectionFrame">
              <TimeDropdown OnTimeChange={setStartTime} label="Start Time" />
              <svg className="Bar" width="53" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="53" height="5" fill="#297045" />
              </svg>
              <TimeDropdown OnTimeChange={setEndTime} label="End Time" />
            </div>
            <div className="SwitchFrame">
              <IOSSwitch checked={switchState} onChange={handleSwitchChange}/>
              <div>Days of the Week</div>
            </div>
            {switchState && <DaySelectionFrame setDays={setDays} days={days} />}
            {!switchState && <CalenderSelectionFrame setDays={setDays} days={days} />}
          </div>
          <CreateEventSubmitButton eventName={eventName} startTime={startTime} endTime={endTime} days={days} isDaysOftheWeek={isDaysOftheWeek} />
        </AppContext.Provider>
      </div>
    </div>

  );
}

export default CreateEventPage;

