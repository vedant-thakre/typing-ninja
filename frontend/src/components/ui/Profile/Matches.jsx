import React from "react";
import { getRelativeTime } from "../../../utils/helper";
import { matchHistoryList } from "../../../utils/data";

const Matches = () => {
  return (
    <div className="bg-bgprimary  flex flex-col items-center gap-3 rounded-2xl shadow-hard">
      <div className="w-full">
        <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-title font-bold">
          Matches
        </h5>
      </div>

      <div className="w-full flex flex-col px-4 pb-4  gap-2">
        <div>
          <div className="grid grid-cols-12 px-5 w-full">
            <p className="col-span-1 font-main pb-3 text-[15px] font-light text-textsecond">
              #
            </p>
            <p className="col-span-7 font-main  text-[15px] pb-3 font-light text-textsecond">
              Name
            </p>
            <p className="col-span-2 text-center mr-[-10px] font-main text-[15px] pb-3 font-light text-textsecond">
              Accuracy
            </p>
            <p className="col-span-2  font-main text-end pr-3 text-[15px] pb-3 font-light text-textsecond">
              WPM
            </p>
          </div>
          <hr className="border-b-[2px] border-bprimary mx-2" />
        </div>
        <div
          className="flex flex-col gap-2 h-[600px] scroll-m-0 overflow-y-scroll 
                              py-4 w-full px-3 border-2 scrollbar-custom border-bprimary rounded-2xl"
        >
          {matchHistoryList?.map((item, index) => {
            return (
              <div
                key={index}
                className={`grid grid-cols-12 items-center px-3 py-1 w-full hover:bg-bprimary ${
                  index === matchHistoryList?.length - 1
                    ? ""
                    : "border-b-2 border-bprimary"
                }`}
              >
                <p className="col-span-1 font-route text-body1 text-textsecond">
                  {index + 1}
                </p>
                <div className="col-span-8 flex flex-col pr-2">
                  <p className="col-span-8 font-route pr-2 font-bold text-title3 text-textcolor">
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
                <p className="col-span-1 font-route text-body1 font-bold text-textsecond">
                  {item?.accuracy} %
                </p>
                <p className="col-span-1 font-route text-body1 font-bold pl-6 text-textsecond text-start">
                  {item?.wpm}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Matches;
