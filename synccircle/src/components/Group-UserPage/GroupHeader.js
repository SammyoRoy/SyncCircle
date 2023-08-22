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
          <ShareLink />
          {first && <button className="btn btn-danger" style={{marginLeft: "10px"}} onClick={() => setGroupAdminClicked(!groupAdminClicked)}>Group Admin Controls</button>}
          <DaysOfTheWeek styling={"GroupDOTWBar"} />
        </div>
    )
  
  
  }

export default GroupHeader