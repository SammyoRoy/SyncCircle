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

function App() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<CreateEventPage />} />
            <Route path="/group/:group" element={<UserPage/>} />
          </Routes>
  
        </div>
      </Router>
    );
  }
  

export default App;