const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { format, initialBlogs, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjects.map(blog => blog.save()))
  })

  test('all blogs are returned as JSON by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(b => b.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })

  test('individual blogs are returned as json by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()
    const aBlog = blogsInDatabase[0]

    const response = await api
      .get(`/api/blogs/${aBlog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(aBlog.title)
  })

  describe('add blogs', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .get('/api/blogs')

      const titles = response.body.map(r => r.title)

      expect(response.body.length).toBe(initialBlogs.length + 1)
      expect(titles).toContain('TDD harms architecture')
    })

    test('if likes is not defined, set it to 0', async () => {
      const newBlog = {
        title: '5 most common IT problems companies face',
        author: 'Nate Vickery',
        url: 'https://www.ibm.com/developerworks/community/blogs/7774fa2f-98f6-4dd8-81d4-6b2752ede890/entry/5_most_common_IT_problems_companies_face?lang=en'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .get('/api/blogs')

      const result = response.body.map(blog => blog.likes)

      expect(result[response.body.length - 1]).toEqual(0)
    })

    test('blogs need title', async () => {
      const newBlog = {
        author: 'Nate Vickery',
        url: 'https://www.ibm.com/developerworks/community/blogs/7774fa2f-98f6-4dd8-81d4-6b2752ede890/entry/5_most_common_IT_problems_companies_face?lang=en',
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
    test('blogs need url', async () => {
      const newBlog = {
        title: '5 most common IT problems companies face',
        author: 'Nate Vickery',
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })
})
describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const usernames = usersAfterOperation.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with a username already in database', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Pää Käyttäjä',
      password: 'salainen'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    expect(response.body.error).toBe('username already in use')
  })

  test('POST /api/users fails with no username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: '',
      name: 'Pää Käyttäjä',
      password: 'salainen'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    expect(response.body.error).toBe('username cannot be empty')
  })

  test('POST /api/users fails with too short password', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'paakayttaja',
      name: 'Pää Käyttäjä',
      password: 'sa'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    expect(response.body.error).toBe('minimum length for password is 3')
  })

  test('POST /api/users fails with no name', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'paakayttaja',
      name: '',
      password: 'salasana'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    expect(response.body.error).toBe('name must contain at least 1 character')
  })
})


afterAll(() => {
  server.close()
})