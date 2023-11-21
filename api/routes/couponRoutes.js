const isAdmin = require("../middlewares/isAdmin");
const couponsController = require("../controllers/couponsController");

const router = require("express").Router();

router.use(isAdmin);
router
  .route("/")
  .post(couponsController.addCoupon)
  .get(couponsController.getAllCoupons);

module.exports = router;
