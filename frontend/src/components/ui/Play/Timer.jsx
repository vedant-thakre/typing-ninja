import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { socket } from "../../../utils/socket";
import { useTimerContext } from "../../../context/TimerContext";

const Timer = ({
  mode,
  roomId,
  loading,
  roomUsers,
  gameStarted,
  hasGameEnded,
  hasGameReset,
  setGameStarted,
  setHasGameEnded,
  setHasGameReset,
}) => {
  const [loadingText, setLoadingText] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const requiredUsers = mode === "solo" ? 1 : mode === "duel" ? 2 : 5;
  const waitingState = roomUsers.length < requiredUsers;

  const {
    elapsedTime,
    mainSeconds,
    preTimerSeconds,
    setStartTimeContext,
    startTimeContext,
    resetTimer,
    pauseTimer,
    defaultPreTimer,
    defaultMainTimer,
  } = useTimerContext();

  useEffect(() => {
    const handleSpace = (e) => {
      if (e.code === "Space" && !loading && !gameStarted && mode === "solo") {
        console.log("handleSpace", loading, gameStarted, mode, e.code, roomId);
        e.preventDefault();
        socket.emit("startSoloMatch", { roomId });
        // setGameStarted(true);
        setHasGameReset(false);
      }
    };
    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, [gameStarted]);

  useEffect(() => {
    socket.on("ROOM_TIMER", ({ elapsedTime: serverElapsed }) => {
      const approxStart = Date.now() - serverElapsed;

      if (
        !startTimeContext ||
        Math.abs(startTimeContext - approxStart) > 500 // ~0.5s desync tolerance
      ) {
        setStartTimeContext(approxStart);
      }
    });

    return () => {
      socket.off("ROOM_TIMER");
    };
  }, [startTimeContext, setStartTimeContext]);

  useEffect(() => {
    socket.on("ROOM_TIMER_RESET", () => {
      console.log("ROOM_TIMER_RESET");
      resetTimer();
      setShowLoader(true);
    });

    return () => {
      socket.off("ROOM_TIMER_RESET");
    };
  }, []);

  useEffect(() => {
    if (!loading && startTimeContext) {
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  }, [loading, startTimeContext]);

  useEffect(() => {
    if (!loading && startTimeContext) {
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  }, [loading, startTimeContext]);

  // Compute preTimer and main timer left time from elapsed
  const preTimerLeft = Math.max(preTimerSeconds - elapsedTime, 0);
  const mainTimerLeft = Math.max(
    mainSeconds - Math.max(elapsedTime - preTimerSeconds, 0),
    0
  );

  // Determine state flags
  const isPreTimerRunning =
    preTimerLeft > 0 && preTimerLeft !== defaultPreTimer;
  const isRunning =
    !isPreTimerRunning &&
    mainTimerLeft > 0 &&
    mainTimerLeft !== defaultMainTimer;
  const isGameStarted = mainTimerLeft < 300000;

  // Set game started when main timer running
  useEffect(() => {
    if (isGameStarted && !gameStarted) {
      setGameStarted(true);
    }
  }, [isGameStarted]);

  // Format seconds for display
  const formatTime = (ms) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const min = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const sec = String(totalSeconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  // Determine UI classes & display text as before

  const bgColor = loading
    ? "bg-primary"
    : isPreTimerRunning
    ? preTimerLeft / 1000 <= 5
      ? "bg-danger"
      : "bg-[#f09834]"
    : isRunning && !hasGameEnded
    ? "bg-green-600"
    : "bg-primary";

  const bgBorder = loading
    ? "border-bdshadow"
    : isPreTimerRunning
    ? preTimerLeft / 1000 <= 5
      ? "border-bdanger"
      : "border-[#cb7e27]"
    : isRunning && !hasGameEnded
    ? "border-bsuccess"
    : "border-bdshadow";

  const displayText = loading
    ? "Connecting to server..."
    : isPreTimerRunning
    ? "Get set..."
    : isRunning && !hasGameEnded
    ? "GO!"
    : mode === "solo" && hasGameEnded
    ? "Complete"
    : mode === "solo"
    ? "Press 'Space' to begin..."
    : "Looking for opponent...";

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.3, ease: "easeOut" } }}
      whileTap={{ scale: 0.99 }}
      className={`flex justify-end gap-2 items-center cursor-pointer h-full ${
        hasGameEnded ? "max-h-[100px]  pb-2" : "max-h-[120px] pt-5  pb-4"
      } flex-col border-4 text-white rounded-2xl ${bgColor} ${bgBorder} px-6 shadow-lg`}
    >
      {loading || showLoader ? (
        <div className="loader"></div>
      ) : (
        <h2 className="text-[26px] font-bold font-route">
          {formatTime(isPreTimerRunning ? preTimerLeft : mainTimerLeft)}
        </h2>
      )}
      <h4 className="text-white w-max flex cursor-pointer items-center mt-[-15px] font-route text-[18px] font-bold">
        {displayText}
      </h4>
    </motion.div>
  );
};

export default Timer;
