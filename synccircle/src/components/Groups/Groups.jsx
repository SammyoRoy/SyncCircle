import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsHeader from './EventsHeader';
import GroupCards from './GroupCards';
import { IndexContext } from '../../context/IndexContext';
import './Groups.css';

const Groups = () => {
  const { googleUser } = useContext(IndexContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (googleUser === null && sessionStorage.getItem('googleUser') === null){
      navigate('/');
    }
  }, [googleUser]);

  return (
    <div>
      <EventsHeader />
      <div className="GroupCardContainer">
        <GroupCards />
      </div>
    </div>
  )
}

export default Groups;
