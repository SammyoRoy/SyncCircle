import React from 'react';

function DayLabels({ day }){
    const firstChar = day.charAt(0);

    return (
      <div className="DayLabel"> {firstChar} </div>
    )
  }

export default DayLabels