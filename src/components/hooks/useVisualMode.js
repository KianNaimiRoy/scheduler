import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const newHistory = [...history];
    setMode(newMode);

    if (replace) {
      newHistory.pop();
    }

    newHistory.push(newMode);
    setHistory(newHistory);
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