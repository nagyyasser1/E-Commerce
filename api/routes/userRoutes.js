/**
 * @swagger
 * tags:
 *    name: Users
 *    description: the users managing api
 * paths:
 *   /api/users:
 *     get:
 *       tags: [Users]
 *       description: Get all users
 *       responses:
 *         200:
 *           description: Successful response
 *
 *     post:
 *       tags: [Users]
 *       description: Get all users
 *       responses:
 *         200:
 *           description: Successful response
 *   /api/users/{userId}:
 *     get:
 *       tags: [Users]
 *       description: Get user by id
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: user id
 *       responses:
 *         200:
 *           description: the user description by id
 *           contents:
 *             application/json:
 *               schemas:
 *                 $ref: '#/components/schemas/User'
 *
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the user
 *           readOnly: true
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *           uniqueItems: true
 *         password:
 *           type: string
 *           description: The user's password
 *           minLength: 8
 *           writeOnly: true
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         address:
 *           type: string
 *           description: The user's address
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user is an admin
 *           default: false
 *         verified:
 *           type: boolean
 *           description: Whether the user's email has been verified
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was created
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was last updated
 *           readOnly: true
 *
 */

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middlewares/verifyJWT");
const isAdmin = require("../middlewares/isAdmin");

router.post("/", usersController.createNewUser);
router.get("/", isAdmin, usersController.getAllUsers);
router.get("/:userId", verifyJWT, usersController.getUserById);
router.post("/send-verification-token", usersController.sendEmailVerification);
router.get("/verify-email/:token", usersController.verifyEmail);

router.use(isAdmin);
router
  .route("/")
  .patch(usersController.makeUserAdmin)
  .delete(usersController.deleteUser);

module.exports = router;
