const verifyJWT = require("../middlewares/verifyJWT");
const wishlistController = require("../controllers/wishlistController");
const router = require("express").Router();

router.use(verifyJWT);
router.post("/", wishlistController.addProductToWishlist);
router.get("/", wishlistController.getWishlist);
router.delete("/", wishlistController.deleteProductFromWishlist);

module.exports = router;
