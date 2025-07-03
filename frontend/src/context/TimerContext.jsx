import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const TimerContext = createContext(null);
export const useTimerContext = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const location = useLocation();
  const [startTimeContext, setStartTimeContext] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerIntervalRef = useRef(null); // 🆕 store interval ID
  const pausedTimeRef = useRef(null); // 🆕 store paused time

  const getDurations = () => {
    const path = location.pathname;
    if (path.startsWith("/duel"))
      return { mainSeconds: 300000, preTimerSeconds: 10000 };
    if (path.startsWith("/solo"))
      return { mainSeconds: 300000, preTimerSeconds: 5000 };
    if (path.startsWith("/multiplayer"))
      return { mainSeconds: 300000, preTimerSeconds: 10000 };
    return { mainSeconds: 300000, preTimerSeconds: 5000 };
  };

  const { mainSeconds, preTimerSeconds } = getDurations();

  useEffect(() => {
    if (startTimeContext) {
      timerIntervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTimeContext;
        setElapsedTime(elapsed >= 0 ? elapsed : 0);
      }, 100);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [startTimeContext]);

  const resetTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setStartTimeContext(null);
    setElapsedTime(0);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setStartTimeContext(null);
  };

  const pauseTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    pausedTimeRef.current = elapsedTime - preTimerSeconds -  1000;
    console.log("pausedTimeRef.current", pausedTimeRef.current);
    return pausedTimeRef.current;
  };

  const getMatchTime = () => {
    return Date.now() - startTimeContext;
  };

  return (
    <TimerContext.Provider
      value={{
        elapsedTime,
        mainSeconds,
        preTimerSeconds,
        setStartTimeContext,
        startTimeContext,
        matchTimeRef: pausedTimeRef.current,
        resetTimer,
        stopTimer,
        pauseTimer,
        getMatchTime,
        defaultPreTimer: preTimerSeconds,
        defaultMainTimer: mainSeconds,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
