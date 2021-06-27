module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    visited: {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: null,
    },
    imgURL: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });

  return Post;
};
