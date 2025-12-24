import React, { useState, useMemo } from "react";
import AnimatedButton from "../components/ui/Other/AnimatedButton";
import {
  emojiList,
  homeRecentMatches,
  homeRecentPosts,
  matchHistoryList,
  recordList,
  userData,
} from "../utils/data";
import { getRelativeTime, homeButtons } from "../utils/helper";
import { NavLink, useNavigate } from "react-router-dom";
import PlayButton from "../components/ui/Other/PlayButton";
import { motion } from "framer-motion";
import { FaLongArrowAltRight, FaLessThan, FaGreaterThan } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Pagination from "../components/ui/Other/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const [emoji, setEmoji] = useState(
    localStorage.getItem("emoji") ?? emojiList[230]
  );
  const [nickName, setNickName] = useState(
    localStorage.getItem("nickName") ?? ""
  );
  const [pageNo, setPageNo] = useState(1);
  const emojisPerPage = 16;
  const totalPages = Math.ceil(emojiList.length / emojisPerPage);

  // Get emojis for the current page (memoized for tiny perf win)
  const currentEmojis = useMemo(
    () => emojiList.slice((pageNo - 1) * emojisPerPage, pageNo * emojisPerPage),
    [pageNo]
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPageNo(newPage);
    }
  };

  document.title = "TyperX | Home";

  return (
    <div className="min-h-screen flex justify-center items-start bg-transparent">
      <div className="w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 mt-[140px]">
        {/* Grid: 1 col mobile, 2 col md, 3 col lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <aside className="flex flex-col gap-6">
            {/* News */}
            <section className="bg-bgprimary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
              <div className="w-full">
                <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[18px] md:text-[20px] font-bold">
                  News
                </h5>
              </div>

              <div className="flex flex-col text-textcolor tracking-wide gap-4 leading-none m-4 py-4 px-5 border-2 border-bprimary rounded-2xl">
                <div className="flex flex-col gap-1">
                  <h4 className="font-route text-[20px] md:text-[25px]">
                    Improve your typing speed and race your friends!
                  </h4>
                  <p className="text-textsecond font-route text-[14px] md:text-[16px]">
                    Updated {getRelativeTime("2023-02-06T16:18:55Z")}
                  </p>
                </div>
                <p className="font-route font-bold leading-none text-[16px] md:text-[19px]">
                  Hello, thank you for visiting the website. Join the Discord to
                  arrange very large lobbies!
                </p>

                <motion.button
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {}}
                  className="bg-transperant flex justify-center gap-1 rounded-full font-route text-[16px] md:text-[18px] py-2 border-2 border-bprimary text-textcolor shadow-lg"
                >
                  Join on Discord <FaLongArrowAltRight color={"white"} />
                </motion.button>

                <div className="flex flex-col gap-3">
                  <h4 className="font-route text-textcolor font-bold text-[15px] md:text-[17px]">
                    (Nov. 22nd, 2022) Updates :
                  </h4>
                  <div className="flex ml-4 flex-col text-[14px] md:text-[16px] gap-2">
                    <p className="font-route flex gap-2 items-start ">
                      <GoDotFill size={13} /> Added daily match goal
                    </p>
                    <p className="font-route flex gap-2 items-start ">
                      <GoDotFill size={13} />
                      Updated match connectivity
                    </p>
                    <p className="font-route flex gap-2 items-start ">
                      <GoDotFill size={13} className="flex-shrink-0" />
                      You can now use custom text in private lobbies
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </aside>

          {/* CENTER COLUMN */}
          <main className="flex flex-col gap-6">
            {/* You + Play Buttons (stacked on mobile) */}
            <div className="flex flex-col lg:flex-row gap-5">
              {/* You Card */}
              <div className="bg-bgprimary flex-1 flex flex-col items-center gap-3 rounded-2xl shadow-hard">
                <div className="w-full">
                  <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[18px] md:text-[20px] font-bold">
                    You
                  </h5>
                </div>

                <div className="flex flex-col w-full p-1 pb-4 px-4 gap-4">
                  <div className="flex w-full gap-4">
                    <div className="flex-1 flex flex-col h-full gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
                      <div className="flex items-center flex-col gap-6">
                        <div className="flex w-full flex-col items-center gap-3">
                          <div className="w-[100px] h-[100px] flex items-center justify-center text-4xl md:text-5xl rounded-full border-2 border-bprimary">
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
                            className="outline-none px-2 text-[15px] md:text-[17px] text-textcolor placeholder:text-center font-route placeholder:text-[14px] md:placeholder:text-[16px] text-center placeholder:text-textsecond bg-transparent border-2 border-bprimary rounded-full py-[6px] w-[200px]"
                          />

                          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-5 gap-2">
                            {currentEmojis.map((emj, index) => (
                              <motion.div
                                whileHover={{ scale: 1.06 }}
                                key={index}
                                onClick={() => {
                                  setEmoji(emj);
                                  localStorage.setItem("emoji", emj);
                                }}
                                className="flex items-center hover:border-2 border-primary justify-center w-11 h-11 cursor-pointer bg-bgsecondary text-textcolor text-2xl rounded-full"
                                role="button"
                                aria-label={`select-emoji-${index}`}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    setEmoji(emj);
                                    localStorage.setItem("emoji", emj);
                                  }
                                }}
                              >
                                {emj}
                              </motion.div>
                            ))}
                          </div>

                          <div className="mt-2">
                            {/* Pagination component (keeps existing API) */}
                            <Pagination pageNo={pageNo} setpageNo={setPageNo} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Play Buttons column (keeps same look) */}
              <div className="flex flex-col flex-[3.5] gap-5">
                {homeButtons?.map((item, index) => {
                  return (
                    <PlayButton
                      key={index}
                      route={item?.route}
                      title={item?.title}
                      subTitle={item?.subTitle}
                      className={item?.className}
                    />
                  );
                })}
              </div>
            </div>

            {/* Highscore section */}
            <section className="bg-bgprimary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
              <div className="w-full">
                <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[18px] md:text-[20px] font-bold">
                  Highscore
                </h5>
              </div>

              <div className="w-full flex flex-col px-4 pb-4 gap-2">
                <div>
                  <div className="grid grid-cols-12 px-5 w-full">
                    <p className="col-span-1 font-main pb-3 text-[13px] md:text-[15px] font-light text-textsecond">
                      #
                    </p>
                    <p className="col-span-7 font-main text-[13px] md:text-[15px] pb-3 font-light text-textsecond">
                      Name
                    </p>
                    <p className="col-span-2 text-center mr-[-10px] font-main text-[13px] md:text-[15px] pb-3 font-light text-textsecond">
                      Accuracy
                    </p>
                    <p className="col-span-2 font-main text-end pr-3 text-[13px] md:text-[15px] pb-3 font-light text-textsecond">
                      WPM
                    </p>
                  </div>
                  <hr className="border-b-[2px] border-bprimary mx-2" />
                </div>

                <div
                  className="flex flex-col gap-2 overflow-y-auto py-4 w-full px-3 border-2 scrollbar-custom border-bprimary rounded-2xl"
                  style={{
                    maxHeight:
                      window.innerWidth >= 1024
                        ? 600
                        : window.innerWidth >= 768
                        ? 520
                        : 400,
                  }}
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
                        <p className="col-span-1 font-route text-[14px] md:text-[16px] text-textsecond">
                          {index + 1}
                        </p>
                        <div className="col-span-8 flex flex-col pr-2">
                          <p className="col-span-8 font-route pr-2 font-bold text-[15px] md:text-[17px] text-textcolor">
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
                        <p className="col-span-1 font-route text-[14px] md:text-[16px] text-textsecond">
                          {item?.accuracy} %
                        </p>
                        <p className="col-span-1 font-route text-[14px] md:text-[16px] pl-6 text-textsecond text-start">
                          {item?.wpm}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </main>

          {/* RIGHT COLUMN */}
          <aside className="flex flex-col gap-6">
            {/* Recent Posts */}
            <section className="bg-bgprimary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
              <div className="w-full">
                <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[18px] md:text-[20px] font-bold">
                  Recent Posts
                </h5>
              </div>

              {!homeRecentPosts?.length ? (
                <div className="flex flex-col min-h-[200px] md:min-h-[300px] gap-2 px-5 py-6">
                  <p className="text-textcolor font-route text-[20px] md:text-[23px]">
                    Platform has not posts yet.
                  </p>
                </div>
              ) : (
                <div className="w-full px-4 pt-1 pb-4">
                  <div className="flex flex-col h-[400px] md:h-[520px] lg:h-[600px] scrollbar-custom overflow-y-auto gap-2 pt-2 pb-2 px-4 border-2 border-bprimary rounded-2xl">
                    {homeRecentPosts.map((item, index) => {
                      return (
                        <article
                          key={index}
                          className={`flex w-full flex-col pb-2 ${
                            index === homeRecentPosts?.length - 1
                              ? ""
                              : "border-textsecond border-b-2"
                          } gap-[6px]`}
                        >
                          <div className="flex w-full flex-col">
                            <h5 className="text-textcolor tracking-wider cursor-pointer font-route text-[18px] md:text-[20px] underline">
                              {item?.title}
                            </h5>
                            <p className="text-textsecond mt-[-3px] font-route text-[14px] md:text-[16px]">
                              Posted {getRelativeTime(item?.createdAt)} by{" "}
                              <span className="underline cursor-pointer">
                                {item?.user?.username}
                              </span>
                            </p>
                          </div>

                          <p className="cursor-pointer text-textcolor font-route leading-none text-[15px] md:text-[17px]">
                            {item?.body?.length > 110
                              ? item?.body.slice(0, 110) + "..."
                              : item?.body}
                          </p>

                          {item?.commentCount > 0 && (
                            <p className="text-textsecond font-route text-[14px] md:text-[16px]">
                              Last Comment {getRelativeTime(item?.updatedAt)}
                            </p>
                          )}

                          <p className="underline mt-[-10px] cursor-pointer text-textsecond font-route text-[14px] md:text-[16px]">
                            {item?.commentCount} comments
                          </p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* Recent Matches / Records */}
            <section className="bg-bgprimary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
              <div className="w-full">
                <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[18px] md:text-[20px] font-bold">
                  Recent Matches
                </h5>
              </div>

              <div className="w-full pb-4 px-4">
                <div
                  className="flex flex-col gap-2 overflow-y-auto py-4 w-full px-3 border-2 border-bprimary rounded-2xl scrollbar-custom"
                  style={{
                    maxHeight:
                      window.innerWidth >= 1024
                        ? 600
                        : window.innerWidth >= 768
                        ? 520
                        : 400,
                  }}
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
                        <p className="col-span-1 font-route text-[15px] md:text-[17px] text-textsecond">
                          {index + 1}
                        </p>
                        <div className="col-span-8 flex flex-col pr-2">
                          <p className="col-span-8 font-route pr-2 font-bold text-[15px] md:text-[18px] text-textcolor">
                            {item?.nickname}
                          </p>
                          <div className="flex mt-[-4px] items-center">
                            <p className="font-main text-[13px] md:text-[16px] font-thin text-textsecond">
                              {getRelativeTime(item?.created_at)}
                            </p>
                          </div>
                        </div>
                        <p className="col-span-1 font-route text-[15px] md:text-[17px] pl-6 text-textsecond text-start">
                          {item?.wpm}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
