const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1 })

  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({ username: body.username })

    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username already in use' })
    } else if (body.password.length < 3) {
      return response.status(400).json({ error: 'minimum length for password is 3' })
    } else if (body.username.length < 1) {
      return response.status(400).json({ error: 'username cannot be empty' })
    } else if (body.name.length < 1) {
      return response.status(400).json({ error: 'name must contain at least 1 character' })
    }

    const blogs = await Blog.find({})


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      adult: body.adult === undefined ? true : body.adult,
      blogs: blogs
    })

    const savedUser = await user.save()
    response.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = usersRouter