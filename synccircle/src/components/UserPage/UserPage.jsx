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

export default function User(props){
    const eventName = props.eventName; 
    console.log(eventName); 
    function Title(){
        return(
            <div className="title">
                <h1>{eventName}</h1>
            </div>
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
    return(
        <div className="User">
            <Title />
            <UserNameForm />
        </div>
    )
}
