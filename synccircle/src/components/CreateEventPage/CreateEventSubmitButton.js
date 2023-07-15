import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import isMobile from "is-mobile"

function CreateEventSubmitButton({ eventName, startTime, endTime, days }){
    const nav = useNavigate();
    const eventSubmit = (event) => {
      if (!isMobile()){
        event.preventDefault();
      }
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
      <button type="submit" className="CreateEventSubmitButton" onClick={eventSubmit} onTouchStart={eventSubmit}>Create Event</button>
    );
  }

export default CreateEventSubmitButton;