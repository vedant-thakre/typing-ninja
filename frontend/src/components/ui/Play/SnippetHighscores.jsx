import React, { memo, useEffect, useState } from "react";
import { getRelativeTime } from "../../../utils/helper";
import ListSkeletton from "../../skeletons/ListSkeletton";
import { useSelector } from "react-redux";
import "../../../styles/play-styles.css";
import { useMemo } from "react";

const SnippetHighscores = ({ highScores, loading }) => {
  const username = useSelector((state) => state.user.userData?.username);

  const isNewEntry = useMemo(() => {
    return (item) => {
      if (!item?.createdAt || item?.username !== username) return false;

      try {
        const scoreTime = new Date(item.createdAt).getTime();
        const now = Date.now();
        const twoMinutesAgo = now - 2 * 60 * 1000;

        return scoreTime > twoMinutesAgo;
      } catch (error) {
        console.error("Error parsing timestamp:", error);
        return false;
      }
    };
  }, [username]);

  console.log("✅ Highscore rendered");

  return (
    <div className="flex flex-col flex-[3] gap-5">
      <div className="bg-bgsecondary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider py-2 px-5 bg-primary rounded-t-2xl rounded-b-md font-route text-[21px] font-bold">
            Snippet Highscore
          </h5>
        </div>
        <div className="w-full pt-2 pb-4 px-4">
          <div
            className="flex flex-col gap-2 h-[600px] scrollbar-custom scroll-m-0 overflow-y-scroll 
                                    py-4 w-full px-3 border-2 border-bprimary rounded-2xl"
          >
            {loading ? (
              <ListSkeletton />
            ) : (
              highScores?.length > 0 &&
              highScores.map((item, index) => (
                <HighScoreItem
                  key={item._id || index}
                  item={item}
                  index={index}
                  total={highScores?.length}
                  isNewEntry={isNewEntry}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate component for each item with animation
const HighScoreItem = memo(({ item, index, total, isNewEntry }) => (
  <div
    className={`
      grid grid-cols-12 items-center px-3 py-1 w-full hover:bg-bprimary 
      transition-all duration-500 ease-out
      ${index === total - 1 ? "" : "border-b-2 border-bprimary"}
      ${isNewEntry(item) ? "new-score-highlight" : ""}
    `}
  >
    <p className="col-span-1 font-route text-[17px] text-textsecond">
      {index + 1}
    </p>
    <div className="col-span-8 flex flex-col pr-2">
      <p className="col-span-8 font-route pr-2 font-bold text-[18px] text-textcolor">
        {item?.username}
      </p>
      <div className="flex mt-[-5px] items-center">
        <p className="font-main text-[14px] text-textsecond">
          {getRelativeTime(item?.createdAt)}
        </p>
      </div>
    </div>
    <p className="col-span-3 w-[100px] font-route text-[15px] text-textsecond text-start">
      {parseFloat(item?.wpm).toFixed(2)} WPM
    </p>
  </div>
));

export default memo(SnippetHighscores);
