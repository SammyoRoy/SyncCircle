import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
        // Check if the clicked date is the start of any existing range
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
        }
    };

    const isDateInRange = (date) => {
        return dateRanges.some(range => 
            date >= range.start && date <= range.end
        );
    };

    return (
        <div>
            <Calendar
                onClickDay={onDateClick}
                tileClassName={({ date, view }) => {
                    if (view === 'month' && isDateInRange(date)) {
                        return 'in-range'; // Custom styling for dates in range
                    }
                }}
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




