import React from "react";
import AnimatedButton from "../components/AnimatedButton";
import { matchHistoryList, recordList, userData } from "../utils/data";
import { getRelativeTime } from "../utils/helper";
import { NavLink, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import Snippet from "../components/ui/Play/Snippet";
import UserTypings from "../components/ui/Play/UserTypings";
import usePlay from "../hooks/usePlay";
import SnippetBox from "../components/ui/Play/SnippetBox";

const Play = () => {
  const navigate = useNavigate();
  const {
    words,
    typed,
    timeLeft,
    errors,
    state,
    restart,
    totalTyped,
    difficulty,
  } = usePlay();

  window.onkeydown = function (e) {
    return !(e.keyCode == 32 && e.target == document.body);
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex gap-x-6 py-5 px-7 mt-[140px]">
        <div className="bg-secondary flex-[3.5] h-min flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full">
            <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
              Chat
            </h5>
          </div>
          {/* Profile */}
          <div className="flex flex-col gap-4 p-4">
            <div className="f py-4 px-5 border-2 border-bprimary rounded-2xl">
              <div className="flex h-[270px] items-center flex-col gap-6"></div>
            </div>
            <input
              placeholder="Write a message..."
              type="text"
              className="outline-none px-4 text-[22px] text-white  font-route placeholder:text-[20px]  placeholder:text-bprimary bg-transparent border-2 border-bprimary rounded-2xl py-[4px] w-full"
            />
          </div>
        </div>
        {/* SnippetBox */}
        <SnippetBox difficulty={difficulty} />
        <div className="flex flex-col flex-[3.5] gap-5">
          {/* Snippet Highscore */}
          <div className="bg-secondary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
            <div className="w-full">
              <h5 className="text-white tracking-wider py-2 px-5 bg-primary rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                Snippet Highscore
              </h5>
            </div>
            <div className="w-full pt-2 pb-4 px-4">
              <div
                className="flex flex-col gap-2 h-[600px] scrollbar-custom scroll-m-0 overflow-y-scroll 
                                    py-4 w-full px-3 border-2 border-bprimary rounded-2xl"
              >
                {recordList?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`grid grid-cols-12 items-center px-3 py-1 w-full hover:bg-bprimary ${
                        index === recordList?.length - 1
                          ? ""
                          : "border-b-2 border-bprimary"
                      }`}
                    >
                      <p className="col-span-1 font-route text-[20px] text-textsecond">
                        {index + 1}
                      </p>
                      <div className="col-span-8 flex flex-col pr-2">
                        <p className="col-span-8 font-route pr-2 font-bold text-[20px] text-white">
                          {item?.snippetTitle}
                        </p>
                        <div className="flex mt-[-4px] items-center">
                          <p
                            className={`font-main text-sm ${
                              item?.difficulty === "hard"
                                ? "text-danger"
                                : item?.difficulty === "easy"
                                ? "text-success"
                                : "text-orange"
                            }`}
                          >
                            {item?.difficulty}
                          </p>
                          <p className="font-main text-sm text-textsecond">
                            , {getRelativeTime(item?.created_at)}
                          </p>
                        </div>
                      </div>
                      <p className="col-span-1 font-route text-[20px] pl-6 text-textsecond text-start">
                        {item?.wpm}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
