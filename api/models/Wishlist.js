module.exports = (sequelize, DataTypes) => {
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

  Wishlist.associate = (models) => {
    // Associate Wishlist with User and Product
    Wishlist.belongsTo(models.User, { foreignKey: "userId" });
    Wishlist.belongsToMany(models.Product, {
      through: "WishlistProducts",
      foreignKey: "wishlistId",
    });
  };

  return Wishlist;
};
