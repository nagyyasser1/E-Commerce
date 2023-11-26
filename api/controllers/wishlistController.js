const asyncHandler = require("express-async-handler");
const db = require("../models");
const STATUS_CODES = require("../utils/STATUS_CODES");

// Function to create a new wishlist and associate it with a user
const createWishlist = async (userId) => {
  const newWishlist = await db.Wishlist.create({
    userId,
    dateAdded: new Date(),
  });

  return newWishlist;
};

// Middleware to add a product to the wishlist
const addProductToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    // Validate that the product exists
    const existingProduct = await db.Product.findOne({
      where: {
        id: productId,
      },
    });

    // Check if the product ID provided is valid
    if (!existingProduct) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "The product does not exist",
      });
    }

    // Create a new wishlist for the user if they don't have one
    let wishlist = await db.Wishlist.findOne({
      where: { userId },
    });

    if (!wishlist) {
      wishlist = await createWishlist(userId);
    }

    // Associate the product with the wishlist
    await wishlist.addProduct(productId);

    res.status(STATUS_CODES.CREATED).json({
      message: "Product added to wishlist successfully",
      wishlist,
    });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
});

//
const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the wishlist associated with the user
    const wishlist = await db.Wishlist.findOne({
      where: { userId },
      include: [db.Product], // Include associated products in the query
    });

    if (!wishlist) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Wishlist not found for the user" });
    }

    res.status(STATUS_CODES.SUCCESS).json({
      message: "Wishlist retrieved successfully",
      wishlist,
    });
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

module.exports = {
  addProductToWishlist,
  getWishlist,
};
