require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const { logger, logEvents } = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 3500;

// setup express middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// server statatic files
app.use("/", express.static(path.join(__dirname, "uploads")));

// server routes
app.get("/addproduct", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "views", "addProduct.html"));
});
app.use("/", require("./routes/route"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/manufacturer", require("./routes/manufacturerRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/coupon", require("./routes/couponRoutes"));
app.use("/api/shippingaddress", require("./routes/shippingAddressRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

// handle errors
app.all("*", notFound);
app.use(errorHandler);

// init db & run the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`);
  });
});
