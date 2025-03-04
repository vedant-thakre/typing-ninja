import { motion } from "framer-motion";
import clsx from "clsx";
import { FaLongArrowAltRight } from "react-icons/fa";

const PlayButton = ({ title, className, subTitle, onClick, PlayButton }) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={clsx(
        "bg-primary flex cursor-pointer h-full flex-col gap-2 border-2  text-white rounded-2xl px-6 pt-4 shadow-lg",
        className
      )}
    >
      <h4 className="text-white w-max flex gap-[2px] cursor-pointer items-center font-main text-[16px] font-bold">
        {title} <FaLongArrowAltRight color={"white"} />
      </h4>
      <p className="font-main tracking-wide text-[14px]">{subTitle}</p>
    </motion.div>
  );
};

export default PlayButton;
