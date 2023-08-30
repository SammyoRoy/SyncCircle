import React, {useState} from 'react'
import Calender from "react-calendar"
import 'react-calendar/dist/Calendar.css';

const CalendarSelectionFrame = () => {
    const [date, setDate] = useState([]);

    const onChange = date => {
        setDate(date);
    }
    console.log(date);
  return (
    <div className="DaySelectionFrame">
        <Calender onChange={onChange} value={date} selectRange={true} tileClassName={"react-calendar-button"}/>
    </div>
  )
}

export default CalendarSelectionFrame