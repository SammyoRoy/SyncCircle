import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";



import CreateEventPage from './components/CreateEventPage/CreateEventPage.jsx';
import UserPage from './components/UserPage/UserPage.jsx';
import GroupPage from './components/GroupPage/GroupPage.jsx';

function App() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<CreateEventPage />} />
            <Route path="/group/:group" element={<UserPage/>} />
            {/*<Route path="/group/:group/ALL" element={<GroupPage/>} />*/}
          </Routes>
  
        </div>
      </Router>
    );
  }
  

export default App;