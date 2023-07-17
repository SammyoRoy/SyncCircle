import React, {useState } from "react";
import './CreateEventPageStyle.css';
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
    <div className="ScreenMode"> 
      
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
      <Footer />
    </div>
  );
}
  
export default CreateEventPage;

