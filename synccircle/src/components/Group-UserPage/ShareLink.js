import React, { useState, useContext } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { AppContext } from "../../context/AppContext";

function ShareLink() {
    const { first } = useContext(AppContext);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

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
                <button className="ScheduleTimeBtn">Schedule Time</button>
                </div>}
        </div>

    )
}

export default ShareLink;