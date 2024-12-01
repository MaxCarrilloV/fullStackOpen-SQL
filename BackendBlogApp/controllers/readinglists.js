const router = require("express").Router()
const { ReadingLists, User } = require("../models")
const { tokenExtractor } = require("../util/middleware")

router.post("/", async (req, res) => {
  const reading_lists = await ReadingLists.create({
    ...req.body,
  })
  res.json(reading_lists);
})

router.put("/:id", tokenExtractor ,async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const reading_lists = await ReadingLists.findByPk(req.params.id);
  if(reading_lists && reading_lists.userId === user.id){
    reading_lists.read = req.body.read
    await reading_lists.save()
    res.json(reading_lists)
  }else{
    const error = new Error("User can not edit this blog");
    error.name = "NotUserError";
    throw error;
  }
})

module.exports = router
