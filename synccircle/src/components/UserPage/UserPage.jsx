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

function Title(){
    return(
        <div className="title">
            <h1>${EventNameForm}</h1>
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
