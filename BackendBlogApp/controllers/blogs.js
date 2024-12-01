const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require('../util/db')
const { tokenExtractor } = require('../util/middleware')

router.get("/", async (req, res) => {
  const where = {};
  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.substring]: req.query.search,
        },
      },
      {
        author: {
          [Op.substring]: req.query.search,
        },
      },
    ];
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [[sequelize.literal("likes"), "DESC"]],
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  });
  res.json(blog);
});

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    const error = new Error("Blog no encontrado");
    error.name = "NotFoundError";
    throw error;
  }
  req.blog = blog;
  next();
};

router.get("/:id", blogFinder, async (req, res, next) => {
  res.json(req.blog);
});

router.put("/:id", blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog.userId === req.decodedToken.id) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    const error = new Error("User can not delete this blog");
    error.name = "NotUserError";
    throw error;
  }
});

module.exports = router;
