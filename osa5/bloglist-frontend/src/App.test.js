import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()

      expect(app.contains('kirjaudu')).toEqual(true)
      expect(app.contains('blogs')).toEqual(false)
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        name: 'Matti Luukkainen',
        token: '123456qwerty',
        username: 'mluukkai'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('all blogs are rendered', () => {
      app.update()

      expect(app.contains('kirjaudu')).toEqual(false)
      expect(app.contains('blogs')).toEqual(true)
    })
  })
})