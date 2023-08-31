import React, { useState } from "react";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function SpecificDaysToggle({ setIsDaysOftheWeek, isDaysOfTheWeek }) {
    const [isToggled, setIsToggled] = useState(false);
    console.log(isToggled);

    const handleToggle = () => {
        if (isToggled) {
            setIsToggled(false);
            setIsDaysOftheWeek(false);
        }
        else {
            setIsToggled(true)
            setIsDaysOftheWeek(true);
        }
    };


    return (
        <div className="SpecificDaysToggle">
            <label>
                <Toggle
                    defaultChecked={isToggled}
                    icons={false}
                    onChange={handleToggle} />
                <span>Days of the Week</span>
            </label>
        </div>
    )
}

export default SpecificDaysToggle;