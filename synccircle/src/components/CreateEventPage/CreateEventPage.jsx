import React, { useState } from "react";
import './CreateEventStyleOverhaul.css';
import Title from "./Title";
import EventNameForm from "./EventNameForm";
import TimeDropdown from "./TimeDropdown";
import SpecificDaysToggle from "./SpecificDaysToggle";
import DaySelectionFrame from "./DaySelectionFrame";
import CreateEventSubmitButton from "./CreateEventSubmitButton";
import { AppContext } from "../../context/AppContext";
import CalendarSelectionFrame from "./CalendarSelectionFrame";


function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("8:00 AM");
  const [endTime, setEndTime] = useState("10:00 PM");
  const [days, setDays] = useState([]);
  const [eventTrigger, setEventTrigger] = useState(false);
  const [startTrigger, setStartTrigger] = useState(false);
  const [endTrigger, setEndTrigger] = useState(false);
  const [dayTrigger, setDayTrigger] = useState(false);
  const [isDaysOftheWeek, setIsDaysOftheWeek] = useState(false);
  const [isCalendar, setIsCalendar] = useState(true);

  const handleEventNameChange = (value) => {
    setEventTrigger(false);
    setEventName(value);
  };
  return (
    <div className="Base">
      <div className="ScreenBackground">
        <Title />
        <AppContext.Provider value={{eventTrigger, setEventTrigger, startTrigger, setStartTrigger, endTrigger, setEndTrigger, dayTrigger, setDayTrigger }}>
        <div className="Backdrop">
          <EventNameForm OnEventNameChange={handleEventNameChange}/>
          <div className="TimeSelectionFrame">
            <TimeDropdown OnTimeChange={setStartTime} label="Start Time" />
            <svg className="Bar" width="53" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="53" height="5" fill="#297045" />
            </svg>
            <TimeDropdown OnTimeChange={setEndTime} label="End Time" />
          </div>
          <SpecificDaysToggle isDaysOftheWeek={isDaysOftheWeek} setIsDaysOftheWeek={setIsDaysOftheWeek} setIsCalendar={setIsCalendar} isDaysOfTheWeek={isDaysOftheWeek}/>
          {isDaysOftheWeek && <DaySelectionFrame setDays={setDays} days={days} />}
          {isCalendar && <CalendarSelectionFrame/>} 
        </div>
        <CreateEventSubmitButton eventName={eventName} startTime={startTime} endTime={endTime} days={days} />
        </AppContext.Provider>
      </div>
    </div>

  );
}

export default CreateEventPage;

