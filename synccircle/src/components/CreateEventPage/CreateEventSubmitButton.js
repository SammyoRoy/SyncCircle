import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import moment from "moment-timezone";
import { getAnalytics, logEvent } from "firebase/analytics";
import { analytics } from "../../firebaseConfig";

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

    const logEventCreation = () => {
      try {
          // Log event to Firebase Analytics
          logEvent(analytics,"create_event", {
              event_name: eventName
          });
      } catch (error) {
          console.error("Error logging event to Firebase Analytics", error);
      }
  };
  

    const eventSubmit = (event) => {
      if (eventName === "" || days.length === 0 || (days[0] === "isDaysOftheWeek" && days.length === 1))
      {
        if (eventName === "")
        {
          handleEventTrigger();
        }
        if (days.length === 0 || (days[0] === "isDaysOftheWeek" && days.length === 1))
        {
          handleDayTrigger();
        }
        return;
      }
      event.preventDefault();
      
      if (days[0] === "isDaysOftheWeek"){
        const orderDays = new Map([["Mon", 0], ["Tue", 1], ["Wed", 2], ["Thu", 3], ["Fri", 4], ["Sat", 5], ["Sun", 6]]);
        days.sort((a, b) => orderDays.get(a) - orderDays.get(b));
      }
      
      const dayString = days.join(",");
      
      axios.post(`${API_URL}/groups/`, {
          name: eventName,
          startTime: startTime,
          endTime: endTime,
          days: dayString,
          timeZone: moment.tz.guess(),
          })
        .then((response) => {
          //console.log(response)
          const groupId = response.data.group_id;
          logEventCreation();
          nav(`/group/${groupId}`);
          
        })
        .catch((error) => {
          // handle the error
          //console.log(error);
        });
    };
    return (
      <button type="submit" className="CreateEventSubmitButton" onClick={eventSubmit}>Create Event</button>
    );
  }

export default CreateEventSubmitButton;