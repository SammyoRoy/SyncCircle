import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateEventPage from './components/CreateEventPage/CreateEventPage.jsx';
import UserPage from './components/Group-UserPage/UserPage.jsx';
import GroupPage from './components/Group-UserPage/GroupPage.jsx';

function App() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<CreateEventPage />} />
            <Route path="/group/:group" element={<UserPage/>} />
            <Route path="/group/:group/ALL" element={<GroupPage/>} />
          </Routes>
        </div>
      </Router>
    );
  }
  

export default App;