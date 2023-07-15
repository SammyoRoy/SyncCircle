import React from "react";
import DayOfTheWeekButton from "./DayOfTheWeekButton";

function DaySelectionFrame({days, setDays}) {
    if (days === null || days === undefined) {
      setDays([]);
    }
    
    return (
      <div className="DaySelectionFrame">
        <div className="DaySelectionFrameRow">
          <DayOfTheWeekButton day={"Sun"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Mon"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Tues"} setDays={setDays} days={days} />
        </div>
        <div className="DaySelectionFrameRow">
          <DayOfTheWeekButton day={"Wed"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Thurs"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Fri"} setDays={setDays} days={days} />
        </div>
        <div className="DaySelectionFrameRow">
          <DayOfTheWeekButton day={"Sat"} setDays={setDays} days={days} />
        </div>
      </div>
    );
  }

export default DaySelectionFrame;