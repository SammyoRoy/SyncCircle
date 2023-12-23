import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ScrollIcon from "./ScrollIcon";
import DayLabels from "./DayLabels";
import { AppContext } from "../../context/AppContext";
import ShiftButtons from "./ShiftButtons";

function DaysOfTheWeek({ styling }) {
  const [days, setDays] = useState([]);
  const [dates, setDates] = useState([]);
  const [DaysOfTheWeek, setDaysOfTheWeek] = useState(false);
  
  const { groupId } = useContext(AppContext);
  const API_URL = process.env.REACT_APP_API_URL;
  const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;

  async function GetDays() {
    const URL = window.location.href.split("/");
    try {
      const response = await axios.get(`${API_URL}/groups/${URL[URL.length - 1]}`);
      setDaysOfTheWeek(response.data.dotw);
      return response.data.days;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function sortDays(daysData) {
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return daysData.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  }
  
  /*function convertDateString(dateStr) {
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
  }*/

  function convertMonthToNum(month){
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

    const monthNum = months[month];
    return monthNum;
  }

  useEffect(() => {
    async function fetchData() {
      const daysData = await GetDays();
      
      if (DaysOfTheWeek){
        const sortedDaysData = sortDays(daysData);
        setDays(sortedDaysData);
        console.log("Is days of the week");
      }
      else{
        const extractedDays = [];
        const extractedDates = [];

        for (let i = 0; i < daysData.length; i++) {
          console.log(daysData[i]);
          const dateParts = daysData[i].split(' ');
      
          const day = dateParts[0];
          const month = dateParts[1]; // Extracted month
          const date = dateParts[2];   // Extracted date

          const monthNum = convertMonthToNum(month);
          //console.log(`Month: ${month}, Date: ${day}, MonthNum: ${monthNum}`);
          // You can use the extracted month and date as needed in your loop
          extractedDays.push(day);
          extractedDates.push(`${monthNum}/${date}`);
      }

        setDates(extractedDates); // Set the state with the extracted dates
        setDays(extractedDays); // Set the state with the extracted days
      }
    }

    fetchData();
  }, [API_URL, groupId]);

  return (
    <div className={styling} style={{ gridTemplateColumns }}>
      <ShiftButtons />
      {days.map((day, index) => (
        <div>
        <DayLabels key={index} day={day} length={days.length} />
        {!DaysOfTheWeek && <div className="dateLabel">{dates[index]}</div>}
        </div>
      ))}
    </div>
  );
}

export default DaysOfTheWeek;
