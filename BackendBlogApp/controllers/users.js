const router = require("express").Router()

const { User, Blog, ReadingLists } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId", "createdAt","updatedAt"] },
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ["userId", "createdAt","updatedAt"] },
        through:{
          attributes:["read","id"]
        },
      }
    ],
  })
  res.json(users)
})

router.post("/", async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get("/:id", async (req, res) => {
  const where = {}
  if(req.query.read){
    where.read = req.query.read
  }
  const user = await User.findByPk(req.params.id,{
    include:{
      model: Blog,
      as: 'readings',
      attributes: { exclude: ["userId", "createdAt","updatedAt"] },
      through:{
        attributes:["read","id"],
        where
      },
      
    }
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
