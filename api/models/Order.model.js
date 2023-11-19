const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const OrderItem = require("./OrderItem");
const Payment = require("./Payment");
const Transaction = require("./Transaction");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  orderStatus: {
    type: DataTypes.STRING,
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

Order.belongsTo(User, { foreignKey: "userId" });
Order.hasMany(OrderItem, { foreignKey: "orderId" });
Order.hasOne(Payment, { foreignKey: "orderId" });
Order.hasOne(Transaction, { foreignKey: "orderId" });

module.exports = Order;
