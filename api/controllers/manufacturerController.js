const db = require("../models");
const STATUS_CODES = require("../utils/STATUS_CODES");
const asyncHandler = require("express-async-handler");

const addManufacturer = asyncHandler(async (req, res) => {
  const { manufacturerName, description } = req.body;

  if (!manufacturerName || !description) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "All fields required!" });
  }

  try {
    // Check if the manufacturer already exists
    const existingManufacturer = await db.Manufacturer.findOne({
      where: {
        manufacturerName,
      },
    });

    if (existingManufacturer) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Manufacturer already exists!" });
    }

    // Create a new manufacturer
    const newManufacturer = await db.Manufacturer.create({
      manufacturerName,
      description,
    });

    return res.status(STATUS_CODES.CREATED).json({
      message: "Manufacturer added successfully",
      manufacturer: newManufacturer,
    });
  } catch (error) {
    console.error("Error adding manufacturer:", error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

module.exports = {
  addManufacturer,
};
