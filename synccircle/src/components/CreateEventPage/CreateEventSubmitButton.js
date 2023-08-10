import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function CreateEventSubmitButton({ eventName, startTime, endTime, days }){
    const nav = useNavigate();
    const { setEventTrigger, setDayTrigger} = useContext(AppContext);
    console.log(endTime)
    const handleEventTrigger = () => {
      setEventTrigger(true);
      setTimeout(() => {
        setEventTrigger(false);
      }, 2000);
    };
    const handleDayTrigger = () => {
      setDayTrigger(true);
      setTimeout(() => {
        setDayTrigger(false);
      }, 2000);
    };
    const eventSubmit = (event) => {
      if (eventName === "" || days.length === 0)
      {
        if (eventName === "")
        {
          handleEventTrigger();
        }
        if (days.length === 0)
        {
          handleDayTrigger();
        }
        return;
      }
      event.preventDefault();
      const orderDays = new Map([["Mon", 0], ["Tues", 1], ["Wed", 2], ["Thurs", 3], ["Fri", 4], ["Sat", 5], ["Sun", 6]]);
      days.sort((a, b) => orderDays.get(a) - orderDays.get(b));
      const dayString = days.join(",");
      console.log(days);
      console.log(dayString);
      axios.post(`http://localhost:4000/groups/`, {
          name: eventName,
          startTime: startTime,
          endTime: endTime,
          days: dayString,
          })
        .then((response) => {
          const groupId = response.data.group_id;
          nav(`/group/${groupId}`);
          
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

export default CreateEventSubmitButton;