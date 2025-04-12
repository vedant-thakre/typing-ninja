import React, { useState } from 'react'
import AnimatedButton from '../AnimatedButton';

const CommentReplyBox = ({setShowCommentBox}) => {
    const [comment, setComment] = useState("")
  return (
    <div className='flex flex-col gap-4 '>
      <div className="p-1">
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          className="border-2 border-bprimary w-full rounded-md scrollbar-custom font-main text-sm outline-none focus:ring-0 py-2 px-2 bg-dark text-white flex items-center"
        ></textarea>
      </div>
      <div className="flex w-full px-1 mt-2 gap-3 justify-between">
        <AnimatedButton
          title={"COMMENT"}
          className="px-4 font-bold flex-1 rounded-lg py-[2px] border-bdshadow font-route text-lg border-4"
        />
        <AnimatedButton
          title={"CANCEL"}
          onClick={() => setShowCommentBox(null)}
          className="bg-transparent flex-1 border-bprimary border-[3px] px-4 font-bold rounded-lg py-[2px] font-route text-lg"
        />
      </div>
    </div>
  );
}

export default CommentReplyBox
