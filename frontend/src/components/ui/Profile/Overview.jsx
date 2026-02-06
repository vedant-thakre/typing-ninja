import React from "react";

const Overview = ({ userData }) => {
  return (
    <div className="bg-bgprimary  flex flex-col items-center rounded-2xl shadow-hard">
      <div className="w-full">
        <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-title font-bold">
          Overview
        </h5>
      </div>
      <div className="flex flex-col w-full p-4 gap-4">
        <div className="flex flex-col lg:flex-row  w-full gap-4">
          <div className="flex-1 flex-col  gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
            <p className="font-route w-full uppercase text-content font-bold text-textcolor border-b-2 border-bprimary">
              Averages (Recent 25)
            </p>
            <div className="flex flex-col pt-3 gap-1">
              <div className="flex flex-col gap-1">
                <p className="font-route text-textsecond font-semibold text-body1">
                  WPM
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-body1">
                  {userData?.recentAverageWpm}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-route text-textsecond font-semibold text-content">
                  Accuracy
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-semibold text-body1">
                  {userData?.recentAverageAccuracy}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-route text-textsecond font-bold text-content">
                  Errors Per Game
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-body1">
                  {userData?.recentAverageErrors}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex-col  gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
            <p className="font-route w-full uppercase text-[20px] font-bold text-textcolor border-b-2 border-bprimary">
              Averages (all time)
            </p>
            <div className="flex flex-col gap-1 pt-3">
              <div className="flex flex-col gap-1">
                <p className="font-route text-textsecond font-bold text-body1">
                  WPM
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-body1">
                  {userData?.averageWpm}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-route text-textsecond font-bold text-content">
                  Accuracy
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-body1">
                  {userData?.averageAccuracy}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-route text-textsecond font-bold text-content">
                  Errors Per Game
                </p>
                <p className="font-route text-textcolor mt-[-9px] font-bold text-body1">
                  {userData?.averageErrors}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex-col  gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
          <p className="font-route w-full uppercase text-content font-bold text-textcolor border-b-2 border-bprimary">
            Records
          </p>
          <div className="flex justify-between pt-3">
            <div className="flex flex-col gap-1">
              <p className="font-route text-textsecond font-bold text-content">
                Highest WPM
              </p>
              <p className="font-route text-textcolor mt-[-9px] font-bold text-content">
                {userData?.topWpm}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-route text-textsecond font-bold text-content">
                Games Won
              </p>
              <p className="font-route text-textcolor mt-[-9px] font-bold text-content">
                {userData?.totalWins}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-route text-textsecond font-bold text-content">
                Games Played
              </p>
              <p className="font-route text-textcolor mt-[-9px] font-bold text-content">
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
