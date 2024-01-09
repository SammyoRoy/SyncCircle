import React, { useContext } from "react"
import { AppContext } from "../../context/AppContext";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function ShiftLeft() {
    const { startColumn, setStartColumn, MAX_COLUMNS_DISPLAYED } = useContext(AppContext);


    const handleClick = () => {
        if ((startColumn-MAX_COLUMNS_DISPLAYED*2) > 0){
            setStartColumn(startColumn-MAX_COLUMNS_DISPLAYED);
        }
        else if (startColumn > 0) {
            setStartColumn(startColumn - 1);
        }
    }

    return (
        <button className="ShiftLeft" onClick={handleClick} disabled={startColumn == 0}>
            {/**<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="#297045" strokeWidth="2" />
            </svg>*/}
            <ArrowBackIosIcon sx={{ width: '12px', height: '12px', color: '#297050' }}/>
        </button>
    )
}

export default ShiftLeft;