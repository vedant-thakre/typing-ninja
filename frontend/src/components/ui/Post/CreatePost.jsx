import React from "react";
import AnimatedButton from "../Other/AnimatedButton";
import { NavLink } from "react-router-dom";
import { handleTabTitle } from "../../../utils/helper";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const user = useSelector((state) => state.user.userData);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-[700px] mt-[100px]">
        {user && !user?.isVerified && (
          <div className="bg-danger rounded-lg px-4 py-2 flex justify-between items-center">
            <div className=" font-route text-[21px] text-white ">
              Please verify your email to post in the forums.
            </div>
            <span className="font-route text-[18px] text-white underline cursor-pointer">
              Verify Email
            </span>
          </div>
        )}
        <div className="bg-bgsecondary mb-[30px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full flex justify-between px-5 bg-primary py-2 rounded-t-2xl">
            <h5 className="text-white font-route text-[24px] font-bold">
              Create Post
            </h5>
            <NavLink to="/discuss" onClick={() => handleTabTitle("Discuss")}>
              <h5 className="text-white underline w-max flex gap-[2px] cursor-pointer items-center font-route text-[21px] font-bold">
                Back
              </h5>
            </NavLink>
          </div>
          <div className="flex flex-col mx-1 gap-2 py-4 pb-5 px-5 rounded-2xl">
            <div className="flex flex-col gap-6">
              <textarea
                rows={3}
                placeholder="The title of your post"
                className="border-2 border-bprimary w-[650px] placeholder:font-route placeholder:text-[20px] rounded-md placeholder-textsecond outline-none focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor flex items-center"
              ></textarea>
              <textarea
                rows={16}
                placeholder="The content of your post"
                className="border-2 border-bprimary w-[650px] placeholder:font-route placeholder:text-[20px] rounded-md placeholder-textsecond outline-none focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor flex items-center"
              ></textarea>
            </div>
            <div className="flex gap-3 justify-start pt-4">
              <AnimatedButton
                title={"CREATE POST"}
                disabled={!user?.isVerified}
                animated={user?.isVerified}
                className={`px-20 font-bold rounded-lg text-white py-[2px] ${
                  user?.isVerified
                    ? "border-bdshadow "
                    : " bg-[#808080] border-[#4f4f4f] cursor-not-allowed "
                }  font-route text-lg border-4`}
              />
              <NavLink to="/discuss" onClick={() => handleTabTitle("Discuss")}>
                <AnimatedButton
                  title={"CANCEL"}
                  className="bg-transparent text-textcolor border-bprimary border-[3px] px-4 font-bold rounded-lg py-[2px] font-route text-lg"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
