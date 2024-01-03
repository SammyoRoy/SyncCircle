import React from 'react'

const Hero = () => {

    const tempImageUrl = 'https://picsum.photos/250/300';
    return (
        <div className='HeroPage'>
            <div className='HeroDesc'>
                <h1>
                    Scheduling with friends <span>made easy</span>.
                </h1>
                <h6>
                    Get those plans out of the group chat
                </h6>
                <button type="submit" className="CreateEventBtn" disabled>Create Event</button>
            </div>
            <div className='HeroImg'>
                {<img src={tempImageUrl} alt='Temporary Placeholder'></img>}
            </div>
        </div>
    )
}

export default Hero;
