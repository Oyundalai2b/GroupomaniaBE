module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    userName: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
  });

  return Comment;
};
