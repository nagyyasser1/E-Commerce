const router = require("express").Router();
const isAdmin = require("../middlewares/isAdmin");
const productsController = require("../controllers/productsController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const ext = originalname.substring(originalname.lastIndexOf("."));
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// router.use(isAdmin);
router.post("/", upload.single("avatar"), productsController.addProduct);
router.get("/", productsController.getAllProducts);

module.exports = router;
