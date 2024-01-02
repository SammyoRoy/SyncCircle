import React, { useContext } from 'react';
import UserNameForm from './UserNameForm';
import DaysOfTheWeek from './DaysOfTheWeek';
import GroupPageButton from './GroupPageButton';
import { AppContext } from '../../context/AppContext';
import {CookiesProvider} from 'react-cookie';

function HeaderCard(){

    return (
        <div className="HeaderCard">
          <CookiesProvider >
            <UserNameForm/>
            <DaysOfTheWeek styling={"DOTWBar"}/>
          </CookiesProvider>
        </div>
    )
  
  
  }

export default HeaderCard