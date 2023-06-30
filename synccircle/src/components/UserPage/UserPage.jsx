import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import './UserPage.css';
import CreateEventPage from "../CreateEventPage/CreateEventPage.jsx";


function Title() {

    // const [eventName, setEventName] = useState("");

    // useEffect(() => {
    //     axios.post(`http://localhost:4000/display?group=${groupId}`)
    //     .then((response) => {
    //         // navigate to /group pages
    //         setEventName(response.data);
    //         console.log(eventName);

    //     })
    //     .catch((error) => {
    //         // handle the error
    //         console.error(error);
    //     });
    //   }, [groupId]);


    return (
        <h2 className="UserPageTitle"> Nithin's Birthday </h2>
    )
}

function UserNameForm(){
  return (
    <div className="UserNameContainer">
      <form>
        <input
          className="UserNameForm"
          type="text"
          placeholder="Enter username"
        />
      </form>
      <JoinButton />
    </div>
  )
}

function JoinButton(){
  return (
    <button type="submit" className="JoinButton">Join</button>
  )
}

function DaysOfTheWeek(){

}

function DayLabels(){

}

function HeaderCard(){

  return (
      <div className= "HeaderCard">
        <UserNameForm />
        
      </div>
  )


}


// function UserNameForm({ OnUserNameChange }) {

//     const handleSubmit = (e) => {
//         e.preventDefault(); // prevent page refresh
//         OnUserNameChange(e.target.value);
//         // Create user
//     };

//     return (
//         <div className="UserNameContainer">
//             <form onSubmit={handleSubmit} >
//                 <input
//                     className="UserNameForm"
//                     type="text"
//                     placeholder="Enter username"
//                     onChange={(e) => OnUserNameChange(e.target.value)}
//                 />
//                 <input 
//                     className="JoinButton"
//                     type="submit"
                    
//                 />
//             </form>
//         </div>
//     );
// }


function Calendar(){

}

function GroupPageButton() {

}


function UserPage(){

    return(
        <div className="LightMode">
            <Title/>
            <HeaderCard />
            <Calendar />
            <GroupPageButton />
       </div>
    )
}

export default UserPage;