import React, { useContext, useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { AppContext } from '../../context/AppContext';

const CalendarSelectionFrame = ({days, setDays}) => {

  const handleChange = (value) => {
    const flatDates = flattenAndFill(value);
    const sortedDates = flatDates.sort((a, b) => a - b);
    const formattedDates = sortedDates.map(date => formatDateString(date));
    setDays(formattedDates);
    console.log(formattedDates);
  };
  
  function flattenAndFill(dates) {
    let flatDates = [];
    dates.forEach(element => {
      if (Array.isArray(element)) {
        // For a range of dates
        let startDate = new Date(element[0].year, element[0].month.number - 1, element[0].day);
        let endDate = new Date(element[element.length - 1].year, element[element.length - 1].month.number - 1, element[element.length - 1].day);
        
        while (startDate <= endDate) {
          flatDates.push(new Date(startDate));
          startDate.setDate(startDate.getDate() + 1);
        }
      } else {
        // For a single date
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
        monthYearSeparator="|"
        showOtherDays={true}
        disableYearPicker={true}
        minDate={new Date()}
        range
        multiple
        onChange={handleChange}
      />
    </div>
  );
};

export default CalendarSelectionFrame;
