import React from "react";
import AnimatedButton from "../AnimatedButton";
import { matchHistoryList, recordList, userData } from "../../utils/data";
import { getRelativeTime } from "../../utils/helper";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex gap-x-6 py-5 px-7 mt-[140px]">
        <div className="bg-secondary flex-[3.5] h-min flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full">
            <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
              Profile
            </h5>
          </div>
          {/* Profile */}
          <div className="flex flex-col m-4 gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
            <div className="flex items-center flex-col gap-6">
              <div className="flex w-full flex-col items-center gap-2">
                <div className="w-[120px] h-[120px] rounded-full border-2 border-bprimary"></div>
                <p className="font-route text-[24px] text-white">
                  {userData?.username}
                </p>
                <p className="font-route text-[21px] mt-[-17px] text-textsecond">
                  Joined at {getRelativeTime(userData?.insertedAt)}
                </p>
                {!userData?.bio ? (
                  <div className="flex w-full flex-col gap-1">
                    <p className="font-main w-full text-[15px] text-white border-b-2 border-bprimary">
                      ABOUT
                    </p>
                    <div className="flex items-center py-8 justify-center">
                      <p className="font-route px-4 text-center leading-[23px] text-[21px] text-white">
                        We don't know much about this person yet.
                      </p>
                    </div>
                    <AnimatedButton
                      title={"EDIT PROFILE"}
                      className={
                        "border-2 py-1 rounded-lg font-route text-[20px]"
                      }
                      onClick={() => {
                        navigate("/settings");
                        getRelativeTime("Settings");
                      }}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-[5] gap-5">
          {/* Overview */}
          <div className="bg-secondary  flex flex-col items-center gap-3 rounded-2xl shadow-hard">
            <div className="w-full">
              <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                Overview
              </h5>
            </div>
            <div className="flex flex-col w-full p-4 gap-4">
              <div className="flex w-full gap-4">
                <div className="flex-1 flex-col  gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
                  <p className="font-route w-full uppercase text-[20px] font-bold text-white border-b-2 border-bprimary">
                    Averages (Recent 25)
                  </p>
                  <div className="flex flex-col pt-3">
                    <div className="flex flex-col">
                      <p className="font-route text-textsecond font-bold text-[20px]">
                        WPM
                      </p>
                      <p className="font-route text-white mt-[-9px] font-bold text-[18px]">
                        {userData?.recentAverageWpm}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-route text-textsecond font-bold text-[20px]">
                        Accuracy
                      </p>
                      <p className="font-route text-white mt-[-9px] font-bold text-[18px]">
                        {userData?.recentAverageAccuracy}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-route text-textsecond font-bold text-[20px]">
                        Errors Per Game
                      </p>
                      <p className="font-route text-white mt-[-9px] font-bold text-[18px]">
                        {userData?.recentAverageErrors}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex-col  gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
                  <p className="font-route w-full uppercase text-[20px] font-bold text-white border-b-2 border-bprimary">
                    Averages (all time)
                  </p>
                  <div className="flex flex-col pt-3">
                    <div className="flex flex-col">
                      <p className="font-route text-textsecond font-bold text-[20px]">
                        WPM
                      </p>
                      <p className="font-route text-white mt-[-9px] font-bold text-[18px]">
                        {userData?.averageWpm}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-route text-textsecond font-bold text-[20px]">
                        Accuracy
                      </p>
                      <p className="font-route text-white mt-[-9px] font-bold text-[18px]">
                        {userData?.averageAccuracy}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-route text-textsecond font-bold text-[20px]">
                        Errors Per Game
                      </p>
                      <p className="font-route text-white mt-[-9px] font-bold text-[18px]">
                        {userData?.averageErrors}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex-col  gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
                <p className="font-route w-full uppercase text-[20px] font-bold text-white border-b-2 border-bprimary">
                  Records
                </p>
                <div className="flex justify-between pt-3">
                  <div className="flex flex-col">
                    <p className="font-route text-textsecond font-bold text-[20px]">
                      Highest WPM
                    </p>
                    <p className="font-route text-white mt-[-9px] font-bold text-[18px]">
                      {userData?.topWpm}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-route text-textsecond font-bold text-[20px]">
                      Games Won
                    </p>
                    <p className="font-route text-white mt-[-9px] font-bold text-[18px]">
                      {userData?.totalWins}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-route text-textsecond font-bold text-[20px]">
                      Games Played
                    </p>
                    <p className="font-route text-white mt-[-9px] font-bold text-[18px]">
                      {userData?.matchCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Matches */}
          <div className="bg-secondary  flex flex-col items-center gap-3 rounded-2xl shadow-hard">
            <div className="w-full">
              <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
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
                      <p className="col-span-1 font-route text-[20px] text-textsecond">
                        {item?.accuracy} %
                      </p>
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
        <div className="flex flex-col flex-[3.5] gap-5">
          {/* Posts */}
          <div className="bg-secondary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
            <div className="w-full">
              <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                Posts
              </h5>
            </div>
            {!userData?.length ? (
              <div className="flex flex-col min-h-[400px] gap-2 px-5">
                <p className="text-white font-route text-[23px]">
                  {userData?.username} has not created any posts.
                </p>
              </div>
            ) : (
              <div className="flex flex-col m-4 gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl"></div>
            )}
          </div>
          {/* Records */}
          <div className="bg-secondary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
            <div className="w-full">
              <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                Records
              </h5>
            </div>
            <div className="w-full px-4">
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

export default Profile;
