const reviewsController = require("../controllers/reviewsController");
const verifyJWT = require("../middlewares/verifyJWT");
const router = require("express").Router();

router.use(verifyJWT);
router
  .route("/")
  .post(reviewsController.addReview)
  .put(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

module.exports = router;
