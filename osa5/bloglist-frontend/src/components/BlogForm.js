import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ title, author, url, handleChange, addBlog }) => {
  return (
    <div>
      <h2>lisää uusi blogi</h2>

      <form onSubmit={addBlog}>
        <div>
          Otsikko
          <input
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          Tekijä
          <input
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          Url
          <input
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button>tallenna</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired
}

export default BlogForm