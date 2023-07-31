import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GroupSlot from "./GroupSlot";
import TimeLabel from "./TimeLabel";
import { AppContext } from "../../context/AppContext";

function GroupCalendar({setPopupMatrixKey, setPopupColor}){
    const {groupId, userId} = useContext(AppContext);
    const [days, setDays] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [currTimeIndex, setCurrTimeIndex] = useState(0);
    
    useEffect(() => {
      async function fetchData() {
        const daysData = await GetDays();
        const startData = await GetStart();
        const endData = await GetEnd();
  
        setDays(daysData);
        setStart(startData);
        setEnd(endData);
      }
  
      async function initializeIndices() {
        const startTimeIndex = await convertTimeToIndex(start);
        const endTimeIndex = await convertTimeToIndex(end);
        const timeIndex = await convertTimeToIndex(start);
        
        setStartIndex(startTimeIndex);
        setCurrTimeIndex(timeIndex);
        setEndIndex(endTimeIndex);
      }
  
      fetchData();
      initializeIndices();
      console.log(startIndex);
      console.log(endIndex);
      console.log(currTimeIndex);
    }, [startIndex, endIndex, currTimeIndex, start, end]);
  
    const numRows = (endIndex+1-startIndex);
    const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;
    const gridTemplateRows = `repeat(${numRows}, 1fr)`;
    const totalCells = (days.length+1) * (numRows);
  
    // Set CSS variables
    
    return (
      <div className="CalendarGrid" style={{gridTemplateColumns, gridTemplateRows}}>
        {/* Generate and render grid items */}
  
        {Array.from({ length: totalCells }, (_, index) => (
          index % (days.length+1) === 0 ? (
           <TimeLabel 
            key={index} 
            currTimeIndex={startIndex + Math.floor(index / (days.length + 1))} 
           />
           ) : (<GroupSlot key={index} matrixKey={index} days={days} groupId={groupId} userId={userId} setPopupMatrixKey={setPopupMatrixKey} setPopupColor={setPopupColor}/>
           ))
        )}
      </div>
    );
  }
    async function GetDays() {
        const URL = window.location.href.split("/");
        try {
        const response = await axios.post(`http://localhost:4000/days?group=${URL[URL.length - 1]}`);
        return response.data.split(",");
        } catch (error) {
        console.error(error);
        return [];
        }
    }
  
  async function GetStart() {
    const URL = window.location.href.split("/");
    try {
      const response = await axios.post(`http://localhost:4000/shours?group=${URL[URL.length - 1]}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return "";
    }
  }
  
  async function GetEnd() {
    const URL = window.location.href.split("/");
    try {
      const response = await axios.post(`http://localhost:4000/ehours?group=${URL[URL.length - 1]}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return "";
    }
  }
  
  async function convertTimeToIndex(time) {
    const [hour] = time.split(':');
    const parsedHour = parseInt(hour, 10);
  
    if (parsedHour >= 6){
      return (parsedHour-6);
    }
    else{
      return (parsedHour+18)
    }
  }

export default GroupCalendar;