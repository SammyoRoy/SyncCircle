import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateEventPage from './components/CreateEventPage/CreateEventPage.jsx';
import UserPage from './components/Group-UserPage/UserPage.jsx';
import GroupPage from './components/Group-UserPage/GroupPage.jsx';
import { LandingPage } from './components/LandingPage/LandingPage.jsx';
import AboutPage from './components/AboutPage/AboutPage.jsx';
import FeedbackPage from './components/FeedbackPage/FeedbackPage.jsx';

function App() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/group/:group" element={<UserPage/>} />
            <Route path="/create" element={<CreateEventPage />} />
            <Route path="/feedback" element={<FeedbackPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
          </Routes>
        </div>
      </Router>
    );
  }
  

export default App;