const manufacturerController = require("../controllers/manufacturerController");
const isAdmin = require("../middlewares/isAdmin");

const router = require("express").Router();

router.use(isAdmin);
router
  .route("/")
  .post(manufacturerController.addManufacturer)
  .get(manufacturerController.getManufacturer)
  .delete(manufacturerController.deleteManufacturer);

module.exports = router;
