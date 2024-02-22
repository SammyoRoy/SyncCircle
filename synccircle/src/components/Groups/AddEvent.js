import React from 'react'
import { useNavigate } from 'react-router-dom';

const AddEvent = ({rendered}) => {
    const navigate = useNavigate();
  return (
    <div>
        {rendered && <button type="submit" className="CreateEventBtnEvent" onClick={() => (navigate('/create'))}>Create</button>}
    </div>
  )
}

export default AddEvent