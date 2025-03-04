import React from "react";
import AnimatedButton from "../AnimatedButton";
import { NavLink } from "react-router-dom";
import { handleTabTitle } from "../../utils/helper";

const CreatePost = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-secondary mb-[50px]  mt-[120px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
            Create Post
          </h5>
        </div>
        <div className="flex flex-col mx-1 gap-2 py-4 pb-5 px-5 rounded-2xl">
          <div className="flex flex-col gap-6">
            <textarea
              rows={3}
              placeholder="The title of your post"
              className="border-2 border-bprimary w-[650px] placeholder:font-route placeholder:text-[20px] rounded-md placeholder-bprimary outline-none focus:ring-0 py-2 px-2 bg-dark text-white flex items-center"
            ></textarea>
            <textarea
              rows={16}
              placeholder="The content of your post"
              className="border-2 border-bprimary w-[650px] placeholder:font-route placeholder:text-[20px] rounded-md placeholder-bprimary outline-none focus:ring-0 py-2 px-2 bg-dark text-white flex items-center"
            ></textarea>
          </div>
          <div className="flex gap-3 justify-start pt-4">
            <AnimatedButton
              title={"CREATE POST"}
              className="bg-primary px-20 font-bold rounded-lg py-[2px] font-route text-lg border-4"
            />
            <NavLink to="/discuss" onClick={() => handleTabTitle("Discuss")}>
              <AnimatedButton
                title={"CANCEL"}
                className="bg-transparent border-bprimary border-[3px] px-4 font-bold rounded-lg py-[2px] font-route text-lg"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
