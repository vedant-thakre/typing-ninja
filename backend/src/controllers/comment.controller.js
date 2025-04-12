import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js"
import { asyncHandler, ErrorHandler, Response } from "../utils/handlers.js";

export const addComment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ErrorHandler(400, "Comment content cannot be empty");
  }

  if (!id) {
    throw new ErrorHandler(400, "Post ID is required");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new ErrorHandler(404, "Post not found");
  }

  const comment = await Comment.create({
    content,
    author: req.user._id,
    post: id,
  });

  if (!comment) {
    throw new ErrorHandler(500, "Failed to add comment");
  }

  // Add the comment to the post's comments array
  post.comments.push(comment._id);
  await post.save();

  return res
    .status(201)
    .json(new Response(201, comment, "Comment added successfully"));
});

export const replyToComment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { content, postId } = req.body;

  if (!content) {
    throw new ErrorHandler(400, "Comment content cannot be empty");
  }

  if (!id) {
    throw new ErrorHandler(400, "Comment ID is required");
  }

  const parentComment = await Comment.findById(id);

  if (!parentComment) {
    throw new ErrorHandler(404, "Parent comment not found");
  }

  const comment = await Comment.create({
    content,
    author: req.user._id,
    post: postId,
    parentComment: id,
  });

  if (!comment) {
    throw new ErrorHandler(500, "Failed to add comment");
  }
  
  // Add the reply to the parent comment's replies array
  parentComment.replies.push(comment._id);
  await parentComment.save();

  return res
    .status(201)
    .json(new Response(201, comment, "Comment added successfully"));
});

export const editComment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        throw new ErrorHandler(400, "Comment content cannot be empty");
    }
    if (!id) {
        throw new ErrorHandler(400, "Comment ID is required");
    }

    const comment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
    );

    if (!comment) {
        throw new ErrorHandler(404, "Comment not found");
    }

    return res
        .status(200)
        .json(new Response(200, comment, "Comment updated successfully"));

});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new ErrorHandler(400, "Comment ID is required");
  }

  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    throw new ErrorHandler(404, "Comment not found");
  }

  return res
    .status(200)
    .json(new Response(200, null, "Comment deleted successfully"));
});



