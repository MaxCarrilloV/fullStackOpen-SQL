const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../util/db");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("title")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [[sequelize.literal("likes"), "DESC"]],
  });
  res.json(blogs);
});

module.exports = router;
