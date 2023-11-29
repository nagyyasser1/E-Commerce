const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce",
      version: "1.0.0",
      description: "API to manage your products / orders / auth / contacts.",
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerOptions;
