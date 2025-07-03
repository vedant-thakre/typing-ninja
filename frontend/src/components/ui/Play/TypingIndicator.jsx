import React from 'react'
import { motion } from "framer-motion";

const TypingIndicator = ({ ref, emoji }) => {
  const blinking = false;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1 }}
      animate={{ opacity: blinking ? 0 : 1 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      className="absolute bg-yellow-500 w-0.5 h-[19px] mt-[2px]"
    >
      {emoji && (
        <div className="text-[16px] absolute top-[-26px] left-[-8px]">
          {emoji}
        </div>
      )}
    </motion.div>
  );
};


export default TypingIndicator;
