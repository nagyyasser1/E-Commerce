const db = require("../models");
const asyncHandler = require("express-async-handler");
const STATUS_CODES = require("../utils/STATUS_CODES");

// @desc Add New product
// @route /product
// @access Privit
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    stockQuantity,
    imageUrl,
    categoryId,
    manufacturerId,
  } = req.body;

  if (!name || !price || !stockQuantity || !categoryId || !manufacturerId) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message:
        "Name, price, stockQuantity, categoryId, and manufacturerId are required!",
    });
  }

  try {
    // Check if the specified category exists
    const category = await db.Category.findByPk(categoryId);
    if (!category) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Category not found" });
    }

    // Check if the specified manufacturer exists
    const manufacturer = await db.Manufacturer.findByPk(manufacturerId);
    if (!manufacturer) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Manufacturer not found" });
    }

    // Create a new product with associations
    const newProduct = await db.Product.create({
      name,
      description,
      price,
      stockQuantity,
      imageUrl,
      categoryId,
      manufacturerId,
    });

    return res
      .status(STATUS_CODES.CREATED)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding new product:", error);
    return res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

// @desc Get all products
// @route /product
// @access Privit
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    // Get all products and include associated fields (category and manufacturer)
    const products = await db.Product.findAll({
      include: [
        { model: db.Category, as: "Category" },
        { model: db.Manufacturer, as: "Manufacturer" },
        { model: db.Review, as: "Reviews" },
      ],
    });

    return res.status(STATUS_CODES.SUCCESS).json({ products });
  } catch (error) {
    console.error("Error getting all products:", error);
    return res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

module.exports = {
  addProduct,
  getAllProducts,
};
