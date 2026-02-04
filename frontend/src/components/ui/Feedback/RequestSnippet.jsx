import React from "react";
import AnimatedButton from "../Other/AnimatedButton";
import { NavLink, useNavigate } from "react-router-dom";
import { errorToast, handleTabTitle } from "../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { requestSnippet } from "../../../store/slices/gameSlice";
import toast from "react-hot-toast";

const RequestSnippet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const [wordLimit, setWordLimit] = useState({ min: 180, max: 240 });
  const loading = useSelector((state) => state.game.loading);
  const [snippetInfo, setSnippetInfo] = useState({
    title: "",
    content: "",
    difficulty: "easy",
  });

  const handleSubmit = async () => {
    console.log(snippetInfo);
    if (
      snippetInfo.title === "" ||
      snippetInfo.content === "" ||
      snippetInfo.difficulty === ""
    )
      return toast("Please fill all the fields", errorToast);
    if (snippetInfo.title.length > 35){
      return toast("Title must be less than 35 characters", errorToast);
    }
    if (snippetInfo.content.length < wordLimit.min || snippetInfo.content.length > wordLimit.max){
      return toast(`Content must be between ${wordLimit.min} and ${wordLimit.max} characters`, errorToast);
    }
    try {
      const res = await dispatch(requestSnippet(snippetInfo));
      if (res?.payload?.status === 200) {
        setSnippetInfo({ title: "", content: "", difficulty: "" });
      }
    } catch (error) {
      toast(error.response.data.message, errorToast);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${!user?.isAdmin && "mt-16"}`}>
      {user && !user?.isVerified && (
        <div className="bg-danger rounded-lg px-4 py-2 flex justify-between items-center">
          <div className=" font-route text-[21px] text-white ">
            Please verify your email to request a snippet.
          </div>
          <span className="font-route text-[18px] text-white underline cursor-pointer">
            Verify Email
          </span>
        </div>
      )}
      <div
        className={`bg-bgsecondary flex flex-col items-center gap-3 rounded-2xl  shadow-hard`}
      >
        <div className="w-full flex justify-between px-5 bg-primary py-2 rounded-t-2xl">
          <h5 className="text-white font-route text-[20px] font-bold">
            Create Post
          </h5>
          <NavLink to="/discuss" onClick={() => navigate(-1)}>
            <h5 className="text-white underline w-max flex gap-[2px] cursor-pointer items-center font-route text-[20px] font-bold">
              Back
            </h5>
          </NavLink>
        </div>
        <div className="flex w-full flex-col mx-1 gap-2 pb-5 px-5 rounded-2xl">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col col-span-2 ">
                <p className="font-route text-[20px] text-textcolor font-normal">
                  Title
                </p>
                <input
                  placeholder="Enter title..."
                  value={snippetInfo.title}
                  onChange={(e) =>
                    setSnippetInfo({ ...snippetInfo, title: e.target.value })
                  }
                  type="text"
                  className="border-2 border-bprimary  ml-2 mt-[-5px] lg:ml-0 rounded-md  placeholder-textsecond outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-textcolor"
                />
              </div>
              <div className="flex flex-col col-span-1 ">
                <p className="font-route text-[20px] text-textcolor font-normal">
                  Difficulty
                </p>
                <select
                  name=""
                  onChange={(e) => {
                    setSnippetInfo({
                      ...snippetInfo,
                      difficulty: e.target.value,
                    });
                    if (e.target.value === "easy")
                      setWordLimit({ min: 180, max: 240 });
                    else if (e.target.value === "medium")
                      setWordLimit({ min: 280, max: 360 });
                    else if (e.target.value === "hard")
                      setWordLimit({ min: 380, max: 460 });
                  }}
                  className="border-2 border-bprimary cursor-pointer ml-2 mt-[-5px] lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-textcolor"
                  id=""
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="font-route text-[20px] text-textcolor font-normal">
                  Content
                </p>
                <p className="font-route text-[20px] text-textcolor font-normal">
                  Limit :{" "}
                  <span className="font-route text-[16px] ml-1 text-textsecond">
                    {wordLimit?.min} - {wordLimit?.max} words
                  </span>
                </p>
              </div>
              <textarea
                rows={12}
                value={snippetInfo.content}
                onChange={(e) =>
                  setSnippetInfo({ ...snippetInfo, content: e.target.value })
                }
                placeholder="The content of your snippet..."
                className="border-2 border-bprimary w-full font-route text-[20px] leading-6 tracking-wide  mt-[-5px] placeholder:font-route rounded-md placeholder:text-[16px]  placeholder-textsecond outline-none focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor flex items-center"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-start pt-4">
            <AnimatedButton
              title={"SUBMIT"}
              disabled={!user?.isVerified || loading}
              animated={user?.isVerified}
              onClick={() => handleSubmit()}
              className={`px-20 font-bold rounded-lg text-white py-[2px] ${
                user?.isVerified
                  ? "border-bdshadow "
                  : " bg-[#808080] border-[#4f4f4f] cursor-not-allowed "
              }  font-route text-lg border-4`}
            />
            <NavLink to="/home" onClick={() => handleTabTitle("Discuss")}>
              <AnimatedButton
                title={"CANCEL"}
                className="bg-transparent text-textcolor border-bprimary border-[3px] px-4 font-bold rounded-lg py-[2px] font-route text-lg"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSnippet;
