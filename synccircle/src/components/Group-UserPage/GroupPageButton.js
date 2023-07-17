import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GroupPageButton() {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/group/${window.location.href.split("/")[window.location.href.split("/").length - 1]}/ALL`);
    };
    return (
      <div>
        <button className="GroupPageButton" type="button" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
            <path d="M8.36273 13.75C10.7002 13.75 12.4877 11.9625 12.4877 9.625C12.4877 7.2875 10.7002 5.5 8.36273 5.5C6.02523 5.5 4.23773 7.2875 4.23773 9.625C4.23773 11.9625 6.02523 13.75 8.36273 13.75ZM12.4877 15.8125H4.23773C1.90023 15.8125 0.112732 17.6 0.112732 19.9375V22H16.6127V19.9375C16.6127 17.6 14.8252 15.8125 12.4877 15.8125ZM13.7252 8.25H13.8627C16.2002 8.25 17.9877 6.4625 17.9877 4.125C17.9877 1.7875 16.2002 0 13.8627 0C11.5252 0 9.73773 1.7875 9.73773 4.125V4.2625C11.6627 4.8125 13.1752 6.325 13.7252 8.25ZM17.9877 10.3125H13.8627C13.5877 12.1 12.6252 13.6125 11.1127 14.4375H12.4877C14.2752 14.4375 15.7877 15.2625 16.7502 16.5H22.1127V14.4375C22.1127 12.1 20.3252 10.3125 17.9877 10.3125Z" fill="white" />
          </svg>
        </button>
      </div>
    )
  }

  export default GroupPageButton;
  