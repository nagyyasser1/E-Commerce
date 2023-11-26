const isAdmin = require("../middlewares/isAdmin");
const couponsController = require("../controllers/couponsController");

const router = require("express").Router();

router.post("/", isAdmin, couponsController.addCoupon);
router.get("/", couponsController.getAllCoupons);

module.exports = router;
