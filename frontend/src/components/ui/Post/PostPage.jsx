import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getRelativeTime, handleTabTitle } from "../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import AnimatedButton from "../Other/AnimatedButton";
import { GoDotFill } from "react-icons/go";
import CommentReplyBox from "./CommentReplyBox";
import CommentBox from "./CommentBox";
import { getPost } from "../../../store/slices/postSlice";
import LoginWarningBanner from "../Other/LoginWarningBanner";

const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showCommentBox, setShowCommentBox] = useState(null);
  const user = useSelector((state) => state.user.userData);
  const post = useSelector((state) => state.post.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return (
    <div className="min-h-screen mx-3 md:mx-0 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-[700px] mt-[100px]">
        {!user && (
          <LoginWarningBanner warning="Log in to comment on this post." />
        )}
        <div className="bg-bgsecondary mb-[30px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full flex justify-between px-5 bg-primary py-2 rounded-t-2xl">
            <h5 className="text-white font-route text-title font-bold">
              Discussion
            </h5>
            <NavLink to="/discuss" onClick={() => handleTabTitle("Discuss")}>
              <h5 className="text-white underline w-max flex gap-[2px] cursor-pointer items-center font-route text-title2 font-bold">
                Back
              </h5>
            </NavLink>
          </div>
          <div className="w-full flex flex-col gap-1 pb-3">
            <div className="flex flex-col mx-5 my-2 gap-2 pt-4 pb-4 px-6 border-2 border-bprimary rounded-2xl">
              <div className="flex flex-col px-1 gap-7">
                <div className="flex flex-col gap-3">
                  <h2 className="text-posttitle text-textcolor font-route">
                    {post?.title}
                  </h2>
                  <p className="font-route text-title3 mt-[-15px] tracking-w_ide text-textsecond">
                    Posted by{" "}
                    <span
                      className="text-textcolor underline cursor-pointer"
                      onClick={() =>
                        navigate(`/profile/${post?.author?.username}`)
                      }
                    >
                      {post?.author?.username}
                    </span>{" "}
                    {getRelativeTime(post?.createdAt)}
                  </p>
                </div>
                <p className="font-main text-content text-textcolor leading-7">
                  {post?.content}
                </p>
              </div>
              <div className="mt-16">
                {user ? (
                  <CommentReplyBox postId={post?._id} replyComment={false} />
                ) : (
                  <div className="my-10"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {post?.comments.length > 0 ? (
        <div className="flex flex-col gap-4 w-[700px]">
          <div className="bg-bgsecondary mb-[50px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
            <div className="w-full flex justify-between px-5 bg-primary py-2 rounded-t-2xl">
              <h5 className="text-white font-route tracking-wider text-title font-bold">
                {post?.commentsCount}{" "}
                {post?.commentsCount > 1 ? "Comments" : "Comment"}
              </h5>
            </div>
            <div className="w-full flex flex-col gap-1 pb-3">
              <div className="flex flex-col gap-4 pt-4 pb-4 px-6  rounded-2xl">
                {post?.comments?.length > 0 &&
                  post?.comments.map((comment, index) => (
                    <CommentBox
                      key={index}
                      index={index}
                      comment={comment}
                      postId={post?._id}
                      showCommentBox={showCommentBox}
                      setShowCommentBox={setShowCommentBox}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostPage;
