import React, { useEffect, useState } from "react";
import EnterEventNameForm from './EnterEventNameForm.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import './CreateEventPageStyle.css';


function Title() {
    return (
        <h2 className="Title"> SyncCircle</h2>
    );
}

function LightMode() {
    return (
        <div className="LightMode"></div>
    )
}

function EventNameForm() {
    return (
        <form>
            <input className ="EventNameForm" type="text" placeholder="Enter event name" />
        </form>
    )
}

function TimeDropdown({style}) {
    const timeOptions = [
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
    ];
    
    const [selectedTime, setSelectedTime] = useState('');
    function handleTimeChange(event) {
        setSelectedTime(event.target.value);
    }

    return (
        <div className="TimeSelectionFrame">


            <label htmlFor="time-select"></label>
            <select className={style} id="time-select" value={selectedTime} onChange={handleTimeChange}>
                <option value="">Select a time</option>
                {timeOptions.map(time => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>

        </div>
    );
}

      



export default function CreateEventPage() {
    return (
        <div className="LightMode">

            
            <Title />
            <div className="Backdrop">
                <EventNameForm /> 
                <TimeDropdown style={"TimeSelectionDropdown"}/>
                <TimeDropdown style={"TimeSelectionDropdown2"}/>

            </div>

        </div>
    );
}


// const title = <title>SyncCircle</title>;
// const groupStores = localStorage.getItem("group");
// const userStores = localStorage.getItem("user");
// let groupName;
// let userName;
// if (groupStores != null) {
//     groupName = groupStores;
// }
// else {
//     groupName = "";
// }
// if (userStores != null) {
//     userName = userStores;
// }
// else {
//     userName = "";
// }

// function CreateEventPage() {
//     const nav = useNavigate();

//     function handleSubmit(event) {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const group = formData.get('Group Title');
//         groupName = group;
//         localStorage.setItem("group", groupName);
//         axios.post(`http://localhost:4000/create?group=${group}`)
//             .then(response => {
//                 // navigate to /group page
//                 nav(`/group/${response.data}`);
//             })
//             .catch(error => {
//                 // handle the error
//                 console.error(error);
//             });
//     }
//     //HTML for the landing page of the site
//     return (
//         <html>
//             <head>
//                 {title}
//             </head>
//             <body>
//                 <center><h1>SyncCircle</h1></center>
//                 <center>
//                     {/*Sends the submitted entry from the button to handleSubmit function*/}
//                     <form onSubmit={handleSubmit} className={EnterEventNameForm}>
//                         <h2>Enter Your Group</h2>
//                         <label>
//                             Group Title:
//                             <input type="text" name="Group Title" className={EnterEventNameForm} />
//                         </label>
//                         <button type="submit" className={EnterEventNameForm}>Submit</button>
//                     </form>
//                 </center>
//             </body>
//         </html>
//     );
// }

//export default CreateEventPage;