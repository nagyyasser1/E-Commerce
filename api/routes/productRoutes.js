/**
 * @swagger
 * tags:
 *    name: Products
 *    description: the products managing api
 * /api/product:
 *   get:
 *     tags: [Products]
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Successful response
 */

const router = require("express").Router();
const isAdmin = require("../middlewares/isAdmin");
const productsController = require("../controllers/productsController");
const fileUpload = require("express-fileupload");
const filePayloadExists = require("../middlewares/filesPayloadExists");
const fileSizeLimiter = require("../middlewares/fileSizeLimiter");
const fileExtLimiter = require("../middlewares/fileExtLimiter");

router.get("/", productsController.getAllProducts);
router.get("/featured", productsController.getAllFeaturedProducts);
router.get("/:productId", productsController.getProductById);

router.post(
  "/",
  isAdmin,
  fileUpload({ createParentPath: true }),
  filePayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  productsController.addProduct,
  productsController.saveFiles
);

router.put("/:productId", isAdmin, productsController.updateProduct);
router.delete("/:productId", isAdmin, productsController.deleteProduct);
module.exports = router;
