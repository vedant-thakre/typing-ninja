import { motion } from "framer-motion";
import clsx from "clsx";

const AnimatedButton = ({
  title,
  className,
  onClick,
  both = false,
  icon,
  animated = true,
  ...props
}) => {
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
            !className?.includes("bg-") && "bg-primary",
            !className?.includes("border-") && "border-bdshadow",
            !className?.includes("shadow") && "shadow-lg",
            className,
          )}
        >
          {both ? (
            <div className="flex items-center justify-center gap-2">
              <div>{icon}</div>
              <span className="mt-1">{title}</span>
            </div>
          ) : icon ? (
            icon
          ) : (
            title
          )}
        </motion.button>
      ) : (
        <button
          onClick={onClick}
          className={clsx(
            !className.includes("bg-") && "bg-primary",
            !className.includes("border-") && "border-bdshadow",
            !className.includes("shadow") && "shadow-lg",
            className,
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
