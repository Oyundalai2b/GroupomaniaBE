const Sequelize = require("sequelize");

var user = connection.define(
  "users",
  {
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      field: "id",
    },
    userName: {
      type: Sequelize.STRING,
      field: "user_name",
    },
    email: {
      type: Sequelize.STRING,
      field: "user_email",
    },
    password: {
      type: Sequelize.STRING,
      field: "user_password",
    },
    bio: {
      type: Sequelize.STRING,
      field: "user_bio",
    },
  },
  {
    freezeUsers: true,
  }
);

users.sync({ force: true }).then(function () {
  return user.Create({
    userName: "oggy",
    email: "ok@ok.com",
    password: "okokok",
    bio: "okokok",
  });
});
