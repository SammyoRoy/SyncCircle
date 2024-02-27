import { Container, ToggleButtonGroup, ToggleButton, TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const FeedbackBox = () => {
    const [selected, setSelected] = useState('bug');
    const [feedback, setFeedback] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (newSelection) => {
        setSelected(newSelection);
    };

    const handleTextChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API_URL}/feedback`, {
            type: selected,
            feedback: feedback,
        })
            .then((response) => {
                console.log(response);
                setFeedback('');
                setSelected('bug');
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div className='FeedbackBox' style={{ padding: '20px', width: '100%' }}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                {['bug', 'idea', 'thoughts'].map((type) => (
                    <button
                        key={type}
                        onClick={() => handleChange(type)}
                        style={{
                            flex: 1,
                            fontFamily: 'Inter',
                            padding: '10px 15px',
                            margin: '0 2px',
                            border: '1px solid #ccc',
                            background: selected === type ? '#70D474' : '#f7f7f7',
                            color: selected === type ? '#f7f7f7' : '#242526',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
            <textarea
                rows={4}
                placeholder="Enter your feedback here"
                value={feedback}
                onChange={handleTextChange}
                style={{
                    width: '100%',
                    fontFamily: 'Inter',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginBottom: '10px'
                }}
            />
            <button
                onClick={handleSubmit}
                style={{
                    width: '100%',
                    padding: '10px 15px',
                    fontFamily: 'Inter',
                    border: 'none',
                    borderRadius: '4px',
                    background: '#70D474',
                    color: '#f7f7f7',
                    cursor: 'pointer',
                }}
            >
                Submit Feedback
            </button>
        </div>
    )
}

export default FeedbackBox;
