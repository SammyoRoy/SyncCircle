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
  return (
    <div>
      <center><h1>Group Page</h1></center>
      <center><p>Welcome to the group page!</p></center>
      <table>

      </table>
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
