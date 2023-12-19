import React, { useState } from 'react';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';

const CalendarSelectionFrame = () => {
    const [dateRanges, setDateRanges] = useState([]);
    const [tempRange, setTempRange] = useState({ start: null, end: null });

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
        
        //Check if the clicked date is part of an already existing range
        for (let i = 0; i<dateRanges.length; i++) {
            let current = dateRanges[i];
            let currStart = new Date(current.start);
            let currEnd = new Date(current.end);
            
            //If part of an existing range, remove it
            if (selectedDate >= currStart & selectedDate <= currEnd){
                const newDateRanges = [...dateRanges];
                newDateRanges.splice(i, 1);
                setDateRanges(newDateRanges);
                setTempRange({ start: null, end: null});
                return;
            }

            //If adjacent to start date or end date of an existing range, expand existing range
            else if (areConsecutiveDates(selectedDate,currStart)){
                current.start = value;
                setTempRange({ start: null, end: null});
                setDateRanges(mergeDateRanges(dateRanges, current));
                return;
            }
            else if(areConsecutiveDates(currEnd, selectedDate)){
                current.end = value;
                setTempRange({ start: null, end: null});
                setDateRanges(mergeDateRanges(dateRanges, current));
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
            setTempRange({ start: null, end: null });
        }
        
        /*// Check if the clicked date is the start of any existing range
        const rangeIndex = dateRanges.findIndex(range => range.start.toDateString() === value.toDateString());

        if (rangeIndex > -1) {
            // Remove the range if the start date is clicked
            const newDateRanges = [...dateRanges];
            newDateRanges.splice(rangeIndex, 1);
            setDateRanges(newDateRanges);
        } else if (!tempRange.start || (tempRange.start && tempRange.end)) {
            setTempRange({ start: value, end: null });
        } else {
            // Add the new range and merge if necessary
            const newRange = { start: tempRange.start, end: value };
            setDateRanges(mergeDateRanges([...dateRanges, newRange]));
            setTempRange({ start: null, end: null });
        }*/
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




