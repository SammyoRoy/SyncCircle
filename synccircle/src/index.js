import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

//Defining variables in the Title of the site and name of the group
const title = <title>SyncCircle</title>;
const groupStores = localStorage.getItem("group");
const userStores = localStorage.getItem("user");
let groupName;
let userName;
if (groupStores != null){
  groupName = groupStores;
}
else{
  groupName = "";
}
if (userStores != null){
  userName =userStores;
}
else{
  userName = "";
}
//Handles the submit button and transforms the inputed group name to a unique group site the user is taken to
function CreateGroup() {
  const nav = useNavigate();

  function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const group = formData.get('Group Title');
    groupName = group;
    localStorage.setItem("group", groupName);
    axios.post(`http://localhost:4000/create?group=${group}`)
    .then(response => {
      // navigate to /group page
      nav(`/group/${response.data}`);
    })
    .catch(error => {
      // handle the error
      console.error(error);
    });
  }
  //HTML for the landing page of the site
  return (
    <html>
      <head>
        {title}
      </head>
      <body>
        <center><h1>SyncCircle</h1></center>
        <center>
          {/*Sends the submitted entry from the button to handleSubmit function*/}
          <form onSubmit={handleSubmit}>
            <h2>Enter Your Group</h2>
            <label>
              Group Title:
              <input type="text" name="Group Title" />
            </label>
            <button type="submit">Submit</button>
          </form>
        </center>
      </body>
    </html>
  );
}
//Unique Group site 
function Group() {

  const tableStyle = {
    borderCollapse: 'collapse',
    border: '1px solid black',
  };

  const cellStyle = {
    border: '1px solid black',
    height: '25px',
    width: 'calc(100px/7)',
    boxSizing: 'border-box',
  };
  const nav = useNavigate();
  //userSubmit function to handle when new user is created and creates a unique webpage for that user
  function userSubmit(event){   
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = formData.get('Username');
    userName = user;
    localStorage.setItem("user", userName);
    axios.post(`http://localhost:4000/create?group=${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}=user=${user}`)
    .then(response => {
      // navigate to /group page
      nav(`/group/${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}/user/${response.data}`);
    })
    .catch(error => {
      // handle the error
      console.error(error);
    }); 
  }
  //HTML for the group site
  return (
    <div>
      <center><h1>{groupName.toUpperCase()}</h1></center>
      <center><p>Share this link to invite your friends! : <a href={window.location.href}>{groupName.toUpperCase()}.link</a></p></center>
      {/*Table for the group hours*/}
      <form onSubmit ={userSubmit}>
        <h2>Enter Your Username</h2>
        <label>Username:
          <input type="text" name="Username"/>
        </label>
        <button type="submit">Submit</button> 
      </form>
      <table style={tableStyle} align="right">
        <thead>
          <tr>
            <th style={cellStyle}>HOURS AVAILABLE</th>
            <th style={cellStyle}>Monday</th>
            <th style={cellStyle}>Tuesday</th>
            <th style={cellStyle}>Wednesday</th>
            <th style={cellStyle}>Thursday</th>
            <th style={cellStyle}>Friday</th>
            <th style={cellStyle}>Saturday</th>
            <th style={cellStyle}>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(24)].map((_, i) => (
            <tr key={i}>
              <td style={cellStyle}>
                <center>{`${i}:00 - ${i + 1}:00`}</center>
              </td>
              {[...Array(7)].map((_, j) => (
                <td key={j} style={cellStyle}>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
//Unique User site
function User(){
  const tableStyle = {
    borderCollapse: 'collapse',
    border: '1px solid black',
  };

  const cellStyle = {
    border: '1px solid black',
    height: '25px',
    width: 'calc(100px/7)',
    boxSizing: 'border-box',
  };
  return (
    <div>
      <center><h1>Welcome {userName}!</h1></center>
      {/*table for user hours*/}
      <h2 align="left">Sammyo ADD THE USER TABLE HERE</h2>
      {/*Table for the group hours*/}
      <table style={tableStyle} align="right">
        <thead>
          <tr>
            <th style={cellStyle}>HOURS AVAILABLE</th>
            <th style={cellStyle}>Monday</th>
            <th style={cellStyle}>Tuesday</th>
            <th style={cellStyle}>Wednesday</th>
            <th style={cellStyle}>Thursday</th>
            <th style={cellStyle}>Friday</th>
            <th style={cellStyle}>Saturday</th>
            <th style={cellStyle}>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(24)].map((_, i) => (
            <tr key={i}>
              <td style={cellStyle}>
                <center>{`${i}:00 - ${i + 1}:00`}</center>
              </td>
              {[...Array(7)].map((_, j) => (
                <td key={j} style={cellStyle}>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ); 

}
//Renders the site based on user input
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<CreateGroup />} />
      <Route path="/group/:group" element={<Group />} />
      <Route path="/group/:group/user/:user" element={<User />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
