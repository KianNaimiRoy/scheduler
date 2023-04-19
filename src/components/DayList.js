import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const mappedDays = props.days.map((day) => {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      setDay={props.onChange}
      selected={props.value === day.name}
    />;

  });

  return <ul>
    {mappedDays}
  </ul>;
}


