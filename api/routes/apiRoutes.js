const router = require("express").Router();

router.use("/users", require("./userRoutes"));
router.use("/products", require("./productRoutes"));
router.use("/orders", require("./orderRoutes"));
router.use("/category", require("./categoryRoutes"));
router.use("/manufacturer", require("./manufacturerRoutes"));
router.use("/shippingaddress", require("./shippingAddressRoutes"));
router.use("/review", require("./reviewRoutes"));
router.use("/wishlist", require("./wishlistRoutes"));

module.exports = router;
