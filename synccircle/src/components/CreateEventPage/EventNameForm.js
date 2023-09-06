import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function EventNameForm({ OnEventNameChange }) {
  const { eventTrigger, eventName } = useContext(AppContext);
  const [isNameTooLong, setIsNameTooLong] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.eventName.value;
    OnEventNameChange(inputValue);
  };

  console.log(isNameTooLong);

  return (
    <form onSubmit={handleSubmit} className="EventNameForm"
      style={eventTrigger ? { border: "4px solid #b32121" } : null}>
      <input
        className={eventTrigger ? "EventNameInput EventNameInputRed" : "EventNameInput"}
        type="text"
        placeholder={
          eventTrigger
            ? isNameTooLong
              ? "Event Name Too Long (30 Char Max)"
              : "REQUIRED: Enter Event Name"
            : "Enter Event Name"
        }
        name="eventName"
        onChange={(e) => {
          OnEventNameChange(e.target.value);
          if (e.target.value.length > 30) {
            setIsNameTooLong(true);
          } else {
            setIsNameTooLong(false);
          }
        }}
        required
      />
    </form>
  );
}

export default EventNameForm;
