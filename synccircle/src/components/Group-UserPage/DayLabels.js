import React from 'react';

function DayLabels({ day }){
    const twoChar = day.substring(0, 2);

    return (
      <div className="DayLabel"> {twoChar} </div>
    )
  }

export default DayLabels