import React from 'react';
import EventsHeader from './EventsHeader';
import GroupCards from './GroupCards';
import './Groups.css';

const Groups = () => {
  return (
    <div>
      <EventsHeader />
      <div className="GroupCardContainer">
        <GroupCards />
      </div>
    </div>
  )
}

export default Groups