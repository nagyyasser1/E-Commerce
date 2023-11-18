const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./Product");
const Order = require("./Order");

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

OrderItem.belongsTo(Product, { foreignKey: "productId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

module.exports = OrderItem;
