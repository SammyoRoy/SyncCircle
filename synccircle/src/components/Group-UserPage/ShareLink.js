import React, { useState} from "react";
import axios from "axios";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function ShareLink() {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000); // 2000 milliseconds (2 seconds) delay before hiding the "copied" text
    };

    return (
        <div className="ShareLink">
            <h5 className="InviteFriends">Invite Your Friends!</h5>
            <div className="LinkContainer">
                <button className="CopyButton" onClick={handleCopyClick}>
                    <ContentCopyIcon className="CopyIcon" fontSize="medium"/>
                </button>
            </div>
        </div>
    )
}

export default ShareLink;