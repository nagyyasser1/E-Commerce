const STATUS_CODES = require("../utils/STATUS_CODES");
const db = require("../models");
const asyncHandler = require("express-async-handler");

// @desc add new coupon
// @route /coupon
// @access Privit
const addCoupon = asyncHandler(async (req, res) => {
  const { code, discountPercentage, expiryDate, usageLimit } = req.body;

  if (!code || !discountPercentage || !expiryDate || !usageLimit) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message:
        "Code, discountPercentage, expiryDate, and usageLimit are required!",
    });
  }

  try {
    // Check if the coupon with the same code already exists
    const existingCoupon = await db.Coupon.findOne({
      where: {
        code,
      },
    });

    if (existingCoupon) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Coupon with the same code already exists!" });
    }

    // Create a new coupon
    const newCoupon = await db.Coupon.create({
      code,
      discountPercentage,
      expiryDate,
      usageLimit,
    });

    return res
      .status(STATUS_CODES.CREATED)
      .json({ message: "Coupon added successfully", coupon: newCoupon });
  } catch (error) {
    console.error("Error adding new coupon:", error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

// @desc all coupons
// @route /coupon
// @access Public
const getAllCoupons = asyncHandler(async (req, res) => {
  // Get all coupons
  const coupons = await db.Coupon.findAll();

  return res.status(STATUS_CODES.SUCCESS).json({ coupons });
});

module.exports = {
  addCoupon,
  getAllCoupons,
};
