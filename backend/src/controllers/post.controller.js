import { Post } from "../models/post.model.js";
import mongoose from "mongoose";
import { asyncHandler, ErrorHandler, Response } from "../utils/handlers.js";

export const createPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new ErrorHandler(400, "Title and content cannot be empty");
  }

  const post = await Post.create({
    title,
    content,
    author: req.user._id,
  });

  if (!post) {
    throw new ErrorHandler(500, "Failed to create post");
  }

  return res
    .status(201)
    .json(new Response(201, post, "Post created successfully"));
});

export const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler(400, "Invalid Post ID");
  }

  const post = await Post.findById(id)
    .populate({
      path: "author",
      select: "username name email profilePic",  
    })
    .populate({
      path: "comments",
      populate: [
        {
          path: "author",
          select: "username name email profilePic",
        },
        {
          path: "replies",
          populate: {
            path: "author",
            select: "username name email profilePic",
          },
        },
      ],
    });

  if (!post) {
    throw new ErrorHandler(404, "Post not found");
  }

  return res
    .status(200)
    .json(new Response(200, post, "Post fetched successfully"));
});

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortOrder = req.query.sort === "old" ? 1 : -1; // Default: newest

  const posts = await Post.aggregate([
    // Sort by createdAt (newest/oldest)
    { $sort: { createdAt: sortOrder } },

    // Pagination
    { $skip: (page - 1) * limit },
    { $limit: limit },

    // Lookup post author
    {
      $lookup: {
        from: "users",
        let: { authorId: "$author" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$authorId"] } } },
          {
            $project: {
              _id: 1,
              name: 1,
              email: 1,
              username: 1,
              profilePic: 1,
            },
          },
        ],
        as: "author",
      },
    },
    { $unwind: "$author" },

    // Lookup comments to get count and latest comment date
    {
      $lookup: {
        from: "comments",
        let: { postId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$post", "$$postId"] } } },
          {
            $project: {
              createdAt: 1,
              replies: 1,
            },
          },
        ],
        as: "allComments",
      },
    },

    // Add commentCount and latestCommentDate
    {
      $addFields: {
        commentCount: {
          $sum: [
            { $size: "$allComments" },
            {
              $sum: {
                $map: {
                  input: "$allComments",
                  as: "c",
                  in: { $size: { $ifNull: ["$$c.replies", []] } },
                },
              },
            },
          ],
        },
        latestCommentDate: {
          $max: {
            $concatArrays: [
              {
                $map: {
                  input: "$allComments",
                  as: "c",
                  in: "$$c.createdAt",
                },
              },
              {
                $reduce: {
                  input: "$allComments",
                  initialValue: [],
                  in: {
                    $concatArrays: [
                      "$$value",
                      {
                        $map: {
                          input: {
                            $ifNull: ["$$this.replies", []],
                          },
                          as: "r",
                          in: "$$r.createdAt",
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    },

    // Optionally remove the raw comments array
    {
      $project: {
        allComments: 0,
        comments: 0,
      },
    },
  ]);

  if (!posts) {
    throw new ErrorHandler(404, "No posts found");
  }

  return res
    .status(200)
    .json(new Response(200, posts, "Posts fetched successfully"));
});



