import React, {useContext} from "react";
import { AppContext } from "../../context/AppContext";

function EventNameForm({OnEventNameChange}) {
    const {eventTrigger} = useContext(AppContext);
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page refresh
        const inputValue = e.target.elements.eventName.value;
        OnEventNameChange(inputValue);
        console.log(inputValue);
      };
    
      return (
        <form onSubmit={handleSubmit} className="EventNameForm"
        style = {eventTrigger? {border: "4px solid #b32121"} : null}>
          <input
            className={eventTrigger? "EventNameInput EventNameInputRed" : "EventNameInput"}
            type="text"
            placeholder={eventTrigger? "REQUIRED: Enter Event Name" : "Enter Event Name"}
            name ="eventName"
            onChange={(e) => OnEventNameChange(e.target.value)}
            required
          />
        </form>
      );
}

export default EventNameForm;