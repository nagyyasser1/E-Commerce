const STATUS_CODES = require("../utils/STATUS_CODES");

const filesPayloadExists = (req, res, next) => {
  if (!req.files)
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ status: "error", message: "missing files!" });
  next();
};

module.exports = filesPayloadExists;
