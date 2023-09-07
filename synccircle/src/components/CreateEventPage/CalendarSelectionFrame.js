import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Calendar } from "react-multi-date-picker"

const CalendarSelectionFrame = () => {
  /*const [dateRanges, setDateRanges] = useState([]);

  const onChange = (date) => {
    if (dateRanges.includes(date)) {
      setDateRanges(dateRanges.filter(range => range !== date));
      return;
    }
    else{
      setDateRanges([...dateRanges, date]);
    }
  };

  const onClear = () => {
    setDateRanges([]);
  };

  const isDateInRanges = (date) => {
    return dateRanges.flat().some(range => 
      date >= new Date(range[0]) && date <= new Date(range[1])
    );
  };

  const tileContent = ({ date, view }) => {
    return view === 'month' && isDateInRanges(date) ? <div className='calendar-range' /> : null;
  };

  console.log(dateRanges); */

  return (
    <div className="DaySelectionFrame">
      <Calendar
        range
        multiple
      />
      
    </div>
  );
};

export default CalendarSelectionFrame;
