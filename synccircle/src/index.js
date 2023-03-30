import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const title = <title>SyncCircle</title>;

function CreateGroup() {
  const nav = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const group = formData.get('Group Title');
    axios.post('http://localhost:4000/create?group=' + group)
    .then(response => {
      console.log(response.data);
      // navigate to /group page
      nav('/group');
    })
    .catch(error => {
      console.error(error);
      // handle the error
    });
  }

  return (
    <html>
      <head>
        {title}
      </head>
      <body>
        <center><h1>SyncCircle</h1></center>
        <center>
          <form onSubmit={(event) => handleSubmit(event,nav)}>
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

  return (
    <div>
      <center><h1>Group Page</h1></center>
      <center><p>Welcome to the group page!</p></center>
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



ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<CreateGroup />} />
      <Route path="/group" element={<Group />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
