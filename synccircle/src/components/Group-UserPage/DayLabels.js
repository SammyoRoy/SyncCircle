import React from 'react';

function DayLabels({ day }){
    const threeChar = day.substring(0, 3);

    return (
      <div className="DayLabel"> {threeChar} </div>
    )
  }

export default DayLabels