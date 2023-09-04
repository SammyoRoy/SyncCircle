import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from '@mui/material';

const CalendarSelectionFrame = () => {
  const [dateRanges, setDateRanges] = useState([]);

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

  console.log(dateRanges);

  return (
    <div className="DaySelectionFrame">
      <Calendar
        minDetail={"month"}
        next2Label={null}
        prev2Label={null}
        onChange={onChange}
        value={dateRanges.flat()} 
        selectRange={true}
        minDate={new Date()}
        tileClassName={"react-calendar-button"}
        tileContent={tileContent}
      />
      <Button onClick={onClear}>Clear</Button>
    </div>
  );
};

export default CalendarSelectionFrame;
