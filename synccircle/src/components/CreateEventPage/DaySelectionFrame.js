import React from "react";
import DayOfTheWeekButton from "./DayOfTheWeekButton";

function DaySelectionFrame({days, setDays}) {
    if (days === null || days === undefined) {
      setDays([]);
    }
    
    return (
      <div className="DaySelectionFrame">
        <div className="DaySelectionFrameRow">
          <DayOfTheWeekButton day={"Su"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Mo"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Tu"} setDays={setDays} days={days} />
        </div>
        <div className="DaySelectionFrameRow">
          <DayOfTheWeekButton day={"We"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Th"} setDays={setDays} days={days} />
          <DayOfTheWeekButton day={"Fr"} setDays={setDays} days={days} />
        </div>
        <div className="DaySelectionFrameRow">
          <DayOfTheWeekButton day={"Sa"} setDays={setDays} days={days} />
        </div>
      </div>
    );
  }

export default DaySelectionFrame;