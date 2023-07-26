import React, { useContext } from 'react';
import UserNameForm from './UserNameForm';
import DaysOfTheWeek from './DaysOfTheWeek';
import GroupPageButton from './GroupPageButton';
import { AppContext } from '../../context/AppContext';

function HeaderCard(){

    return (
        <div className="HeaderCard">
          <UserNameForm/>
          <DaysOfTheWeek styling={"DOTWBar"}/>
        </div>
    )
  
  
  }

export default HeaderCard