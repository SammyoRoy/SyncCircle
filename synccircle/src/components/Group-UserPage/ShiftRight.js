import React, { useState, useContext, useEffect } from "react"
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ShiftRight() {
    const { startColumn, setStartColumn, MAX_COLUMNS_DISPLAYED } = useContext(AppContext);
    const API_URL = process.env.REACT_APP_API_URL;
    const [days, setDays] = useState([]);

    useEffect(() => {
        // Combine fetching of days, start, and end into a single function
        async function fetchData() {
            const URL = window.location.href.split("/");
            const response = await axios.get(`${API_URL}/groups/${URL[URL.length - 1]}`);
            setDays(response.data.days);
        }

        fetchData();
    }, []);


    const handleClick = () => {
        if ((startColumn+MAX_COLUMNS_DISPLAYED*2) < days.length){
            setStartColumn(startColumn + MAX_COLUMNS_DISPLAYED);
        }
        else if (startColumn < (days.length - MAX_COLUMNS_DISPLAYED)){
            setStartColumn(startColumn + 1);
        }

       //console.log(startColumn);
    }

    return (
        <button className="ShiftRight" onClick={handleClick} disabled={startColumn >= days.length - MAX_COLUMNS_DISPLAYED}>
            {/**<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="#297045" strokeWidth="2" />
    </svg>*/}
            <ArrowForwardIosIcon sx={{ width: '12px', height: '12px', color: '#297050' }} />
        </button>
    )
}

export default ShiftRight;