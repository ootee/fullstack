import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='titleauthor'>
      {blog.title} {blog.author}
    </div>
    <div className='likesbutton'>
      blog has {blog.likes} likes<button onClick={onClick}></button>
    </div>
  </div>
)

export default SimpleBlog