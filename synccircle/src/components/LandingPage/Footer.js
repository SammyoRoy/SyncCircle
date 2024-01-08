import React, {useState} from 'react'
import { Input, Typography } from '@mui/material'
import logo from './SyncCircle192.png';

const Footer = () => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div className='Footer'>
            <div className='Logo'>
                <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, color: '#FFFFFF', fontFamily: 'Poppins', fontWeight: 700 }}>
                    <img src={logo} alt="SyncCircle Logo" style={{ width: '24px', height: '24px', marginRight: '10px', verticalAlign: 'middle' }} />
                    SyncCircle
                </Typography>
                <b6>Copyright © 2024 SyncCircle ltd.</b6>
                <b6>All rights reserved</b6>
                <div className='Icons'>
                </div>
            </div>
            <div className='Email'>
                <h4>Stay up to date</h4>
                <div className='SendMail'>

                    <input onChange={handleChange} value={value} placeholder='Your Email Address'></input>
                    <button onClick={() => setValue('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <g clip-path="url(#clip0_869_422)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0303 0.969691C17.2341 1.17342 17.3031 1.47584 17.2079 1.74778L11.9579 16.7478C11.8563 17.038 11.5878 17.2369 11.2806 17.2494C10.9733 17.2619 10.6895 17.0856 10.5646 16.8046L7.6818 10.3182L1.1954 7.43538C0.91439 7.31049 0.738092 7.02671 0.750627 6.71945C0.763163 6.41219 0.961991 6.14371 1.25224 6.04213L16.2522 0.792127C16.5242 0.696948 16.8266 0.765962 17.0303 0.969691ZM9.14456 9.91612L11.1671 14.4667L14.7064 4.35429L9.14456 9.91612ZM13.6457 3.29362L3.53331 6.83297L8.0839 8.85546L13.6457 3.29362Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_869_422">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
                <h4>Contact Us: </h4>
                <h6 style={{ marginLeft: '10px' }}> synccircleapp@gmail.com</h6>

            </div>
        </div>
    )
}

export default Footer