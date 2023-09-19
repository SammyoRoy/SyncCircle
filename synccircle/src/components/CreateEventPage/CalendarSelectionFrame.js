import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { Button } from '@mui/material';

const CalendarSelectionFrame = ({ days, setDays }) => {
  const [selectedDates, setSelectedDates] = useState(days || []);

  const handleChange = (value) => {
    const flatDates = flattenAndFill(value);
    const sortedDates = flatDates.sort((a, b) => a - b);
    const formattedDates = sortedDates.map(date => formatDateString(date));
    setDays(formattedDates);
    setSelectedDates(value);
  };

  const deleteAllDates = () => {
    setSelectedDates([]);
    setDays([]);
  };

  function flattenAndFill(dates) {
    let flatDates = [];
    dates.forEach(element => {
      if (Array.isArray(element)) {
        let startDate = new Date(element[0].year, element[0].month.number - 1, element[0].day);
        let endDate = new Date(element[element.length - 1].year, element[element.length - 1].month.number - 1, element[element.length - 1].day);

        while (startDate <= endDate) {
          flatDates.push(new Date(startDate));
          startDate.setDate(startDate.getDate() + 1);
        }
      } else {
        flatDates.push(new Date(element.year, element.month.number - 1, element.day));
      }
    });
    return flatDates;
  }
  
  function formatDateString(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthDay = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    const weekday = weekDayNames[date.getDay()];
    return [monthDay, weekday];
  }

  return (
    <div className="CalendarSelectionFrame">
      <Calendar
        value={selectedDates}
        monthYearSeparator="|"
        showOtherDays={true}
        disableYearPicker={true}
        minDate={new Date()}
        range
        multiple
        onChange={handleChange}
      />
      <Button onClick={deleteAllDates}>Delete All Dates</Button>
    </div>
  );
};

export default CalendarSelectionFrame;
