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
let groupName = "";

//Handles the submit button and transforms the inputed group name to a unique group site the user is taken to
function CreateGroup() {
  const nav = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const group = formData.get('Group Title');
    groupName = group;
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
    width: 'calc(25% / 7)',
    boxSizing: 'border-box',
  };
  //HTML for the group site
  return (
    <div>
      <center><h1>{groupName.toUpperCase()}</h1></center>
      <center><p>Share this link to invite your friends! : {window.location.href}</p></center>
      {/*Table for the group hours*/}
      <center><table style={tableStyle}>
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
      </table></center>
    </div>
  );
}
//Renders the site based on user input
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<CreateGroup />} />
      <Route path="/group/:group" element={<Group />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
