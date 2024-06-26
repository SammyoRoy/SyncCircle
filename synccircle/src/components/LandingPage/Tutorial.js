import React, { useEffect, forwardRef } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import createImage from './Create_Event.jpg'
import groupImage from './Group_Slots.jpg'
import userImage from './User_Slots.jpg'

const Tutorial = forwardRef((props,ref) => {


    
    useEffect(() => {

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            AOS.init({
                duration: 2000
            });
        }
        else {
            AOS.init({
                disable: true
            });
        }
    }, []);
    return (
        <div className='Tutorial' ref={ref}>
            <h1 data-aos="fade-down">Sync your schedules with one easy link</h1>
            <div className='Steps'>
                <div className='Step1' data-aos="fade-down" data-aos-delay="100">
                    <div className='Count'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                            <circle cx="16.5" cy="16.5" r="16" fill="#297045" />
                            <text className='Text' fill='#FFF' x="50%" y="50%" textAnchor="middle" dy=".3em">1</text>
                        </svg>
                    </div>
                    <h3>Create an event</h3>
                    <b3>
                        Enter an event name, time range, and select days
                    </b3>
                    <img src={createImage} alt="create-event" style={{width:'250px', height:'auto', borderRadius:'30px', border: '2px solid lightgray'}}></img>
                </div>
                <div className='Step2' data-aos="fade-down" data-aos-delay="400">
                    <div className='Count'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                            <circle cx="16.5" cy="16.5" r="16" fill="#297045" />
                            <text className='Text' fill='#FFF' x="50%" y="50%" textAnchor="middle" dy=".3em">2</text>
                        </svg>
                    </div>
                    <h3>Fill out availability</h3>
                    <b3>
                        Type in a username, and then press the time slots for when you’re free. If you need to update your availability later, you can log back in with the same username.
                    </b3>
                    <img src={userImage} alt="availability" style={{width:'250px', height:'auto', borderRadius:'30px', border: '2px solid lightgray'}}></img>

                </div>
                <div className='Step3' data-aos="fade-down" data-aos-delay="800">
                    <div className='Count'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                            <circle cx="16.5" cy="16.5" r="16" fill="#297045" />
                            <text className='Text' fill='#FFF' x="50%" y="50%" textAnchor="middle" dy=".3em">3</text>
                        </svg>
                    </div>
                    <h3>Share the link!</h3>
                    <b3>
                        Use the purple Group button to open the group tab. Copy the link and send it to your friends. Then watch as the slots update in real time as they fill in their availabilities!
                    </b3>
                    <img src={groupImage} alt="share-link" style={{width:'250px', height:'auto', borderRadius:'30px', border: '2px solid lightgray'}}></img>
                </div>
            </div>
        </div>
    )
});

export default Tutorial