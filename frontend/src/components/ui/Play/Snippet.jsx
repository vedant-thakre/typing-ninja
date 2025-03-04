import React from 'react'
import { motion } from "framer-motion";


const Snippet = ({words}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.01 } }}
      exit={{ opacity: 0 }}
      className="text-gray-400 text-2xl"
    >
      {words}
    </motion.div>
  );
}

export default Snippet
