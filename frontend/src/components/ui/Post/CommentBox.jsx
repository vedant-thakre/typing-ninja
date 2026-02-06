import React, { use } from "react";
import { getRelativeTime } from "../../../utils/helper";
import CommentReplyBox from "./CommentReplyBox";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CommentBox = ({
  comment,
  showCommentBox,
  setShowCommentBox,
  postId,
  depth = 0,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  return (
    <div className={`pl-[${depth * 20}px]`}>
      <div className="flex border-t-[2px] border-bprimary pt-4 pb-1 gap-5">
        <div className="w-[60px] h-[60px] rounded-full border-[2px] border-bprimary flex-shrink-0"></div>

        <div className="flex flex-col w-full gap-1">
          <p
            onClick={() => navigate(`/profile/${comment?.author?.username}`)}
            className="font-route text-title2 font-bold tracking-wider text-textcolor underline cursor-pointer"
          >
            {comment?.author?.username}
          </p>

          <p className="font-route text-content tracking-wider leading-6 text-textcolor break-words">
            {comment?.content}
          </p>

          <div className="flex gap-5">
            {depth <= 4 && user && (
              <p
                onClick={() =>
                  setShowCommentBox(
                    showCommentBox === comment._id ? null : comment._id,
                  )
                }
                className="font-route flex gap-2 text-textcolor font-bold tracking-wide underline cursor-pointer items-center text-[17px]"
              >
                REPLY
              </p>
            )}
            <p className="font-route flex gap-2 text-textsecond tracking-wide items-center text-title3">
              <GoDotFill size={12} className="mb-1" />
              {getRelativeTime(comment?.createdAt)}
            </p>
          </div>

          {showCommentBox === comment._id && (
            <CommentReplyBox
              setShowCommentBox={setShowCommentBox}
              parentComment={comment}
              replyComment={true}
              postId={postId}
            />
          )}
        </div>
      </div>

      {/* Render nested replies recursively */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8">
          {comment.replies.map((reply, index) => (
            <CommentBox
              key={reply._id}
              comment={reply}
              postId={postId}
              showCommentBox={showCommentBox}
              setShowCommentBox={setShowCommentBox}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
