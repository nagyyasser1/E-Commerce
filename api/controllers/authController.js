const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const STATUS_CODES = require("../utils/STATUS_CODES");

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  // Check for existence email
  const foundUser = await db.User.findOne({
    where: {
      email: email,
    },
  });

  if (!foundUser) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: "user not found!" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Email or Password not correct!" });

  const accessToken = jwt.sign(
    {
      username: foundUser.username,
      email: foundUser.email,
      id: foundUser.id,
      isAdmin: foundUser.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
      email: foundUser.email,
      id: foundUser.id,
      isAdmin: foundUser.isAdmin,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "20d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username , email , id
  res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err)
        return res
          .status(STATUS_CODES.FORBIDDEN)
          .json({ message: "Forbidden" });

      const foundUser = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (!foundUser)
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          username: foundUser.username,
          email: foundUser.email,
          id: foundUser.id,
          isAdmin: foundUser.isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ accessToken });
    })
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(STATUS_CODES.NO_CONTENT); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
