import React, { useState } from "react";
import AnimatedButton from "../components/ui/Other/AnimatedButton";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { highscoreList } from "../utils/data";
import Pagination from "../components/ui/Other/Pagination";

const Highscores = () => {
  const [tabValue, setTabValue] = useState("Top Speed");
  const [difficultyValue, setDifficultyValue] = useState("ALL");
  const difficuties = ["ALL", "EASY", "MEDIUM", "HARD"];
  const [pageNo, setpageNo] = useState(1);
  return (
    <div className="min-h-screen mx-3 md:mx-0 flex justify-center">
      <div className="flex flex-col gap-4 w-[800px] mt-[30px]">
        <div className="grid grid-cols-2 gap-3 ">
          <AnimatedButton
            title="Top Speed"
            onClick={() => setTabValue("Top Speed")}
            className="font-route shadow-hard text-white hover:underline tracking-wide font-medium text-xl rounded-xl py-2 px-24"
          />
          <AnimatedButton
            title="Top Matches"
            onClick={() => setTabValue("Top Matches")}
            className="font-route shadow-hard text-white hover:underline font-normal tracking-normal text-title2 rounded-xl py-2 px-24"
          />
        </div>
        <div className="bg-bgprimary mb-[50px] w-full flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full">
            <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-title2 font-bold">
              {tabValue + ` - ${difficultyValue.toLowerCase()} quotes`}
            </h5>

            <Pagination pageNo={pageNo} setpageNo={setpageNo} />
            <div className="grid grid-cols-4 pt-4 w-full">
              {difficuties.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setDifficultyValue(item)}
                    className={` font-route text-title3 pb-2 border-b-[3px]  ${
                      difficultyValue === item
                        ? "border-primary text-primary"
                        : "text-textsecond border-bprimary"
                    } hover:border-bdshadow hover:text-bdshadow font-bold text-center cursor-pointer`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            {tabValue === "Top Speed" ? (
              <>
                <div className="grid grid-cols-12  px-11 pt-4 w-full">
                  <p className="col-span-1 font-main pb-3 text-[16px] font-medium text-textsecond">
                    #
                  </p>
                  <p className="col-span-7 font-main  text-[16px] pb-3 font-medium text-textsecond">
                    Name
                  </p>
                  <p className="col-span-2 font-main text-[16px] pb-3 font-medium text-textsecond">
                    Date
                  </p>
                  <p className="col-span-2 font-main text-center text-[16px] pb-3 font-medium text-textsecond">
                    Top WPM
                  </p>
                </div>
                <hr className="border-b-[2px] border-bprimary mx-8" />
              </>
            ) : (
              <div className="grid grid-cols-12 px-6 pt-4 w-full">
                <p className="col-span-1 font-main border-bprimary border-b-2 pb-3 text-[16px] font-medium text-textsecond">
                  #
                </p>
                <p className="col-span-9 font-main border-bprimary border-b-2  text-[16px] pb-3 font-medium text-textsecond">
                  Name
                </p>
                <p className="col-span-2 font-main border-bprimary border-b-2 text-center text-[16px] pb-3 font-medium text-textsecond">
                  Matches
                </p>
              </div>
            )}
          </div>
          <div className="px-6 pb-5 w-full">
            <div className="flex w-full flex-col gap-2 pt-2 pb-3 px-3 border-2  border-bprimary rounded-2xl">
              {highscoreList.map((item, index) => {
                return (
                  <>
                    {tabValue === "Top Speed" ? (
                      <div
                        key={index}
                        className={`grid grid-cols-12 px-3 cursor-pointer rounded-lg py-2 w-full hover:bg-bprimary ${
                          index === highscoreList?.length - 1
                            ? ""
                            : "border-b-2 border-bprimary"
                        }`}
                      >
                        <p className="col-span-1 font-route text-title3 text-textcolor">
                          {index + 1}
                        </p>
                        <p className="col-span-7 font-route text-title3 text-textcolor">
                          {item?.user?.username}
                        </p>
                        <p className="col-span-2 font-route text-title3 text-textcolor">
                          {item?.user?.id}
                        </p>
                        <p className="col-span-2 font-route text-title3  pl-6 text-textcolor text-start">
                          {item?.wpm}
                        </p>
                      </div>
                    ) : (
                      <div key={index} className=""></div>
                    )}
                  </>
                );
              })}
              <Pagination pageNo={pageNo} setpageNo={setpageNo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highscores;
