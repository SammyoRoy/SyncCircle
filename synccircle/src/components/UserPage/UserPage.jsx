import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import CreateEventPage from "../CreateEventPage/CreateEventPage.jsx";

function Title() {
    return (
        <h2 className="Title"> EventName </h2> 
    )
}



function UserNameForm(){
    return(
        <div className="UserNameForm">
            <form>
                <input type="text" placeholder="Enter your name" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

function DaysOfTheWeek(){

}

function Calendar(){

}

function GroupPageButton(){

}



function UserPage(){

    return(
        <div className="LightMode">
            <Title />
            <div className="HeaderCard">
                <UserNameForm />
                <DaysOfTheWeek />
            </div>
            <Calendar />
            <GroupPageButton />
        </div>
    )
}

export default UserPage;
