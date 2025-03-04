import { motion } from "framer-motion";
import clsx from "clsx";

const AnimatedButton = ({ title, className, onClick, icon, animated=true }) => {
  return (
    <>
      {animated ? (
        <motion.button
          whileHover={{
            y: -2,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className={clsx(
            "bg-primary border-bdshadow text-white shadow-lg",
            className
          )}
        >
          {icon ? icon : title}
        </motion.button>
      ) : (
        <button
          onClick={onClick}
          className={clsx(
            "bg-primary border-bdshadow text-white shadow-lg",
            className
          )}
        >
          {icon ? icon : title}
        </button>
      )}
    </>
  );
};

export default AnimatedButton;
