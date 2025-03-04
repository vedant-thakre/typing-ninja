import React, { useState } from 'react'
import AnimatedButton from '../components/AnimatedButton';
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { highscoreList } from '../utils/data';


const Highscores = () => {
  const [tabValue, setTabValue] = useState("TOP SPEED");
  const [difficultyValue, setDifficultyValue] = useState("ALL");
  const difficuties = ["ALL", "EASY", "MEDIUM", "HARD"];
  const [pageNo, setpageNo] = useState(1);
  return (
    <div className="min-h-screen flex flex-col  mt-[150px] justify-center gap-5 items-center">
      <div className=" w-[700px] flex flex-col gap-5 justify-center">
        <div className="grid grid-cols-2 gap-5 ">
          <AnimatedButton
            title="TOP SPEED"
            onClick={() => setTabValue("TOP SPEED")}
            className={
              "font-route shadow-hard font-bold text-xl rounded-2xl py-10 px-24"
            }
          />
          <AnimatedButton
            title="TOP MATCHES"
            onClick={() => setTabValue("TOP MATCHES")}
            className={
              "font-route shadow-hard font-bold text-xl rounded-2xl py-10 px-24"
            }
          />
        </div>
        <div className="bg-secondary mb-[50px] w-full flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full">
            <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
              {(tabValue === "TOP SPEED" ? "Top Speed" : "Top Matches") +
                ` - ${difficultyValue.toLowerCase()} quotes`}
            </h5>
            <div className="flex justify-center gap-2 py-2">
              <AnimatedButton
                title={"1"}
                animated={false}
                className={"px-3 py-[2px] rounded-lg border-2"}
              />
              <AnimatedButton
                icon={<FaLessThan />}
                onClick={() => {
                  if (pageNo > 1) setpageNo(pageNo - 1);
                }}
                animated={false}
                className={"px-2 py-[2px] rounded-lg border-2"}
              />

              <AnimatedButton
                title={pageNo}
                animated={false}
                className={
                  "w-[26px]  py-[2px] bg-transparent shadow-none rounded-lg"
                }
              />
              <AnimatedButton
                icon={<FaGreaterThan />}
                onClick={() => setpageNo(pageNo + 1)}
                animated={false}
                className={"px-2 py-[2px] rounded-lg border-2"}
              />
            </div>
            <div className="grid grid-cols-4 pt-6 w-full">
              {difficuties.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setDifficultyValue(item)}
                    className={` font-route text-[22px] pb-2 border-b-[3px]  ${
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
            {tabValue === "TOP SPEED" ? (
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
                <hr className='border-b-[2px] border-bprimary mx-8' />
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
                    {tabValue === "TOP SPEED" ? (
                      <div
                        key={index}
                        className={`grid grid-cols-12 px-3 cursor-pointer rounded-lg py-2 w-full hover:bg-bprimary ${
                          index === highscoreList?.length - 1
                            ? ""
                            : "border-b-2 border-bprimary"
                        }`}
                      >
                        <p className="col-span-1 font-route text-[20px] text-white">
                          {index + 1}
                        </p>
                        <p className="col-span-7 font-route text-[20px] text-white">
                          {item?.user?.username}
                        </p>
                        <p className="col-span-2 font-route text-[20px] text-white">
                          {item?.user?.id}
                        </p>
                        <p className="col-span-2 font-route text-[20px] pl-6 text-white text-start">
                          {item?.wpm}
                        </p>
                      </div>
                    ) : (
                      <div key={index} className=""></div>
                    )}
                  </>
                );
              })}
              <div className="flex justify-center gap-2 py-2">
                <AnimatedButton
                  title={"1"}
                  animated={false}
                  className={"px-3 py-[2px] rounded-lg border-2"}
                />
                <AnimatedButton
                  icon={<FaLessThan />}
                  onClick={() => {
                    if (pageNo > 1) setpageNo(pageNo - 1);
                  }}
                  animated={false}
                  className={"px-2 py-[2px] rounded-lg border-2"}
                />

                <AnimatedButton
                  title={pageNo}
                  animated={false}
                  className={
                    "w-[26px]  py-[2px] bg-transparent shadow-none rounded-lg"
                  }
                />
                <AnimatedButton
                  icon={<FaGreaterThan />}
                  onClick={() => setpageNo(pageNo + 1)}
                  animated={false}
                  className={"px-2 py-[2px] rounded-lg border-2"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Highscores
