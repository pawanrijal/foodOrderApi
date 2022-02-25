module.exports = (sequelize, type) => {
  return sequelize.define("categories", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING(200),
      allowNull: false,
    },
    description: {
      type: type.STRING(500),
    },
  });
};
