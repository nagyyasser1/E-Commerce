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
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOpt = require("./config/swaggerOpt");

const PORT = process.env.PORT || 3500;

// Setup express middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Api routes
app.use("/", express.static(path.join(__dirname, "uploads"))); // Serve statatic files
app.use("/", require("./routes/route")); // Api welcome page
app.use("/auth", require("./routes/authRoutes")); // Handle authentication
app.use("/contact", require("./routes/contactRoutes")); // Mangage Messages via Email
app.use("/api", require("./routes/apiRoutes")); // E-commerce endpoints

// Swagger documentaion
const specs = swaggerJsDoc(swaggerOpt);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Handle errors
app.all("*", notFound);
app.use(errorHandler);

// Init db & Run the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`);
  });
});
