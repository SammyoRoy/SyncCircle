import React, { useState } from "react";
import './WUTCreateEventStyleOverhaul.css';
import Title from "./Title";
import EventNameForm from "./EventNameForm";
import TimeDropdown from "./TimeDropdown";
import DaySelectionFrame from "./DaySelectionFrame";
import CreateEventSubmitButton from "./CreateEventSubmitButton";
import Footer from "./Footer";


function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("8:00 A.M");
  const [endTime, setEndTime] = useState("10:00 P.M");
  const [days, setDays] = useState([]);

  const handleEventNameChange = (value) => {
    setEventName(value);
  };
  return (
    <div className="Base">
      <div className="ScreenBackground">
        <Title />
        <div className="Backdrop">
          <EventNameForm OnEventNameChange={handleEventNameChange} />
          <div className="TimeSelectionFrame">
            <TimeDropdown style="TimeSelectionDropdown" OnTimeChange={setStartTime} selectedTime={startTime} label="Start Time" />
            <svg className="Bar" width="53" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="53" height="5" fill="#297045" />
            </svg>
            <TimeDropdown style="TimeSelectionDropdown" OnTimeChange={setEndTime} selectedTime={endTime} label="End Time" />
          </div>
          <DaySelectionFrame setDays={setDays} days={days} />
        </div>
        <CreateEventSubmitButton eventName={eventName} startTime={startTime} endTime={endTime} days={days} />
      </div>
    </div>

  );
}

export default CreateEventPage;

