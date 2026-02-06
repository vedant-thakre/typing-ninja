import React from "react";
import AnimatedButton from "./AnimatedButton";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const Pagination = ({ pageNo, setpageNo, total }) => {
  const lastPage = Math.ceil(total / 10);
  return (
    <div className="flex justify-center gap-2 py-2">
      <AnimatedButton
        title={"1"}
        onClick={() => setpageNo(1)}
        animated={false}
        className={
          "px-3 py-[1.5px] border-bdshadow  text-white rounded-lg border-2"
        }
      />
      <AnimatedButton
        icon={<FaLessThan />}
        onClick={() => {
          if (pageNo > 1) setpageNo(pageNo - 1);
        }}
        animated={false}
        className={
          "px-2 py-[1px] border-bdshadow  text-white rounded-lg border-2"
        }
      />

      <AnimatedButton
        title={pageNo}
        animated={false}
        className={
          "w-[26px]  py-[2px] bg-transparent text-textcolor  shadow-none rounded-lg"
        }
      />
      <AnimatedButton
        icon={<FaGreaterThan />}
        onClick={() => {
          if (pageNo < lastPage) setpageNo(pageNo + 1);
        }}
        animated={false}
        className={
          "px-2 py-[1px] border-bdshadow  text-white rounded-lg border-2"
        }
      />
      {total > 10 && (
        <AnimatedButton
          title={lastPage}
          onClick={() => setpageNo(lastPage)}
          animated={false}
          className={
            "px-2 py-[2px] border-bdshadow  text-white rounded-lg border-2"
          }
        />
      )}
    </div>
  );
};

export default Pagination;
