module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define("ProductImage", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
      foreignKey: "productId",
      onDelete: "CASCADE",
    });
  };

  return ProductImage;
};
