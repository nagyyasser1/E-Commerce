const jwt = require("jsonwebtoken");
const STATUS_CODES = require("../utils/STATUS_CODES");

const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Forbidden" });

    if (decoded?.isAdmin === false) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: "Unauthorized!" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = isAdmin;
