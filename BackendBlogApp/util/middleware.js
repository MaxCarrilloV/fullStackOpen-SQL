const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { Sesion } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      
      const userSesion = await Sesion.findOne({
        where: { 
            userId: req.decodedToken.id, 
            token: authorization.substring(7) 
        }
      })
      if(!userSesion) {
        return res.status(400).json({ error: 'Sesion expired!'})
      }
      
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { tokenExtractor }