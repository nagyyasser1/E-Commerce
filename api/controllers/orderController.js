const asyncHandler = require("express-async-handler");
const db = require("../models");
const STATUS_CODES = require("../utils/STATUS_CODES");

const checkOrderRequirements = async (products) => {
  if (!products || products.length === 0) {
    throw new Error("At least one product is required!");
  }

  // Check if all products exist and have sufficient stock
  const productsWithStock = await Promise.all(
    products.map(async (product) => {
      const { productId, quantity } = product;

      // Use findOne to check if the product exists and has sufficient stock
      const existingProduct = await db.Product.findOne({
        where: {
          id: productId,
          stockQuantity: {
            [db.Sequelize.Op.gte]: quantity,
          },
        },
      });

      if (!existingProduct) {
        throw new Error(
          `Product with ID ${productId} does not exist or has insufficient stock!`
        );
      }

      return {
        productId: existingProduct.id,
        quantity,
      };
    })
  );

  return productsWithStock;
};

const createOrderItems = async (order, productsWithStock, transaction) => {
  for (const [index, product] of productsWithStock.entries()) {
    const { productId, quantity } = productsWithStock[index];

    // Get the product price
    const productPrice = product.price;

    // Calculate the subtotal
    const subtotal = productPrice * quantity;

    // Create order item
    await db.OrderItem.create(
      {
        orderId: order.id,
        productId,
        quantity,
        price: productPrice,
        subtotal, // Include the calculated subtotal
      },
      { transaction }
    );
  }
};

const decrementProductStock = async (productId, quantity, transaction) => {
  // Decrement the stockQuantity of the product
  await db.Product.decrement("stockQuantity", {
    by: quantity,
    where: { id: productId },
    transaction,
  });
};

const addOrder = asyncHandler(async (req, res) => {
  const { orderDate, totalAmount, products } = req.body;
  const userId = req.user.id;

  try {
    // Use the build method to create a new order instance without saving it to the database
    const newOrder = await db.Order.build({
      orderDate,
      totalAmount,
      userId,
    });

    // Check order requirements
    const productsWithStock = await checkOrderRequirements(products);

    // Create order items and save the order
    await db.sequelize.transaction(async (t) => {
      // Save the order to the database
      await newOrder.save({ transaction: t });

      // Create order items
      await createOrderItems(newOrder, productsWithStock, t);

      // Decrement product stock
      for (const [index, product] of productsWithStock.entries()) {
        const { productId, quantity } = productsWithStock[index];
        await decrementProductStock(productId, quantity, t);
      }
    });

    return res.status(STATUS_CODES.CREATED).json({
      message: "Order added successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error adding new order:", error);

    // Send detailed error message to the client
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      message: "Internal Server Error",
      error: error.message, // Include the detailed error message
    });
  }
});

module.exports = {
  addOrder,
};

module.exports = {
  addOrder,
};
