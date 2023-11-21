module.exports = (sequelize, DataTypes) => {
  const Manufacturer = sequelize.define("Manufacturer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    manufacturerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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

  Manufacturer.associate = (models) => {
    // Associate Manufacturer with Product
    Manufacturer.hasMany(models.Product, { foreignKey: "manufacturerId" });
  };

  return Manufacturer;
};
