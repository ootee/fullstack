const listHelper = require('../utils/list_helper')
const { listWithOneBlog, initialBlogs } = require('./test_helper')



describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })
})

describe('total likes', () => {
  test('when list has several blogs equals the likes of those', () => {
    expect(listHelper.totalLikes(initialBlogs)).toBe(36)
  })
})

describe('favourite blog', () => {
  test('return blog with most likes', () => {
    expect(listHelper.favouriteBlog(initialBlogs)).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })
})