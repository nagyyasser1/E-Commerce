const verifyJWT = require("../middlewares/verifyJWT");
const orderController = require("../controllers/orderController");
const router = require("express").Router();
const isAdmin = require("../middlewares/isAdmin");

// only our registerd users can place orders
router.post("/", verifyJWT, orderController.addOrder);

// user or admin can get thier orders
router.get("/myorders", verifyJWT, orderController.getMyOrders);
router.get("/", isAdmin, orderController.getAllOrders);

// only admin  update order status
router.put("/", isAdmin, orderController.updateOrderStatus);

// user or admin can delete user's order
// router.delete("/", verifyJWT, orderController.deleteOrder);

router.put("/cancel/:orderId", verifyJWT, orderController.cancelOrder);

module.exports = router;
