import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IndexContext } from '../../context/IndexContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const Settings = () => {
  const { googleUser } = useContext(IndexContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (googleUser === null) {
      navigate('/');
    }
  }, [googleUser]);
  return (
    <div>Settings</div>
  )
}

export default Settings