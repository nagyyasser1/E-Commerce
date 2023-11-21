const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middlewares/verifyJWT");
const isAdmin = require("../middlewares/isAdmin");

router.post("/", usersController.createNewUser);
router.get("/", isAdmin, usersController.getAllUsers);
router.get("/:userId", verifyJWT, usersController.getUserById);

router.use(verifyJWT);
router
  .route("/")
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
