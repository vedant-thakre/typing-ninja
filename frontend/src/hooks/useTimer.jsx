import { useEffect, useState } from "react";

const useTimer = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // ms

  useEffect(() => {
    if (!startTime) {
      setElapsedTime(0);
      return;
    }

    const updateElapsed = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      setElapsedTime(elapsed >= 0 ? elapsed : 0);
    };

    updateElapsed();

    // We'll rely on server pushes instead, so no interval here
    // Just keep elapsed updated when startTime changes
  }, [startTime]);

  return { elapsedTime };
};

export default useTimer;
