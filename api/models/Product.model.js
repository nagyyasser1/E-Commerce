const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category");
const Manufacturer = require("./Manufacturer");
const Review = require("./Review");
const Wishlist = require("./Wishlist");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
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
  imageUrl: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
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

Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.belongsTo(Manufacturer, { foreignKey: "manufacturerId" });
Product.hasMany(Review, { foreignKey: "productId" });
Product.belongsToMany(Wishlist, {
  through: "WishlistProducts",
  foreignKey: "productId",
});

module.exports = Product;
