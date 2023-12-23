module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define("Size", {
    sizeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  // Define associations
  Size.associate = (models) => {
    // ProductSize association
    Size.belongsToMany(models.Product, {
      through: models.ProductSize,
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Size;
};
