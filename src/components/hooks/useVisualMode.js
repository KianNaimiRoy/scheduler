import React, { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      const index = history.indexOf(mode);
      history[index] = newMode;
      setMode(newMode);
    } else {
      setMode(newMode);
      history.push(newMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      const historyArray = [...history];
      historyArray.pop();

      const lastItem = historyArray[historyArray.length - 1];
      setMode(lastItem);
      setHistory(historyArray);
    }
  };


  return { mode, transition, back };
}