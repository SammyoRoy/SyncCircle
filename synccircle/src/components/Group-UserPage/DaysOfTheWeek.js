import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ScrollIcon from "./ScrollIcon";
import DayLabels from "./DayLabels";
import { AppContext } from "../../context/AppContext";

function DaysOfTheWeek({ styling }) {
  const {isDaysOfTheWeek, setIsDaysOfTheWeek} = useContext(AppContext);
  const [days, setDays] = useState([]);
  const [dates, setDates] = useState([]);
  const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;

  useEffect(() => {
    async function fetchData() {
      const daysData = await GetDays();
      console.log(daysData);
      if (daysData[0] == "isDaysOftheWeek"){
        daysData.shift(); //remove isDaysOftheWeek from the array
        setIsDaysOfTheWeek(true);
        const sortedDaysData = sortDays(daysData);
        setDays(sortedDaysData);
      }
      else{
        const extractedDays = [];
        const extractedDates = [];
        for (let i = 1; i < daysData.length; i+=2) {
          extractedDays.push(daysData[i]);
        }
        for (let i = 0; i < daysData.length; i+=2) {
          extractedDates.push(convertDateString(daysData[i]));
        }
        setDates(extractedDates); // Set the state with the extracted dates
        setDays(extractedDays); // Set the state with the extracted days
      }
    }

    fetchData();
  }, []);

  function sortDays(daysData) {
    // Define the correct order of the days
    const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysData.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  }

  return (
    <div className={styling} style={{ gridTemplateColumns }}>
      <ScrollIcon />
      {days.map((day, index) => (
        <div>
        <DayLabels key={index} day={day} length={days.length} />
        {!isDaysOfTheWeek && <div className="dateLabel">{dates[index]}</div>}
        </div>
      ))}
    </div>
  );
}

async function GetDays() {
  const URL = window.location.href.split("/");
  try {
    const response = await axios.get(
      `https://backend.synccircle.net/groups/${URL[URL.length - 1]}`
    );
    return response.data.days;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function convertDateString(dateStr) {
  const months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  };

  const [monthStr, day] = dateStr.split(" ");
  const month = months[monthStr];
  return `${month}/${day}`;
}

export default DaysOfTheWeek;




