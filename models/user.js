module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    Name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
