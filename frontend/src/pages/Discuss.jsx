import React, { useState } from 'react'
import AnimatedButton from '../components/AnimatedButton';
import { FaLessThan, FaGreaterThan, FaLongArrowAltRight } from "react-icons/fa";
import { getRelativeTime, handleTabTitle } from "../utils/helper";
import { NavLink } from 'react-router-dom';
import { postList } from '../utils/data';


const Discuss = () => {
  const [pageNo, setpageNo] = useState(1);
  const isEmailVerified = false
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 w-[700px] mt-[130px]">
        {!isEmailVerified && (
          <div className="px-4 py-2 font-route text-[21px] text-white bg-danger rounded-lg">
            Please verify your email to post in the forums.
          </div>
        )}
        <div className="bg-secondary mb-[50px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full flex justify-between px-4 bg-primary py-2 rounded-t-2xl">
            <h5 className="text-white font-route text-[24px] font-bold">
              Discussion
            </h5>
            <NavLink to="/post" onClick={() => handleTabTitle("Post")}>
              <h5 className="text-white underline w-max flex gap-[2px] cursor-pointer items-center font-route text-[21px] font-bold">
                Create Post <FaLongArrowAltRight color={"white"} />
              </h5>
            </NavLink>
          </div>
          <div className="w-full flex flex-col gap-1 pb-2">
            <div className="flex flex-col mx-5 my-2 gap-2 pt-4 pb-2 px-6 border-2 border-bprimary rounded-2xl">
              {postList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex w-full flex-col pb-2 ${
                      index === postList?.length - 1
                        ? ""
                        : "border-textsecond border-b-2"
                    } gap-[6px]`}
                  >
                    <div className="flex w-full flex-col">
                      <h5 className="text-white cursor-pointer font-route text-[22px] underline">
                        {item?.title}
                      </h5>
                      <p className="text-textsecond font-route text-[20px]">
                        Posted {getRelativeTime(item?.createdAt)} by{" "}
                        <span className="underline cursor-pointer">
                          {item?.user?.username}
                        </span>
                      </p>
                    </div>
                    {item?.commentCount > 0 && (
                      <p className="text-textsecond font-route text-[19px]">
                        Last Comment {getRelativeTime(item?.updatedAt)}
                      </p>
                    )}
                    <p className="underline cursor-pointer text-textsecond font-route text-[19px]">
                      {item?.commentCount} comments
                    </p>
                  </div>
                );
              })}
            </div>
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
  );
}

export default Discuss
