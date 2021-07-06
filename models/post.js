module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    visited: {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: null,
    },
    imgURL: {
      type: Sequelize.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
  });

  return Post;
};
