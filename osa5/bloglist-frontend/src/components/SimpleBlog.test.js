import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Otsikko',
      author: 'Mina Itse',
      url: 'http://www.blog.com',
      likes: 3,
      user: {
        name: 'Matti Luukkainen'
      }
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler} />)
    const titleauthorDiv = blogComponent.find('.titleauthor')
    const likesbuttonDiv = blogComponent.find('.likesbutton')

    expect(titleauthorDiv.text()).toContain(blog.title)
    expect(titleauthorDiv.text()).toContain(blog.author)
    expect(likesbuttonDiv.text()).toContain('blog has', blog.likes, 'likes')
  })
  it('click the button twice calls event handler twice', () => {
    const blog = {
      title: 'Otsikko',
      author: 'Mina Itse',
      likes: 3
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})