import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function EventNameForm({ OnEventNameChange }) {
  const { eventTrigger, eventName } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.eventName.value;
    OnEventNameChange(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="EventNameForm">
      <input
        className="EventNameInput"
        type="text"
        placeholder="Enter Event Name"
        name="eventName"
        onChange={(e) => {
          OnEventNameChange(e.target.value);
        }}
        required
      />
    </form>
  );
}

export default EventNameForm;
