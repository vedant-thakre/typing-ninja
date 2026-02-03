import React, { useEffect, useState } from "react";
import Pagination from "../Other/Pagination";
import { getRelativeTime, handleTabTitle } from "../../../utils/helper";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import { getPosts } from "../../../store/slices/postSlice";

const PostList = ({ tabValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [sortOrder, setSortOrder] = useState("old");
  const user = useSelector((state) => state.user.userData);
  const posts = useSelector((state) => state.post.posts);
  const total = useSelector((state) => state.post.totalPosts);

  useEffect(() => {
    if (tabValue === "Discussion") {
      dispatch(getPosts({ pageNo: page, limit: 10, sortOrder }));
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className="bg-bgprimary mb-[50px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
      <div className="w-full flex justify-between px-4 bg-primary py-2 rounded-t-2xl">
        <h5 className="text-white font-route text-title font-bold">
          Discussion
        </h5>
        {user && (
          <NavLink to="/post" onClick={() => handleTabTitle("Post")}>
            <h5 className="text-white underline w-max flex gap-[2px] cursor-pointer items-center font-route text-[21px] font-bold">
              Create Post <FaLongArrowAltRight color={"white"} />
            </h5>
          </NavLink>
        )}
      </div>
      <div className="w-full flex flex-col gap-1 pb-2">
        <div className="flex flex-col mx-5 my-2 gap-2 pt-4 pb-2 px-6 border-2 border-bprimary rounded-2xl">
          {posts.length > 0 &&
            posts.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex w-full flex-col pb-2 ${
                    index === posts?.length - 1
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
                      className="text-textcolor cursor-pointer font-route text-title "
                    >
                      {item?.title}
                    </h5>
                    <p className="text-textsecond font-route text-subtitle">
                      Posted {getRelativeTime(item?.createdAt)} by{" "}
                      <span className="underline cursor-pointer">
                        {item?.user?.username}
                      </span>
                    </p>
                  </div>
                  {item?.commentCount > 0 && (
                    <p className="text-textsecond font-route text-subtitle">
                      Last Comment {getRelativeTime(item?.latestCommentDate)}
                    </p>
                  )}
                  <p
                    onClick={() => {
                      handleTabTitle(item?.title);
                      navigate(`/post/${item?._id}`);
                    }}
                    className="underline cursor-pointer text-textsecond font-route text-subtitle"
                  >
                    {item?.commentsCount}{" "}
                    {item?.commentsCount > 1 ? "Comments" : "Comment"}
                  </p>
                </div>
              );
            })}
        </div>
        <Pagination pageNo={page} setpageNo={handlePageChange} total={total} />
      </div>
    </div>
  );
};

export default PostList;
