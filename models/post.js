const Sequelize = require("sequelize");

var post = connection.define(
  "posts",
  {
    postId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      field: "id",
    },
    title: {
      type: Sequelize.STRING,
      field: "post_title",
    },
    content: {
      type: Sequelize.STRING,
      field: "post_content",
    },
    images: {
      type: Sequelize.BLOB,
      field: "post_image",
    },
    date: {
      type: Sequelize.DATE,
      field: "post_date",
    },
    time: {
      type: Sequelize.TIME,
      field: "post_time",
    },
  },
  {
    freezeUsers: true,
  }
);

users.sync({ force: true }).then(function () {
  return post.Create({
    title: "oggy",
    content: "ok@ok.com",
    images: "",
    date: "01/01/2000",
    time: "00:00:00",
  });
});
