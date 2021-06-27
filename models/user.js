module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING, //maybe delete
    },
  });

  return User;
};
