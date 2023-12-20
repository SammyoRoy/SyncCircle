import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

const CalendarSelectionFrame = ({days,setDays}) => {
    const [dateRanges, setDateRanges] = useState([]);
    const [tempRange, setTempRange] = useState({ start: null, end: null });

    const generateFormattedDates = (ranges) => {
        let allDates = [];
        ranges.forEach(range => {
            let currentDate = new Date(range.start);
            while (currentDate <= range.end) {
                /*const month = currentDate.toLocaleString('en-us', { month: 'short' });
                const date = currentDate.getDate();
                const day = currentDate.toLocaleString('en-us', { weekday: 'short' });
                allDates.push([])*/

                allDates.push(`${currentDate.toLocaleString('en-us', { weekday: 'short' })} ${currentDate.toLocaleString('en-us',{ month: 'short' })} ${currentDate.getDate()}`);
                console.log(allDates[allDates.length-1]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return allDates;
    };

    /*function formatDateString(ranges) {

        let allDates = [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        ranges.forEach(range => {
            let currentDate = new Date(range.start);
            while (currentDate <= range.end) {
                const monthDay = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}`;
                const weekday = weekDayNames[currentDate.getDay()];
                console.log(monthDay + "," + weekday);
                allDates.push([monthDay, weekday]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        return allDates;
      }*/

    const updateDateRanges = (newRanges) => {
        const formattedDates = generateFormattedDates(newRanges);
        setDays(formattedDates);
        console.log(days);
    };

    // Function to check if two dates are consecutive
    const areConsecutiveDates = (first, second) => {
        const nextDay = new Date(first);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toDateString() === second.toDateString();
    };

    // Function to merge overlapping or consecutive date ranges
    const mergeDateRanges = (ranges) => {
        if (!ranges.length) return [];

        ranges.sort((a, b) => a.start - b.start);

        let merged = [ranges[0]];

        for (let i = 1; i < ranges.length; i++) {
            let lastMerged = merged[merged.length - 1];
            let current = ranges[i];

            if (current.start <= lastMerged.end ||
                areConsecutiveDates(lastMerged.end, current.start)) {
                lastMerged.end = new Date(Math.max(lastMerged.end, current.end));
            } else {
                merged.push(current);
            }
        }

        return merged;
    };

    const onDateClick = (value) => {
        const selectedDate = new Date(value);
        let newDates = dateRanges;
        
        //Check if the clicked date is part of an already existing range
        for (let i = 0; i<dateRanges.length; i++) {
            let current = dateRanges[i];
            let currStart = new Date(current.start);
            let currEnd = new Date(current.end);
            
            //If part of an existing range, remove it
            if (selectedDate > currStart && selectedDate < currEnd){
                const newDateRanges = [...dateRanges];
                newDateRanges.splice(i, 1);
                setDateRanges(newDateRanges);
                newDates = newDateRanges;
                setTempRange({ start: null, end: null});
                return;
            }

            else if (selectedDate.toDateString() === currStart.toDateString() && selectedDate.toDateString() === currEnd.toDateString()){
                const newDateRanges = [...dateRanges];
                newDateRanges.splice(i, 1);
                setDateRanges(newDateRanges);
                newDates = newDateRanges;
                setTempRange({ start: null, end: null});
                return;
            }

            //If at an endpoint of an existing range just remove the endpoint
            else if (selectedDate.toDateString() === currStart.toDateString()){
                current.start = new Date(currStart.setDate(currStart.getDate() + 1));
                setTempRange({ start: null, end: null});
                setDateRanges(mergeDateRanges(dateRanges, current));
                newDates = mergeDateRanges(dateRanges, current);
                return;
            }
            else if (selectedDate.toDateString() === currEnd.toDateString()){
                current.end = new Date(currEnd.setDate(currEnd.getDate() - 1));
                setTempRange({ start: null, end: null});
                setDateRanges(mergeDateRanges(dateRanges, current));
                newDates = mergeDateRanges(dateRanges, current);
                return;
            }

            //If adjacent to start date or end date of an existing range, expand existing range
            else if (areConsecutiveDates(selectedDate,currStart)){
                current.start = value;
                setTempRange({ start: null, end: null});
                setDateRanges(mergeDateRanges(dateRanges, current));
                newDates = mergeDateRanges(dateRanges, current);
                return;
            }
            else if(areConsecutiveDates(currEnd, selectedDate)){
                current.end = value;
                setTempRange({ start: null, end: null});
                setDateRanges(mergeDateRanges(dateRanges, current));
                newDates = mergeDateRanges(dateRanges, current);
                return;
            }
        }

        if (!tempRange.start || (tempRange.start && tempRange.end)){
            setTempRange({ start: value, end: null });
        } 
        else {
            // Add the new range and merge if necessary
            const newRange = { start: tempRange.start, end: value };
            setDateRanges(mergeDateRanges([...dateRanges, newRange]));
            newDates = mergeDateRanges([...dateRanges, newRange]);
            setTempRange({ start: null, end: null });
        }
        
        updateDateRanges(newDates);
    };

    const isDateInRange = (date) => {
        return dateRanges.some(range => 
            date >= range.start && date <= range.end
        );
    };

    

    return (
        <div className='CalendarSelectionFrame'>
            <Calendar
                onClickDay={onDateClick}
                tileClassName={({ date, view }) => {
                    if (view === 'month' && isDateInRange(date)) {
                        return 'in-range'; // Custom styling for dates in range
                    }
                }}
                tileDisabled={({ date }) => {
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);
                
                    if (date < currentDate) {
                        return true;
                    }
                }}
                prev2Label={null}
                next2Label={null}
                showFixedNumberOfWeeks={true}
                maxDetail='month'
                minDetail='month'
                formatShortWeekday={(locale, value) => ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][value.getDay()]}
                
            />
            {/* Display merged ranges */}
            <div>
                {dateRanges.map((range, index) => (
                    <div key={index}>
                        {range.start.toLocaleDateString()} - {range.end.toLocaleDateString()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarSelectionFrame;




