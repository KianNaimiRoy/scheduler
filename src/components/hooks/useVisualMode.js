import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const newHistory = [...history];
    setMode((prev) => newMode);

    setHistory((prev) => {
      if (replace) {
        prev.pop();
      }
      return [...prev, newMode];
    });
  };

  const back = () => {

    setHistory((prev) => {
      const historyArray = [...prev];

      if (prev.length > 1) {
        historyArray.pop();
        const lastItem = historyArray[historyArray.length - 1];
        if(lastItem !== "EMPTY"){
          setMode("SHOW")
        }else {
        setMode(lastItem);
        }
      }

      return historyArray;
    });
  };

  return { mode, transition, back };
}