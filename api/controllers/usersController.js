const db = require("../models");
const asyncHandler = require("express-async-handler");
const STATUS_CODES = require("../utils/STATUS_CODES");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from DB
  const users = await db.User.findAll({
    attributes: {
      exclude: ["password"], // Excludes the 'password' field from the retrieved data
    },
  });

  // If no users
  if (!users?.length) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "No users found" });
  }

  res.json(users);
});

// @desc Get user by id
// @route GET /users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await db.User.findOne({
    where: {
      id: userId,
    },
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: db.ShippingAddress,
        as: "ShippingAddresses", // Use the alias defined in the ShippingAddress association
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude unnecessary fields
      },
      {
        model: db.Review,
        as: "Reviews", // Use the alias defined in the ShippingAddress association
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude unnecessary fields
      },
    ],
  });

  // If no user
  if (!user) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "No user found" });
  }

  if (req.user.isAdmin) {
    return res.status(STATUS_CODES.SUCCESS).send(user);
  }

  // check for Identity
  if (user.dataValues.id !== req.user.id) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: "Unauthorized!" });
  }

  res.json(user);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, email, firstName, lastName, address, phone, password } =
    req.body;

  // Confirm data
  if (
    !username ||
    !password ||
    !email ||
    !phone ||
    !firstName ||
    !lastName ||
    !address
  ) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await db.User.findOne({
    where: {
      email: email,
    },
  });

  if (duplicate) {
    return res
      .status(STATUS_CODES.CONFLICT)
      .json({ message: "Duplicate username" });
  }

  const newUser = db.User.build({
    username,
    email,
    firstName,
    lastName,
    address,
    phone,
    password,
  });

  // Create and store new user
  await newUser.save();

  if (newUser) {
    //created
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: `New user ${username} created`, user: newUser });
  } else {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Invalid user data received" });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  //   const { id, username, roles, active, password } = req.body;
  // Confirm data
  //   if (
  //     !id ||
  //     !username ||
  //     !Array.isArray(roles) ||
  //     !roles.length ||
  //     typeof active !== "boolean"
  //   ) {
  //     return res
  //       .status(400)
  //       .json({ message: "All fields except password are required" });
  //   }
  // Does the user exist to update?
  //   const user = await User.findById(id).exec();
  //   if (!user) {
  //     return res.status(400).json({ message: "User not found" });
  //   }
  // Check for duplicate
  //   const duplicate = await User.findOne({ username }).lean().exec();
  // Allow updates to the original user
  //   if (duplicate && duplicate?._id.toString() !== id) {
  //     return res.status(409).json({ message: "Duplicate username" });
  //   }
  //   user.username = username;
  //   user.roles = roles;
  //   user.active = active;
  //   if (password) {
  // Hash password
  //     user.password = await bcrypt.hash(password, 10); // salt rounds
  //   }
  //   const updatedUser = await user.save();
  //   res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  //   const { id } = req.body;
  // Confirm data
  //   if (!id) {
  //     return res
  //       .status(STATUS_CODES.BAD_REQUEST)
  //       .json({ message: "User ID Required" });
  //   }
  // Does the user still have assigned notes?
  //   const note = await Note.findOne({ user: id }).lean().exec();
  //   if (note) {
  //     return res
  //       .status(STATUS_CODES.BAD_REQUEST)
  //       .json({ message: "User has assigned notes" });
  //   }
  // Does the user exist to delete?
  //   const user = await User.findById(id).exec();
  //   if (!user) {
  //     return res
  //       .status(STATUS_CODES.BAD_REQUEST)
  //       .json({ message: "User not found" });
  //   }
  //   const result = await user.deleteOne();
  //   const reply = `Username ${result.username} with ID ${result._id} deleted`;
  //   res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserById,
};
