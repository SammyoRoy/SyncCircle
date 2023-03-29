import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const title = <title>SyncCircle</title>;

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const group = formData.get('Group Title');
  axios.post('https://localhost:4000/create?group=' + group)
  .then(response => {
    console.log("Hi");
    // do something with the response
  })
  .catch(error => {
    console.error(error);
    // handle the error
  });
}

ReactDOM.render(
  <html>
    <head>
      {title}
    </head>
    <body>
      <center><h1>SyncCircle</h1></center>
      <center>
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
  </html>,
  document.getElementById('root')
);


