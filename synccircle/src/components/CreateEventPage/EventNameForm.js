import React from "react";

function EventNameForm({OnEventNameChange}) {
    
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page refresh
        const inputValue = e.target.elements.eventName.value;
        OnEventNameChange(inputValue);
        console.log(inputValue);
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <input
            className="EventNameForm"
            type="text"
            placeholder="Enter event name"
            name ="eventName"
            onChange={(e) => OnEventNameChange(e.target.value)}
          />
        </form>
      );
}

export default EventNameForm;