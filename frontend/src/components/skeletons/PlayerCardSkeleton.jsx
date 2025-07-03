import React from "react";
import { motion } from "framer-motion";
import { use } from "react";

const PlayerCardSkeleton = ({ text }) => {
  return (
    <div
      className="flex w-[280px] justify-center items-center animate-pulse rounded-2xl shadow-hard bg-bgprimary h-[110px]"
    >
      <p className="text-textsecond font-main">{text}</p>
    </div>
  );
};

export default PlayerCardSkeleton;
