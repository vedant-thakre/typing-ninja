import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const PlayerCard = ({ user, mode, stats }) => {
  const userData = useSelector((state) => state.user.userData);
  const myInfo = stats?.userId === userData?._id;
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const hundredths = String(Math.floor((milliseconds % 1000) / 10)).padStart(
      2,
      "0"
    );
    return `${minutes}:${seconds}.${hundredths}`;
  };

  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 230,
        damping: 30,
      }}
      className={`flex  ${
        mode === "solo" ? "w-full" : "w-[280px]"
      } flex-col items-center px-2   pb-2 rounded-2xl shadow-hard bg-bgprimary h-min`}
    >
      <div className="w-full flex justify-between px-2 py-2">
        <div className="flex text-textsecond font-route flex-col items-center justify-center gap-2">
          <p className="font-bold text-[14px] tracking-wider">ERRORS</p>
          <p className="font-bold text-[17px] tracking-wide mt-[-10px]">
            {myInfo && stats?.errorCount ? stats?.errorCount : "0"}
          </p>
        </div>
        <div className="flex text-textsecond font-route flex-col items-center justify-center gap-2">
          <p className="font-bold text-[14px] tracking-wider">ACCURACY</p>
          <p className="font-bold text-[17px] tracking-wide mt-[-10px]">
            {myInfo && stats?.accuracy ? stats?.accuracy + "%" : "100%"}
          </p>
        </div>
        <div className="flex text-textsecond font-route flex-col items-center justify-center gap-2">
          <p className="font-bold text-[14px] tracking-wider">TIME</p>
          <p className="font-bold text-[17px] tracking-wide mt-[-10px]">
            {myInfo && stats?.time ? formatTime(stats?.time) : "--:--"}
          </p>
        </div>
      </div>
      <div
        className={`w-full relative rounded-2xl overflow-hidden h-[45px] ${
          myInfo || mode === "solo" ? "bg-bgyou" : "bg-bgopponent"
        } bg-opacity-20`}
      >
        {/* Animated progress bar */}
        <motion.div
          className={`absolute top-0  h-full ${
            myInfo || mode === "solo"
              ? "left-0 bg-bgyou"
              : "right-0 bg-bgopponent"
          } z-0`}
          initial={{ width: 0 }}
          animate={{ width: `${stats?.progress || 0}%` }}
          transition={{ ease: "easeOut", duration: 0.4 }}
        />

        {/* Content layer on top */}
        <div className="relative z-10 w-full h-full flex items-center justify-between px-2">
          <div className="flex gap-[5px] items-center">
            <p className="text-xl">{"🌸"}</p>
            <p className="text-white font-route text-lg font-bold">
              {user?.username}
            </p>
          </div>
          <p className="text-white font-route text-sm tracking-wider">
            {stats?.progress > 0 ? stats?.progress + "%" : "0%"}
          </p>
          <div className="flex gap-[5px] items-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-white w-[45px] font-route text-sm tracking-wider">
                {myInfo && stats?.wpm ? stats?.wpm : "0"}
              </p>
              <p className="text-white font-route mt-[-8px] text-xs tracking-wider">
                WPM
              </p>
            </div>
            <div className="bg-white w-6 h-6 relative rounded-full font-route text-xl font-bold">
              <p
                className={`absolute text-[13px] ${
                  stats?.wpm ? "top-[0px] left-[4px]" : "top-[1px] left-[11px]"
                } ${
                  myInfo || mode === "solo" ? "text-bgyou" : "text-bgopponent"
                }`}
              >
                {myInfo && stats?.wpm ? "1st" : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
