import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function DayOfTheWeekButton({ day, setDays, days }) {
    const [isPressed, setPressed] = useState(false);
    const [style, setStyle] = useState("DayOfTheWeekButton");
    const { dayTrigger, setDayTrigger } = useContext(AppContext);
  
    const handlePress = (e) => {
      if (isPressed) {
        setPressed(false);
        setStyle("DayOfTheWeekButton");
        setDays(days.filter((d) => d !== day));
      } else {
        setDayTrigger(false);
        setPressed(true);
        setStyle("DayOfTheWeekButtonPressed");
        setDays([...days, day]);
      }
    }; 
    return (
      <button className={style} onClick={handlePress} style={dayTrigger? {border: "4px solid #b32121"}: null}>{day}</button>
    );
  } 

export default DayOfTheWeekButton;