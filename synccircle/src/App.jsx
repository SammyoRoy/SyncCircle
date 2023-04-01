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

function App() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<CreateEventPage />} />
          </Routes>
  
        </div>
      </Router>
    );
  }
  

export default App;