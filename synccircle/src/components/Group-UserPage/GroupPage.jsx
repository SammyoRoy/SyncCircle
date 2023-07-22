import React, { useState, useContext } from "react";
import { AppContext } from "./AppContext";
import UserTitle from "./UserTitle";
import GroupCalendar from "./GroupCalender";
import GroupHeader from "./GroupHeader";
import Copy from "./copy.png";

function GroupPage() {
  const { groupId, userId } = useContext(AppContext);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // 2000 milliseconds (2 seconds) delay before hiding the "copied" text
  };

  return (
    <div className="LightMode">
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasGroup"
        aria-labelledby="offcanvasGroupLabel"
      >
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        <div className="offcanvas-header">
          <UserTitle />
        </div>
        <div className="offcanvas-body">
          <div className="share-link">
            <h5>Invite Your Friends</h5>
            <h6>
              Copy Link to Clipboard:{" "}
              <button className="btn" onClick={handleCopyClick}>
                <img src={Copy} />
              </button>{" "}
              {isCopied && <span style={{ color: "green" }}>Copied</span>}
            </h6>
          </div>
          <GroupHeader />
          <GroupCalendar />
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
