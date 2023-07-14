import React from 'react';
import UserNameForm from './UserNameForm';
import DaysOfTheWeek from './DaysOfTheWeek';

function HeaderCard({ groupId, setUserId }){

    return (
        <div>
          <div className= "HeaderCard">
            <UserNameForm groupId={groupId} setUserId={setUserId}/>
          </div>
          <DaysOfTheWeek />
        </div>
    )
  
  
  }

export default HeaderCard