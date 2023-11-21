const categoryController = require("../controllers/categoryController");
const isAdmin = require("../middlewares/isAdmin");

const router = require("express").Router();

router.use(isAdmin);
router.route("/").post(categoryController.addCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;
