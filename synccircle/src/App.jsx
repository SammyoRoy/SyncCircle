import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEventPage from './components/CreateEventPage/CreateEventPage.jsx';
import UserPage from './components/Group-UserPage/UserPage.jsx';
import GroupPage from './components/Group-UserPage/GroupPage.jsx';
import { LandingPage } from './components/LandingPage/LandingPage.jsx';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.jsx';
import Settings from './components/Settings/Settings.jsx';
import Groups from './components/Groups/Groups.jsx';
import ProtectedRoute from './components/SharedComponents/ProtectedRoute.js';
import usePageTracking from './firebaseConfig.js';
import { IndexContext } from './context/IndexContext.js';

function PageTracker() {
  usePageTracking();
  return null;
}

function App() {
  const [leaveMessage, setLeaveMessage] = useState('');
  const [googleUser, setGoogleUser] = useState(null);
  const [token, setToken] = useState('');
  return (
    <IndexContext.Provider value={{ leaveMessage, setLeaveMessage, googleUser, setGoogleUser, token, setToken }}>
    <Router>
      <PageTracker /> 
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/group/:group" element={<UserPage/>} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
    </IndexContext.Provider>
  );
}

export default App;
