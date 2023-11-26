const categoryController = require("../controllers/categoryController");
const isAdmin = require("../middlewares/isAdmin");

const router = require("express").Router();

// router.use(isAdmin);
router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.addCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;
