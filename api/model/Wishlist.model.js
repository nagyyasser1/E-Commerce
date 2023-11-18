const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Product = require("./Product");

const Wishlist = sequelize.define("Wishlist", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  dateAdded: {
    type: DataTypes.DATE,
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

Wishlist.belongsTo(User, { foreignKey: "userId" });
Wishlist.belongsToMany(Product, {
  through: "WishlistProducts",
  foreignKey: "wishlistId",
});

module.exports = Wishlist;
