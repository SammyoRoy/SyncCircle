import React, { useContext } from "react"
import { AppContext } from "../../context/AppContext";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function ShiftLeft() {
    const { startColumn, setStartColumn, MAX_COLUMNS_DISPLAYED } = useContext(AppContext);


    const handleClick = () => {
        if ((startColumn+1-MAX_COLUMNS_DISPLAYED) > 0){
            setStartColumn(startColumn-MAX_COLUMNS_DISPLAYED);
        }
        else if (startColumn > 0) {
            setStartColumn(startColumn - 1);
        }
    }

    return (
        <button className={startColumn == 0? "ShiftLeft None": "ShiftLeft"} onClick={handleClick} disabled={startColumn == 0}>
            {/**<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="#297045" strokeWidth="2" />
            </svg>*/}
            <ArrowBackIosIcon sx={{ width: '12px', height: '12px', color: startColumn != 0? '#297050': 'transparent'}}/>
        </button>
    )
}

export default ShiftLeft;