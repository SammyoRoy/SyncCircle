import { Container, ToggleButtonGroup, ToggleButton, TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const FeedbackBox = () => {
    const [selected, setSelected] = useState('bug');
    const [feedback, setFeedback] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (event, newSelection) => {
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
        <div className='FeedbackBox'>
            <ToggleButtonGroup
                color="success"
                value={selected}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="bug" sx={{backgroundColor:"#fff"}}>Bug</ToggleButton>
                <ToggleButton value="idea" sx={{backgroundColor:"#fff"}}>Idea</ToggleButton>
                <ToggleButton value="thoughts" sx={{backgroundColor:"#fff"}}>Thoughts</ToggleButton>
            </ToggleButtonGroup>
            <TextField
                multiline
                rows={4}
                placeholder="Enter your feedback here"
                variant="outlined"
                value={feedback}
                onChange={handleTextChange}
                style={{ width: '100%', margin: '10px 0', backgroundColor:"#fff"}}
            />
            <Button
                variant="contained"
                color="success"
                sx={{
                    backgroundColor:'#70D474'
                }}
                onClick={handleSubmit}
            >
                Submit Feedback
            </Button>
        </div>
    )
}

export default FeedbackBox;
