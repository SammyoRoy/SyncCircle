import React, {useContext} from 'react';
import { AppContext } from '../../context/AppContext';
function TimeDropdown({ OnTimeChange, label}) {
    const {startTrigger} = useContext(AppContext);
    const timeOptions = [
        '6:00 AM',
        '7:00 AM',
        '8:00 AM',
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
        '6:00 PM',
        '7:00 PM',
        '8:00 PM',
        '9:00 PM',
        '10:00 PM',
        '11:00 PM',
        '12:00 AM',
        '1:00 AM',
        '2:00 AM',
        '3:00 AM',
        '4:00 AM',
        '5:00 AM',
    ];
    return (
        <>
            <label htmlFor="time-select"></label>
            <select className="TimeSelectionDropdown" id="time-select" 
            onChange={(e) => OnTimeChange(e.target.value)}>
                <option value="">{label}</option>
                {timeOptions.map(time => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </>
    );
}

export default TimeDropdown;