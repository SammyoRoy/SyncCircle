import React from 'react';
import logo from './SyncCircle192.png'; 
import { useNavigate } from 'react-router';

const SyncCircleButton = () => {
    const navigate = useNavigate();
  return (
    <div className="sync-circle-button">
      <button onClick={() => navigate('/')} style={{ 
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}>
        <img src={logo} alt="SyncCircle" style={{ maxWidth: '100%', height: 'auto' }} /> 
      </button>
    </div>
  );
};

export default SyncCircleButton;
