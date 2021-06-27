const dbConfig = require("../config/dbconfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post")(sequelize, Sequelize);
db.comments = require("./comment")(sequelize, Sequelize);
db.users = require("./user")(sequelize, Sequelize);

db.posts.hasMany(db.comments, { as: "comments" }); //hasMany() to help one Post have many Comments
db.comments.belongsTo(db.posts, {
  //belongsTo() to indicate that one Comment only belongs to one Post
  foreignKey: "postId",
  as: "post",
});

db.users.hasMany(db.posts, {
  as: "posts",
  foreignKey: { name: "userId", allowNull: false },
});
db.posts.belongsTo(db.users, {
  as: "user",
});
module.exports = db;
