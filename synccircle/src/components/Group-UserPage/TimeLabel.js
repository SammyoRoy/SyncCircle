import React, {useState, useEffect} from 'react';

function TimeLabel({currTimeIndex}){
    const [currentTime, setCurrentTime] = useState("6:00 AM");
  
    const timeOptions = [
      '6:00 AM', //06:00 -> 0
      '7:00 AM', //07:00 -> 1
      '8:00 AM', //08:00 -> 2
      '9:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM', //12:00 -> 6
      '1:00 PM', // 13:00 -> 7
      '2:00 PM',
      '3:00 PM',
      '4:00 PM',
      '5:00 PM',
      '6:00 PM',
      '7:00 PM',
      '8:00 PM',
      '9:00 PM',
      '10:00 PM',
      '11:00 PM', //23:00 -> 17
      '12:00 AM', //00:00 -> 18
      '1:00 AM',  //01:00 -> 19
      '2:00 AM',
      '3:00 AM',
      '4:00 AM',
      '5:00 AM', //05:00 -> 23
    ];
  
    useEffect (() => {
      setCurrentTime(timeOptions[currTimeIndex]);
    }, [currTimeIndex, timeOptions])
    
    return (
      <div className="TimeLabel">{currentTime}</div>
    )
  }

export default TimeLabel;