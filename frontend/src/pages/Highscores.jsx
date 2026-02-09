import React, { useEffect, useState } from "react";
import AnimatedButton from "../components/ui/Other/AnimatedButton";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { highscoreList } from "../utils/data";
import Pagination from "../components/ui/Other/Pagination";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHighScores } from "../store/slices/scoreSlice";
import { getRelativeTime } from "../utils/helper";

const Highscores = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "speed";
  const difficultyParam = searchParams.get("difficulty") || "all";
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const limitParam = parseInt(searchParams.get("limit")) || 10;

  const tabValue = tabParam === "matches" ? "Top Matches" : "Top Speed";
  const difficultyValue = difficultyParam.toUpperCase();
  const pageNo = pageParam;
  const limit = limitParam;
  const query = tabParam === "matches" ? "matchCount" : "wpm";

  const difficulties = ["ALL", "EASY", "MEDIUM", "HARD"];

  const { cache, loading } = useSelector((state) => state.scores);

  const cacheKey = `${difficultyParam}-${query}-${pageNo}-${limit}`;
  const leaderboardData = cache[cacheKey] || {};
  // const rows = [];
  const rows = leaderboardData?.data || [];
  console.log(rows);

  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    setSearchParams(newParams);
  };

  useEffect(() => {
    if (!searchParams.toString()) {
      setSearchParams({
        tab: "speed",
        difficulty: "all",
        page: 1,
        limit: 10,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(
      fetchHighScores({
        page: pageNo,
        limit: limit,
        difficulty: difficultyParam,
        query,
      }),
    );
  }, [dispatch, pageNo, limit, difficultyParam, query]);

  return (
    <div className="min-h-screen mx-3 md:mx-0 flex justify-center">
      <div className="flex flex-col gap-4 w-[800px] mt-[30px]">
        <div className="grid grid-cols-2 gap-3 ">
          <AnimatedButton
            title="Top Speed"
            onClick={() => updateParams({ tab: "speed", page: 1 })}
            className="font-route shadow-hard text-white hover:underline tracking-wide font-medium text-xl rounded-xl py-2 px-24"
          />
          <AnimatedButton
            title="Top Matches"
            onClick={() => updateParams({ tab: "matches", page: 1 })}
            className="font-route shadow-hard text-white hover:underline font-normal tracking-normal text-title2 rounded-xl py-2 px-24"
          />
        </div>
        <div className="bg-bgprimary mb-[50px] w-full flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full">
            <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-title2 font-bold">
              {tabValue + ` - ${difficultyValue.toLowerCase()} quotes`}
            </h5>

            {/* <Pagination
              pageNo={pageNo}
              setpageNo={(newPage) => updateParams({ page: newPage })}
            /> */}
            <div className="grid grid-cols-4 pt-4 w-full">
              {difficulties.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      updateParams({
                        difficulty: item.toLowerCase(),
                        page: 1,
                      })
                    }
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
            <div className="flex w-full flex-col gap-2 pt-2 pb-3 px-3 border-2 border-bprimary rounded-2xl min-h-[550px]">
              {loading ? (
                [...Array(10)].map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className={`grid grid-cols-12 gap-2  rounded-lg  w-full animate-pulse border-b-2 border-bprimary `}
                  >
                    <div className="col-span-12 h-10 bg-pulse rounded"></div>
                  </div>
                ))
              ) : rows?.length > 0 ? (
                <>
                  {rows.map((item, index) => (
                    <div
                      key={item?.userId || index}
                      className={`grid grid-cols-12 px-3 cursor-pointer rounded-lg py-2 w-full hover:bg-bprimary  ${
                        index === rows?.length - 1
                          ? ""
                          : "border-b-2 border-bprimary"
                      }`}
                    >
                      <p className="col-span-1 font-route text-title3 text-textcolor">
                        {index + 1}
                      </p>
                      <p
                        className={`${tabValue === "Top Speed" ? "col-span-7" : "col-span-9"} font-route text-title3 text-textcolor`}
                      >
                        {item?.username}
                      </p>
                      {tabValue === "Top Speed" ? (
                        <>
                          <p className="col-span-2 font-route text-body1 text-textcolor">
                            {getRelativeTime(item?.date)}
                          </p>
                          <p className="col-span-2 font-route text-content pl-6 text-textcolor text-center">
                            {parseFloat(item?.wpm).toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="col-span-2 text-center font-route text-title3 text-textcolor">
                          {item?.matchCount}
                        </p>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                // Empty state
                <div className="flex items-center justify-center py-10">
                  <p className="text-center text-textsecond">
                    No leaderboard data available
                  </p>
                </div>
              )}
            </div>
            <div className="mt-2">
              <Pagination
                pageNo={pageNo}
                setpageNo={(page) => updateParams({ page })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highscores;
