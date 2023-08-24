import React from 'react';
import ShareLink from './ShareLink';
import DaysOfTheWeek from './DaysOfTheWeek';
import { useContext } from 'react';
import {AppContext} from '../../context/AppContext';

function GroupHeader(){
    const { first, setGroupAdminClicked, groupAdminClicked} = useContext(AppContext);
    console.log("first",first);
    return (
        <div className="GroupHeaderCard">
          {!groupAdminClicked? <><ShareLink /> 
          <DaysOfTheWeek styling={"GroupDOTWBar"} /></>: <div className='AdminControlsHeader'><h3>Admin Controls</h3></div>}
        </div>
    )
  
  
  }

export default GroupHeader