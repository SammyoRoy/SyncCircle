import React, { useContext } from 'react';
import UserNameForm from './UserNameForm';
import DaysOfTheWeek from './DaysOfTheWeek';
import GroupPageButton from './GroupPageButton';
import { AppContext } from './AppContext';

function HeaderCard(){

    return (
        <div className="HeaderCard">
          <UserNameForm/>
          <DaysOfTheWeek />
        </div>
    )
  
  
  }

export default HeaderCard