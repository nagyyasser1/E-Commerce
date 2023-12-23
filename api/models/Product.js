module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

  // Define associations
  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    Product.belongsTo(models.Manufacturer, { foreignKey: "manufacturerId" });
    Product.hasMany(models.Review, { foreignKey: "productId" });
    Product.belongsToMany(models.Wishlist, {
      through: "WishlistProducts",
      foreignKey: "productId",
    });
    Product.hasMany(models.ProductImage, {
      foreignKey: "productId",
      onDelete: "CASCADE",
    });

    Product.belongsToMany(models.Size, {
      through: models.ProductSize,
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Product;
};
