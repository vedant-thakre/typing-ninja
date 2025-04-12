import React, { useEffect, useRef, useState } from 'react'
import AnimatedButton from '../components/AnimatedButton';
import { FaLessThan, FaGreaterThan, FaLongArrowAltRight } from "react-icons/fa";
import { getRelativeTime, handleTabTitle } from "../utils/helper";
import { NavLink, useNavigate } from 'react-router-dom';
import { postList } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/slices/postSlice';
import Pagination from '../components/ui/Pagination';


const Discuss = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNo, setpageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState("old");
  const user = useSelector((state) => state.user.userData);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => { 
    dispatch(getPosts({ pageNo, limit, sortOrder }));
    handleTabTitle("Discuss");
  }, [pageNo]);
  
  return (
    <div className="min-h-screen mx-3 md:mx-0 flex justify-center items-center">
      <div className="flex flex-col gap-4 w-[700px] mt-[130px]">
        {!user?.isVerified && (
          <div className="bg-danger rounded-lg px-4 py-2 flex justify-between items-center">
            <div className=" font-route text-[21px] text-white ">
              Please verify your email to post in the forums.
            </div>
            <span className="font-route text-[18px] text-white underline cursor-pointer">
              Verify Email
            </span>
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
              {posts.length > 0 &&
                posts.map((item, index) => {
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
                        <h5
                          onClick={() => {
                            handleTabTitle(item?.title);
                            navigate(`/post/${item?._id}`);
                          }}
                          className="text-white cursor-pointer font-route text-[22px] underline"
                        >
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
                          Last Comment{" "}
                          {getRelativeTime(item?.latestCommentDate)}
                        </p>
                      )}
                      <p className="underline cursor-pointer text-textsecond font-route text-[19px]">
                        {item?.commentCount} comments
                      </p>
                    </div>
                  );
                })}
            </div>
            <Pagination  pageNo={pageNo} setpageNo={setpageNo}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discuss
