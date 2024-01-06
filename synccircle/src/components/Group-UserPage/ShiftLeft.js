import React, { useContext } from "react"
import { AppContext } from "../../context/AppContext";

function ShiftLeft() {
    const {startColumn, setStartColumn } = useContext(AppContext);

    const handleClick = () => {
        if (startColumn > 0){
            setStartColumn(startColumn-1);
            console.log(startColumn);
        }
    }
    return (
        <button className="ShiftLeft" onClick={handleClick} disabled={startColumn == 0}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="#297045" strokeWidth="2" />
            </svg>
        </button>
    )
}

export default ShiftLeft;