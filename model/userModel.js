module.exports = (sequelize, type) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: type.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: type.STRING(200),
        allowNull: false,
      },
      profile_pic: {
        type: type.STRING(200),
      },
      email: {
        type: type.STRING(200),
        allowNull: false,
      },
      due_amount: {
        type: type.Float,
      },
      phone: {
        type: type.STRING(200),
      },
    },
    {
      timestamps: true,
    }
  );
};
