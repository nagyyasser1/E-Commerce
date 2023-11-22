const verifyJWT = require("../middlewares/verifyJWT");
const orderController = require("../controllers/orderController");
const router = require("express").Router();

router.use(verifyJWT);
router.post("/", orderController.addOrder);

module.exports = router;
