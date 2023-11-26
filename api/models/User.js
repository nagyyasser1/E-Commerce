const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
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

  // Hash the user's password before saving to the database
  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  User.associate = (models) => {
    // Associate User with Order, Review, Wishlist, and ShippingAddress
    User.hasMany(models.Order, { foreignKey: "userId", onDelete: "CASCADE" });
    User.hasMany(models.Review, { foreignKey: "userId", onDelete: "CASCADE" });
    User.hasMany(models.Wishlist, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    User.hasMany(models.ShippingAddress, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return User;
};
