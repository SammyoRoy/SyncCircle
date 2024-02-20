import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const EventsHeader = () => {
  const navigate = useNavigate();
  return (
    <div className='EventsHeader'>
        <h1>Events</h1>
        <div className='HomeIcon' onClick={() => navigate('/')} >
          <HomeIcon sx={{ width: '30px', height: '30px', color: '#297050'}} />
        </div>
    </div>
  )
}

export default EventsHeader