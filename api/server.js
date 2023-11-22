require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const { logger, logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use("/", require("./routes/route"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/manufacturer", require("./routes/manufacturerRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/coupon", require("./routes/couponRoutes"));
app.use("/api/shippingaddress", require("./routes/shippingAddressRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

app.all("*", (req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "Page Not Found!" });
  } else {
    res.type("txt").send("404 Not Found!");
  }
});

app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`);
  });
});
