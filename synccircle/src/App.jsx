import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEventPage from './components/CreateEventPage/CreateEventPage.jsx';
import UserPage from './components/Group-UserPage/UserPage.jsx';
import GroupPage from './components/Group-UserPage/GroupPage.jsx';
import { LandingPage } from './components/LandingPage/LandingPage.jsx';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.jsx';
import usePageTracking from './firebaseConfig.js';
import { IndexContext } from './context/IndexContext.js';

function PageTracker() {
  usePageTracking();
  return null;
}

function App() {
  const [leaveMessage, setLeaveMessage] = useState('');
  const [googleUser, setGoogleUser] = useState(null);
  return (
    <IndexContext.Provider value={{ leaveMessage, setLeaveMessage, googleUser, setGoogleUser }}>
    <Router>
      <PageTracker /> 
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/group/:group" element={<UserPage/>} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
    </IndexContext.Provider>
  );
}

export default App;
