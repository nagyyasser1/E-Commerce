module.exports = (sequelize, DataTypes) => {
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

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "userId" });
    Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
    Order.hasOne(models.Payment, { foreignKey: "orderId" });
    Order.hasOne(models.Transaction, { foreignKey: "orderId" });
  };

  return Order;
};
