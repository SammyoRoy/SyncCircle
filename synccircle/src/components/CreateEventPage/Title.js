import React from 'react'
import { useNavigate } from 'react-router'

const Title = () => {
  const navigate = useNavigate();
  return (
        <h2 className="Title" onClick={() => navigate('/')} > SyncCircle</h2>
  )
}

export default Title