import React, { useState } from "react";
import AnimatedButton from "../components/AnimatedButton";
import { emojiList, homeRecentMatches, homeRecentPosts, matchHistoryList, recordList, userData } from "../utils/data";
import { getRelativeTime, homeButtons } from "../utils/helper";
import { NavLink, useNavigate } from "react-router-dom";
import PlayButton from "../components/PlayButton";
import { motion } from "framer-motion";
import { FaLongArrowAltRight, FaLessThan, FaGreaterThan } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";




const Home = () => {
  const navigate = useNavigate();
  const [emoji, setEmoji] = useState(
    localStorage.getItem("emoji") ?? emojiList[230]
  );
  const [nickName, setNickName] = useState(localStorage.getItem("nickName") ?? "");
  const [pageNo, setPageNo] = useState(1);
  const emojisPerPage = 16;
  const totalPages = Math.ceil(emojiList.length / emojisPerPage);

  // Get emojis for the current page
  const currentEmojis = emojiList.slice(
    (pageNo - 1) * emojisPerPage,
    pageNo * emojisPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPageNo(newPage);
    }
  };

  document.title = "TyperX | Home";
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex gap-x-6 py-5 px-7 mt-[140px]">
        <div className="bg-secondary flex-[3.3] h-min flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full">
            <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
              News
            </h5>
          </div>
          {/* Profile */}
          <div className="flex flex-col text-white tracking-wide gap-5 leading-none m-4 py-4 px-5 border-2 border-bprimary rounded-2xl">
            <div className="flex flex-col gap-1">
              <h4 className="font-route text-[34px]">
                Improve your typing speed and race your friends!
              </h4>
              <p className="text-textsecond font-route text-[20px]">
                Updated {getRelativeTime("2023-02-06T16:18:55Z")}
              </p>
            </div>
            <p className="font-route font-bold leading-none text-[22px]">
              Hello, thank you for visiting the website. Join the Discord to
              arrange very large lobbies!
            </p>
            <motion.button
              whileHover={{
                y: -2,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {}}
              className="bg-transperant flex justify-center gap-1 rounded-full font-route text-[24px] py-2 border-2 border-bprimary text-white shadow-lg"
            >
              Join on Discord <FaLongArrowAltRight color={"white"} />
            </motion.button>
            <div className="flex flex-col gap-3">
              <h4 className="font-route text-white font-bold text-[25px]">
                (Nov. 22nd, 2022) Updates :
              </h4>
              <div className="flex ml-4 flex-col gap-2">
                <p className="font-route flex gap-2 items-start text-[21px]">
                  <GoDotFill size={13} /> Added daily match goal
                </p>
                <p className="font-route flex gap-2 items-start text-[21px]">
                  <GoDotFill size={13} />
                  Updated match connectivity
                </p>
                <p className="font-route flex gap-2 items-start text-[21px]">
                  <GoDotFill size={13} className="flex-shrink-0" />
                  You can now use custom text in private lobbies
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-[5.8] gap-5">
          {/* Overview */}
          <div className=" flex gap-5">
            <div className="bg-secondary flex flex-col flex-[4] items-center gap-3 rounded-2xl shadow-hard">
              <div className="w-full">
                <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                  You
                </h5>
              </div>
              <div className="flex flex-col w-full p-1 pb-4 px-4 gap-4">
                <div className="flex w-full gap-4">
                  <div className="flex-1 flex-col h-full gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
                    <div className="flex items-center flex-col gap-6">
                      <div className="flex w-full flex-col items-center gap-3">
                        <div className="w-[100px] h-[100px] flex items-center justify-center text-5xl rounded-full border-2 border-bprimary">
                          {emoji}
                        </div>
                        <input
                          placeholder="Enter Nickname"
                          type="text"
                          value={nickName}
                          onChange={(e) => {
                            setNickName(e.target.value);
                            localStorage.setItem("nickName", e.target.value);
                          }}
                          className="outline-none px-2 text-[22px] text-white placeholder:text-center font-route placeholder:text-[22px] text-center placeholder:text-textsecond bg-transparent border-2 border-bprimary rounded-full py-[2px] w-[200px]"
                        />
                        <div className="grid grid-cols-4 px-2 gap-2">
                          {currentEmojis.map((emoji, index) => (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              key={index}
                              onClick={() => {
                                setEmoji(emoji);
                                localStorage.setItem("emoji", emoji);
                              }}
                              className="flex items-center hover:border-2 border-primary justify-center w-11 h-11 cursor-pointer bg-dark text-white text-2xl rounded-full"
                            >
                              {emoji}
                            </motion.div>
                          ))}
                        </div>
                        <div className="flex justify-center gap-2 ">
                          <AnimatedButton
                            title="1"
                            animated={false}
                            className="px-3 py-[2px] rounded-lg"
                            onClick={() => handlePageChange(1)}
                          />
                          <AnimatedButton
                            icon={<FaLessThan />}
                            onClick={() => handlePageChange(pageNo - 1)}
                            animated={false}
                            className="px-2 py-[2px] rounded-lg"
                          />
                          <AnimatedButton
                            title={pageNo}
                            animated={false}
                            className="w-[26px] py-[2px] bg-transparent shadow-none rounded-lg"
                          />
                          <AnimatedButton
                            icon={<FaGreaterThan />}
                            onClick={() => handlePageChange(pageNo + 1)}
                            animated={false}
                            className="px-2 py-[2px] rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-[3.5] flex-col gap-5">
              {homeButtons?.map((item, index) => {
                return (
                  <PlayButton
                    key={index}
                    onClick={() => navigate("/play")}
                    title={item?.title}
                    subTitle={item?.subTitle}
                    className={item?.className}
                  />
                );
              })}
            </div>
          </div>
          {/* Matches */}
          <div className="bg-secondary  flex flex-col items-center gap-3 rounded-2xl shadow-hard">
            <div className="w-full">
              <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                Highscore
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
        <div className="flex flex-col flex-[3.2] gap-5">
          {/* Posts */}
          <div className="bg-secondary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
            <div className="w-full">
              <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                Recent Posts
              </h5>
            </div>
            {!homeRecentPosts?.length ? (
              <div className="flex flex-col min-h-[400px] gap-2 px-5">
                <p className="text-white font-route text-[23px]">
                  Platform has not posts yet.
                </p>
              </div>
            ) : (
              <div className="w-full px-4 pt-1 pb-4">
                <div className="flex flex-col  h-[600px] scrollbar-custom overflow-y-scroll gap-2 pt-2 pb-2 px-4 border-2 border-bprimary rounded-2xl">
                  {homeRecentPosts.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex w-full flex-col pb-2 ${
                          index === homeRecentPosts?.length - 1
                            ? ""
                            : "border-textsecond border-b-2"
                        } gap-[6px]`}
                      >
                        <div className="flex w-full flex-col">
                          <h5 className="text-white cursor-pointer font-route text-[26px] underline">
                            {item?.title}
                          </h5>
                          <p className="text-textsecond mt-[-10px] font-route text-[20px]">
                            Posted {getRelativeTime(item?.createdAt)} by{" "}
                            <span className="underline cursor-pointer">
                              {item?.user?.username}
                            </span>
                          </p>
                        </div>
                        <p className="cursor-pointer text-white font-route leading-none text-[22px]">
                          {item?.body?.length > 110
                            ? item?.body.slice(0, 110) + "..."
                            : item?.body}
                        </p>
                        {item?.commentCount > 0 && (
                          <p className="text-textsecond font-route text-[19px]">
                            Last Comment {getRelativeTime(item?.updatedAt)}
                          </p>
                        )}
                        <p className="underline mt-[-10px] cursor-pointer text-textsecond font-route text-[19px]">
                          {item?.commentCount} comments
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {/* Records */}
          <div className="bg-secondary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
            <div className="w-full">
              <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                Recent Matches
              </h5>
            </div>
            <div className="w-full pb-4 px-4">
              <div
                className="flex flex-col gap-2 h-[600px] scrollbar-custom overflow-y-scroll 
                          py-4 w-full px-3 border-2 border-bprimary rounded-2xl"
              >
                {homeRecentMatches?.map((item, index) => {
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
                          {item?.nickname}
                        </p>
                        <div className="flex mt-[-4px] items-center">
                          <p className="font-main font-thin text-sm text-textsecond">
                            {getRelativeTime(item?.created_at)}
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

export default Home;
