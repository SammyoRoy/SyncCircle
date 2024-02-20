import React from 'react'
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button type="submit" className="CreateEventBtnEvent" onClick={() => (navigate('/create'))}>Create Event</button>
    </div>
  )
}

export default AddEvent