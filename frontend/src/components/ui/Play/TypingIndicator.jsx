import React from 'react'
import { motion } from "framer-motion";


const TypingIndicator = () => {
  return (
    <motion.div
      // aria-hidden={true}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      className="inline-block bg-yellow-500 w-0.5 h-5"
    />
  );
};

export default TypingIndicator;
