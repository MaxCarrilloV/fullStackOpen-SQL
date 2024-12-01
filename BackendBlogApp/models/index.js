const Blog = require("./blog")
const User = require("./user")
const ReadingLists = require("./readingLists")
const Sesion = require("./sesion")

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Sesion)
Sesion.belongsTo(User)

Blog.belongsToMany(User,{through: ReadingLists, as: "addedBlog"})
User.belongsToMany(Blog,{through: ReadingLists, as: "readings"})


module.exports = {
  Blog,
  User,
  ReadingLists,
  Sesion
}
