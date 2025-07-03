import React from "react";

const Overview = ({ userData }) => {
  return (
    <div className="bg-bgprimary  flex flex-col items-center gap-3 rounded-2xl shadow-hard">
      <div className="w-full">
        <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
          Overview
        </h5>
      </div>
      <div className="flex flex-col w-full p-4 gap-4">
        <div className="flex flex-col lg:flex-row  w-full gap-4">
          <div className="flex-1 flex-col  gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
            <p className="font-route w-full uppercase text-[20px] font-bold text-textcolor border-b-2 border-bprimary">
              Averages (Recent 25)
            </p>
            <div className="flex flex-col pt-3">
              <div className="flex flex-col">
                <p className="font-route text-textsecond font-bold text-[20px]">
                  WPM
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-[18px]">
                  {userData?.recentAverageWpm}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-route text-textsecond font-bold text-[20px]">
                  Accuracy
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-[18px]">
                  {userData?.recentAverageAccuracy}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-route text-textsecond font-bold text-[20px]">
                  Errors Per Game
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-[18px]">
                  {userData?.recentAverageErrors}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex-col  gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
            <p className="font-route w-full uppercase text-[20px] font-bold text-textcolor border-b-2 border-bprimary">
              Averages (all time)
            </p>
            <div className="flex flex-col pt-3">
              <div className="flex flex-col">
                <p className="font-route text-textsecond font-bold text-[20px]">
                  WPM
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-[18px]">
                  {userData?.averageWpm}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-route text-textsecond font-bold text-[20px]">
                  Accuracy
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-[18px]">
                  {userData?.averageAccuracy}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-route text-textsecond font-bold text-[20px]">
                  Errors Per Game
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-[18px]">
                  {userData?.averageErrors}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex-col  gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
          <p className="font-route w-full uppercase text-[20px] font-bold text-textcolor border-b-2 border-bprimary">
            Records
          </p>
          <div className="flex justify-between pt-3">
            <div className="flex flex-col">
              <p className="font-route text-textsecond font-bold text-[20px]">
                Highest WPM
              </p>
              <p className="font-route text-textcolor mt-[-9px] font-bold text-[18px]">
                {userData?.topWpm}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-route text-textsecond font-bold text-[20px]">
                Games Won
              </p>
              <p className="font-route text-textcolor mt-[-9px] font-bold text-[18px]">
                {userData?.totalWins}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-route text-textsecond font-bold text-[20px]">
                Games Played
              </p>
              <p className="font-route text-textcolor mt-[-9px] font-bold text-[18px]">
                {userData?.matchCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
