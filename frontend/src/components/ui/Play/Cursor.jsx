import React from "react";
import { motion } from "framer-motion";

const Cursor = ({ classNames = "", blinking }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      className={`bg-gray-200 mb-2 ml-[1px] w-[2px] h-6 ${classNames}`}
    ></motion.div>
  );
};

export default Cursor;
