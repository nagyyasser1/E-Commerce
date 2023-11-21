const router = require("express").Router();
const isAdmin = require("../middlewares/isAdmin");
const productsController = require("../controllers/productsController");

router.use(isAdmin);

router
  .route("/")
  .post(productsController.addProduct)
  .get(productsController.getAllProducts);

module.exports = router;
