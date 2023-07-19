import React, { useContext } from 'react';
import UserNameForm from './UserNameForm';
import DaysOfTheWeek from './DaysOfTheWeek';
import GroupPageButton from './GroupPageButton';
import { AppContext } from './AppContext';

function HeaderCard(){

    return (
        <div>
          <div className= "HeaderCard">
            <UserNameForm/>
          </div>
          <DaysOfTheWeek />
        </div>
    )
  
  
  }

export default HeaderCard