import { useState } from "react";


export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const newHistory = [...history];
  

    setHistory((prev) => {
      const historyArray = [...prev];
      if (replace) {
        historyArray.pop();
      }
      return [...historyArray, newMode];
    });
  };

  const back = () => {

    setHistory((prev) => {
      const historyArray = [...prev];

      if (prev.length > 1) {
        historyArray.pop();
       
      }

      return historyArray;
    });
  };

  return { mode: history[history.length-1], transition, back };
}