const router = require("express").Router()
const { tokenExtractor } = require("../util/middleware")
const { Sesion } = require("../models")
router.delete("/", tokenExtractor, async (req, res) => {
  const userSesion = await Sesion.findOne({
    where: {
      userId: req.decodedToken.id
    },
  })
  if(userSesion){
    await userSesion.destroy();
    res.status(204).end();
  }
})

module.exports = router
