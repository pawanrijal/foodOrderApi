module.exports = (sequelize, type) => {
  return sequelize.define(
    "products",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: type.STRING(100),
        unique: true,
        allowNull: false,
      },
      price: {
        type: type.STRING(200),
        allowNull: false,
      },
      image: {
        type: type.STRING(200),
      },
      status: {
        type: type.BOOLEAN,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
