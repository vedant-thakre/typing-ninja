import { Snippet } from "../models/snippet.model.js";
import { asyncHandler, ErrorHandler, Response } from "../utils/handlers.js";
import { validateAddSnippet } from "../utils/validation.js";

export const addSnippet = asyncHandler(async (req, res, next) => {
  const { title, content, difficulty } = req.body;

  const { error } = validateAddSnippet(req.body);

  if (error) {
    throw new ErrorHandler(400, error.details[0].message);
  }

  if (!req.user?.isVerified) {
    throw new ErrorHandler(400, "User is not verified");
  }

  const isAdmin = req?.user?.isAdmin;

  const snippet = await Snippet.findOne({ title });

  if (snippet) {
    throw new ErrorHandler(400, "Snippet with this title already exists");
  }

  const newSnippet = await Snippet.create({
    title,
    content,
    difficulty,
    status: isAdmin ? "approved" : "pending",
    author: req.user.username,
  });

  if (!newSnippet) {
    throw new ErrorHandler(500, "Failed to add snippet");
  }

  return res
    .status(200)
    .json(
      new Response(
        200,
        newSnippet,
        req?.user?.isAdmin
          ? "Snippet added successfully"
          : "Snippet requested successfully",
      ),
    );
});

export const approveSnippet = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new ErrorHandler(400, "Snippet ID is required");
  }
  if (!req.user?.isVerified) {
    throw new ErrorHandler(400, "User is not verified");
  }

  const updatedSnippet = await Snippet.findByIdAndUpdate(
    id,
    { status: "approved" },
    { new: true },
  );

  if (!updatedSnippet) {
    throw new ErrorHandler(500, "Failed to approve snippet");
  }

  return res
    .status(200)
    .json(new Response(200, updatedSnippet, "Snippet approved successfully"));
});

export const rejectSnippet = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new ErrorHandler(400, "Snippet ID is required");
  }

  if (!req.user?.isVerified) {
    throw new ErrorHandler(400, "User is not verified");
  }

  const updatedSnippet = await Snippet.findByIdAndDelete(id);

  if (!updatedSnippet) {
    throw new ErrorHandler(500, "Failed to approve snippet");
  }

  return res
    .status(200)
    .json(new Response(200, null, "Snippet deleted successfully"));
});

export const pendingSnippets = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;

  const snippets = await Snippet.find({ status: "pending" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  if (!snippets) {
    throw new ErrorHandler(500, "Failed to fetch snippets");
  }

  return res
    .status(200)
    .json(new Response(200, snippets, "Snippets fetched successfully"));
});

export const editSnippet = asyncHandler(async (req, res, next) => {
  const { title, content, difficulty } = req.body;

  const { id } = req.params;

  const { error } = validateAddSnippet(req.body);

  if (error) {
    throw new ErrorHandler(400, error?.details[0]?.message);
  }

  if (!req.user?.isVerified) {
    throw new ErrorHandler(400, "User is not verified");
  }

  const newSnippet = await Snippet.findByIdAndUpdate(
    id,
    {
      title,
      content,
      difficulty,
      status: "approved",
      author: "leoved",
    },
    {
      new: true,
    },
  );

  if (!newSnippet) {
    throw new ErrorHandler(500, "Failed to update snippet");
  }

  return res
    .status(200)
    .json(new Response(200, newSnippet, "Snippet updated successfully"));
});

export const getAllPendingSnippet = asyncHandler(async (req, res, next) => {
  const { title, content, difficulty } = req.body;

  if (!content || !title) {
    throw new ErrorHandler(400, "Snippet title and content cannot be empty");
  }
  if (!req.user?.isVerified) {
    throw new ErrorHandler(400, "User is not verified");
  }

  const newSnippet = await Snippet.create({
    title,
    content,
    difficulty,
    status: "approved",
    author: "leoved",
  });

  if (!newSnippet) {
    throw new ErrorHandler(500, "Failed to add snippet");
  }

  return res
    .status(200)
    .json(new Response(200, newSnippet, "Snippet added successfully"));
});
