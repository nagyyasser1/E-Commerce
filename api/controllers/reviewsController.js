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

module.exports = {
  addReview,
};
