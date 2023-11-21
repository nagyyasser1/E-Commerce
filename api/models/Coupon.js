module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define("Coupon", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discountPercentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usageLimit: {
      type: DataTypes.INTEGER,
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

  Coupon.associate = (models) => {
    // Associate Coupon with Order
    Coupon.hasMany(models.Order, { foreignKey: "couponId" });
  };

  return Coupon;
};