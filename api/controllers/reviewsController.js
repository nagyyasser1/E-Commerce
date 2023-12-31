const db = require("../models");
const asyncHandler = require("express-async-handler");
const STATUS_CODES = require("../utils/STATUS_CODES");

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment, date, productId } = req.body;

  if (!rating || !date || !productId) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Rating, date, userId, and productId are required!" });
  }

  try {
    // Check if the product exists
    const existingProduct = await db.Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Product does not exist!" });
    }

    // Create a new review
    const newReview = await db.Review.create({
      rating,
      comment,
      date,
      userId: req.user.id,
      productId,
    });

    return res
      .status(STATUS_CODES.CREATED)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding new review:", error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;
  const reviewId = req.body.reviewId;

  if (!reviewId) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "All fields required." });
  }

  try {
    const review = await db.Review.findByPk(reviewId);

    if (!review) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Review not found." });
    }

    // Check if the user is the owner of the review or is an admin
    if (userId === review.userId || isAdmin) {
      // If yes, delete the review
      await review.destroy();
      return res
        .status(STATUS_CODES.OK)
        .json({ message: "Review deleted successfully." });
    } else {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Unauthorized to delete this review." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

const updateReview = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { reviewId, rating, comment } = req.body;

  if (!reviewId || !rating || !comment) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "updated data are required." });
  }

  try {
    const review = await db.Review.findByPk(reviewId);

    if (!review) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Review not found." });
    }

    // Check if the user is the owner of the review
    if (userId === review.userId) {
      // If yes, update the review with the data
      review.set({
        rating: rating || review.rating,
        comment: comment || review.comment,
      });
      await review.save();
      return res
        .status(STATUS_CODES.OK)
        .json({ message: "Review updated successfully." });
    } else {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Unauthorized to update this review." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

module.exports = {
  addReview,
  deleteReview,
  updateReview,
};
