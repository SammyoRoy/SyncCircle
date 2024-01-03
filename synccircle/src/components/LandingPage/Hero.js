import React, {useEffect} from 'react'
import AOS from 'aos';

const Hero = () => {
    
    useEffect(() => {
        AOS.init();
    }, []);

    const tempImageUrl = 'https://picsum.photos/250/300';
    return (
        <div className='HeroPage'>
            <div className='HeroDesc'>
                <h1 data-aos="fade-up">
                    Scheduling with friends <span>made easy</span>.
                </h1>
                <h6 data-aos="fade-up">
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
