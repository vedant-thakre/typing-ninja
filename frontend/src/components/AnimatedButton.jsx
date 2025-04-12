import { motion } from "framer-motion";
import clsx from "clsx";

const AnimatedButton = ({ title, className, onClick, icon, animated=true, ...props }) => {
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
          {...props}
          className={clsx(
            !className.includes("bg-") && "bg-primary",
            !className.includes("border-") && "border-bdshadow",
            !className.includes("shadow") && "shadow-lg",
            "text-white",
            className
          )}
        >
          {icon ? icon : title}
        </motion.button>
      ) : (
        <button
          onClick={onClick}
          className={clsx(
            !className.includes("bg-") && "bg-primary",
            !className.includes("border-") && "border-bdshadow",
            !className.includes("shadow") && "shadow-lg",
            "text-white",
            className
          )}
          {...props}
        >
          {icon ? icon : title}
        </button>
      )}
    </>
  );
};

export default AnimatedButton;
