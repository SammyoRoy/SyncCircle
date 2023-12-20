import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function CreateEventSubmitButton({ eventName, startTime, endTime, days, isDaysOftheWeek }){
    const nav = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const { setEventTrigger, setDayTrigger} = useContext(AppContext);
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

      const dayString = days.join(",");
      axios.post(API_URL+`/groups/`, {
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