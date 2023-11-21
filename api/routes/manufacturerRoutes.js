const manufacturerController = require("../controllers/manufacturerController");
const isAdmin = require("../middlewares/isAdmin");

const router = require("express").Router();

router.use(isAdmin);
router.route("/").post(manufacturerController.addManufacturer);

module.exports = router;
