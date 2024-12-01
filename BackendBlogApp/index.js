require("dotenv").config()
const express = require("express")
require('express-async-errors')
const app = express()

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const blogRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readinglists')
const logoutRouter = require("./controllers/logout")

app.use(express.json())
app.use("/api/blogs",blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors',authorRouter)
app.use('/api/readinglists',readingListsRouter)
app.use('/api/logout', logoutRouter)

const errorHandler = require("./util/errorHandler")

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
