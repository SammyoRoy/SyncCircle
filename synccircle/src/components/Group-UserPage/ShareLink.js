import React, { useState, useContext } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { AppContext } from "../../context/AppContext";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

function ShareLink() {
    const { first, scheduleCheck, setScheduleCheck } = useContext(AppContext);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const handleScheduleClick = () => {
        setScheduleCheck(true);
    }

    const handleExit = () => {
        setScheduleCheck(false);
    }

    const handleConfirm = () => {
        setScheduleCheck(false);
    }
    return (
        <div className="ShareHolder">
            <div className="ShareLink">
                <h5 className="InviteFriends">Invite Your Friends!</h5>
                <div className="LinkContainer">
                    <button className="CopyButton" onClick={handleCopyClick}>
                        {!isCopied && <ContentCopyIcon className="CopyIcon" fontSize="medium" />}
                        {isCopied && <div style={{ marginLeft: "25%", fontSize: "medium" }}>Copied</div>}
                    </button>
                </div>
            </div>
            {first && <div className="CreateTime">
                {!scheduleCheck && <button className="ScheduleTimeBtn" onClick={handleScheduleClick}>Schedule Time</button>}
                {scheduleCheck && <div className="Scheduler">
                    <h5 className="ScheduleTitle">Schedule Time</h5>
                    <div className="Btns">
                        <button className="ExitButton" onClick={handleExit}><CloseIcon /></button>
                        <button className="ConfirmButton" onClick={handleConfirm}><CheckIcon /></button>
                    </div>
                </div>}
            </div>}
        </div>

    )
}

export default ShareLink;