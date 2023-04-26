import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  console.log("HISTORY", history);
  const transition = (newMode, replace = false) => {
    const newHistory = [...history];
    setMode((prev)=>newMode);

    if (replace) {
      newHistory.pop();
    }

    setHistory((prev)=>[...newHistory, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      const historyArray = [...history];
      historyArray.pop();

      const lastItem = historyArray[historyArray.length - 1];
      setMode(lastItem);
      setHistory((prev)=>[...prev, lastItem]);
    }
  };


  return { mode, transition, back };
}