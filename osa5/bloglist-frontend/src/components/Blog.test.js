import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Otsikko',
    author: 'Mina Itse',
    url: 'http://www.blog.fi',
    likes: 3,
    user: {
      name: 'Blogin Lisääjä'
    }
  }

  let blogComponent

  beforeEach(() => {
    blogComponent = shallow(
      <Blog
        blog={blog}

      />
    )
  })

  it('before click it renders title, author', () => {

    const mockHandler = jest.fn()

    const titleauthorDiv = blogComponent.find('.titleauthor')
    expect(titleauthorDiv.text()).toContain(blog.title)
    expect(titleauthorDiv.text()).toContain(blog.author)

    titleauthorDiv.simulate('click')

    const urlDiv = blogComponent.find('.url')
    const likesDiv = blogComponent.find('.likes')
    const addedByDiv = blogComponent.find('.addedBy')

    expect(urlDiv.text()).toContain(blog.url)
    expect(likesDiv.text()).toContain(blog.likes)
    expect(addedByDiv.text()).toContain(blog.user.name)
  })
})