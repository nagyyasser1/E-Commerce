const verifyJWT = require("../middlewares/verifyJWT");
const orderController = require("../controllers/orderController");
const router = require("express").Router();
const isAdmin = require("../middlewares/isAdmin");

router.post("/", verifyJWT, orderController.addOrder);
router.get("/myorders", verifyJWT, orderController.getMyOrders);
router.get("/", isAdmin, orderController.getAllOrders);
router.put("/", isAdmin, orderController.updateOrderStatus);
router.put("/cancel/:orderId", verifyJWT, orderController.cancelOrder);
router.delete("/", verifyJWT, orderController.deleteOrder);

module.exports = router;
