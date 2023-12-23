module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define("ProductSize", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  // Define associations
  ProductSize.associate = (models) => {
    // Product association
    ProductSize.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });

    // Size association
    ProductSize.belongsTo(models.Size, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return ProductSize;
};
