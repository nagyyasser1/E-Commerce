const shippingAddressController = require("../controllers/shippingAddressController");
const verifyJWT = require("../middlewares/verifyJWT");
const router = require("express").Router();

router.use(verifyJWT);
router.route("/").post(shippingAddressController.addShippingAddress);

module.exports = router;
