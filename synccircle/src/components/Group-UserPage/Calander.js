import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Slot from "./Slot";
import TimeLabel from "./TimeLabel";
import { AppContext } from "../../context/AppContext";

function Calendar(){
  const {groupId, userId} = useContext(AppContext);
    const [days, setDays] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [currTimeIndex, setCurrTimeIndex] = useState(0);

    //Dragging
    const [isDragging, setIsDragging] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);
    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown = () => {
      setIsDragging(true);
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchStart = () => {
      if (userId !== ""){
        setIsSwiping(true);
        console.log("AM swiping")
      }
      else{
        console.log("Failed Swipe")
      }
    };
  
    const handleTouchEnd = () => {
      setIsSwiping(false);
      console.log("Not swiping")
    };

    const handleTouchMove = (e) => {
      // Get the touch position from the event
      const touch = e.changedTouches[0];
      setTouchPosition({ x: touch.clientX, y: touch.clientY });
    };


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
    }, [startIndex, endIndex, currTimeIndex, start, end]);
  
    const numRows = (endIndex+1-startIndex);

    const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;
    const gridTemplateRows = `repeat(${numRows}, 1fr)`;
    const totalCells = (days.length+1) * (numRows);
  
    // Set CSS variables
    
    return (
      <div className="CalendarGrid" 
            onTouchMove={handleTouchMove} 
            onTouchStart={handleTouchStart} 
            onTouchEnd={handleTouchEnd} 
            onMouseLeave={handleMouseUp} 
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp} 
            style={{gridTemplateColumns, gridTemplateRows}}>
        {/* Generate and render grid items */}
  
        {Array.from({ length: totalCells }, (_, index) => (
          index % (days.length+1) === 0 ? (
           <TimeLabel 
            key={index} 
            currTimeIndex={startIndex + Math.floor(index / (days.length + 1))} 
           />
           ) : (<Slot key={index} matrixKey={index} days={days} dragging={isDragging} swiping={isSwiping} touchPosition={touchPosition}/>
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

export default Calendar;