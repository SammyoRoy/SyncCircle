import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function CreateEventSubmitButton({ eventName, startTime, endTime, days }){
    const nav = useNavigate();
    const { setEventTrigger, setDayTrigger } = useContext(AppContext);
    console.log(endTime)
    const eventSubmit = (event) => {
      if (eventName === "" || days.length === 0)
      {
        if (eventName === "")
        {
          setEventTrigger(true);
        }
        if (days.length === 0)
        {
          setDayTrigger(true);
        }
        return;
      }
      event.preventDefault();
      const orderDays = new Map([["Mon", 0], ["Tues", 1], ["Wed", 2], ["Thurs", 3], ["Fri", 4], ["Sat", 5], ["Sun", 6]]);
      days.sort((a, b) => orderDays.get(a) - orderDays.get(b));
      const dayString = days.join(",");
      console.log(days);
      console.log(dayString);
      axios.post(`http://localhost:4000/create?group=${eventName}=${startTime}=${endTime}=${dayString}`)
        .then((response) => {
          // navigate to /group pages

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

export default CreateEventSubmitButton;