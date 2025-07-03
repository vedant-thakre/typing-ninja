import React, { useEffect, useState } from "react";
import AnimatedButton from "../Other/AnimatedButton";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { errorToast } from "../../../utils/helper";
import {
  postComment,
  replyPostComment,
} from "../../../store/slices/commentSlice";

const CommentReplyBox = ({
  setShowCommentBox,
  replyComment,
  parentComment,
  postId,
}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const loading = useSelector((state) => state.comment.loading);

  const handleSubmit = () => {
    if (comment.trim() === "") {
      toast("Comment cannot be empty", errorToast);
      return;
    }
    if (replyComment) {
      async function handleReplyComment() {
        try {
          const res = await dispatch(
            replyPostComment({
              comment,
              postId: postId,
              commentId: parentComment._id,
            })
          );
          if (res?.payload?.status === 200) {
            setComment("");
            setShowCommentBox(null);
          }
        } catch (error) {
          console.log(error);
          toast(error.response.data.message, errorToast);
        }
      }
      handleReplyComment();
    } else {
      async function addComment() {
        try {
          const res = await dispatch(postComment({ comment, id: postId }));
          if (res?.payload?.status === 200) {
            setComment("");
          }
        } catch (error) {
          toast(error.response.data.message, errorToast);
        }
      }
      addComment();
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="p-1">
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          className="border-2 border-bprimary w-full rounded-md scrollbar-custom font-main text-sm outline-none focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor flex items-center"
        ></textarea>
      </div>
      <div className="flex w-full px-1 mt-2 gap-3 justify-between">
        <AnimatedButton
          title={"COMMENT"}
          disabled={loading ? true : false}
          onClick={() => handleSubmit()}
          className="px-4 font-bold flex-1 rounded-lg py-[2px] text-white border-bdshadow font-route text-lg border-4"
        />
        <AnimatedButton
          title={"CANCEL"}
          onClick={() => setShowCommentBox(null)}
          className="bg-transparent flex-1 border-bprimary border-[3px] text-textcolor  px-4 font-bold rounded-lg py-[2px] font-route text-lg"
        />
      </div>
    </div>
  );
};

export default CommentReplyBox;
