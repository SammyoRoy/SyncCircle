import React, { useState } from "react";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function SpecificDaysToggle({ setIsDaysOftheWeek, setIsCalendar, isDaysOfTheWeek }) {
    const [isToggled, setIsToggled] = useState(false);
    console.log(isToggled);

    const handleToggle = () => {
        if (isToggled) {
            setIsToggled(false);
            setIsDaysOftheWeek(false);
            setIsCalendar(true);


        }
        else {
            setIsToggled(true)
            setIsDaysOftheWeek(true);
            setIsCalendar(false);
        }
    };


    return (
        <div className="SpecificDaysToggle">
            <label>
                <Toggle
                    defaultChecked={isToggled}
                    icons={false}
                    onChange={handleToggle} />
                {!isDaysOfTheWeek && <span>Days of the Week</span>}
                {isDaysOfTheWeek && <span>Calendar</span>}
            </label>
        </div>
    )
}

export default SpecificDaysToggle;