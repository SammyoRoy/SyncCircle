import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Calendar } from "react-multi-date-picker"

const CalendarSelectionFrame = () => {
  

  return (
    <div className="CalendarSelectionFrame">
      <Calendar
        monthYearSeparator="|"
        showOtherDays={true}
        disableYearPicker={true}
        minDate={new Date()}
        range
        multiple
      />
      
    </div>
  );
};

export default CalendarSelectionFrame;
