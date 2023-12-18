const router = require("express").Router();

router.use("/users", require("./userRoutes"));
router.use("/products", require("./productRoutes"));
router.use("/orders", require("./orderRoutes"));
router.use("/review", require("./reviewRoutes"));
router.use("/category", require("./categoryRoutes"));
router.use("/wishlist", require("./wishlistRoutes"));
router.use("/cart", require("./cartRoutes"));
router.use("/shippingaddress", require("./shippingAddressRoutes"));
router.use("/manufacturer", require("./manufacturerRoutes"));

module.exports = router;
