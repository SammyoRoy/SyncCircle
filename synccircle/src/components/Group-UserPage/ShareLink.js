import React, { useState, useContext } from "react";
import { AppContext } from "./AppContext";

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

                <h6 className="Link"> {window.location.href}</h6>
                <button className="CopyButton" onClick={handleCopyClick}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 7V7C14 6.06812 14 5.60218 13.8478 5.23463C13.6448 4.74458 13.2554 4.35523 12.7654 4.15224C12.3978 4 11.9319 4 11 4H8C6.11438 4 5.17157 4 4.58579 4.58579C4 5.17157 4 6.11438 4 8V11C4 11.9319 4 12.3978 4.15224 12.7654C4.35523 13.2554 4.74458 13.6448 5.23463 13.8478C5.60218 14 6.06812 14 7 14V14" stroke="#33363F" stroke-width="2" />
                        <rect x="10" y="10" width="10" height="10" rx="2" stroke="#33363F" stroke-width="2" />
                    </svg>


                </button>
                {isCopied && <span style={{ color: "green" }}>Copied</span>}
            </div>
        </div>
    )
}

export default ShareLink;