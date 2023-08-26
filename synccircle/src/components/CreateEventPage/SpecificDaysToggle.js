import React, { useState } from "react";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function SpecificDaysToggle({setIsDaysOftheWeek}) {
    const [isToggled, setIsToggled] = useState(false);
    console.log(isToggled);

    const handleToggle = () => {
        if (isToggled){
            setIsToggled(false);
            setIsDaysOftheWeek(false);
        
        }
        else{
            setIsToggled(true)
            setIsDaysOftheWeek(true);
        }
    };


    return (
        <label>
            <Toggle
                defaultChecked={isToggled}
                icons={false}
                onChange={handleToggle} />
            <span>Days of the Week</span>
        </label>
    )
}

export default SpecificDaysToggle;