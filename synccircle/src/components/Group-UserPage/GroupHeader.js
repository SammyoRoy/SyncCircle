import React from 'react';
import ShareLink from './ShareLink';
import DaysOfTheWeek from './DaysOfTheWeek';


function GroupHeader(){

    return (
        <div className="GroupHeaderCard">
          <ShareLink />
          <DaysOfTheWeek styling={"GroupDOTWBar"} />
        </div>
    )
  
  
  }

export default GroupHeader