import React, { useState } from "react";

function DayOfTheWeekButton({ day, setDays, days }) {
    const [isPressed, setPressed] = useState(false);
    const [style, setStyle] = useState("DayOfTheWeekButton");
  
    const handlePress = (e) => {
      if (isPressed) {
        setPressed(false);
        setStyle("DayOfTheWeekButton");
        setDays(days.filter((d) => d !== day));
        console.log(days);
      } else {
        setPressed(true);
        setStyle("DayOfTheWeekButtonPressed");
        setDays([...days, day]);
        console.log(days);
      }
    }; 
    return (
      <button className={style} onClick={handlePress}>{day}</button>
    );
  } 

export default DayOfTheWeekButton;