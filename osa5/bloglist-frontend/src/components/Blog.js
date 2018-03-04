import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes,
      user: props.blog.user,
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  like = async () => {
    const blogObject = {
      id: this.props.blog.id,
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      likes: this.state.likes + 1,
      user: this.props.blog.user
    }
    await blogService.update(this.props.blog.id, blogObject)
    this.setState({ likes: this.state.likes + 1 })
  }

  render() {
    const blogHeaderStyle = {
      fontWeight: 'bold',
    }

    const blogStyle = {
      border: 'solid',
      borderWidth: 1,
      paddingTop: 5,
      paddingLeft: 2,
      marginBottom: 5
    }

    if (this.state.visible) {
      return (
        <div style={blogStyle} className='titleauthor'>
          <div onClick={this.toggleVisibility} style={blogHeaderStyle}>
            {this.state.title} - {this.state.author}
          </div>
          <div className='url'>
            <a href={this.state.url}>{this.state.url}</a>
          </div>
          <div className='likes'>
            tykkäyksiä {this.state.likes} <button onClick={this.like}>tykkää</button>
          </div>
          <div className='addedBy'>
            lisännyt {this.state.user.name}
          </div>
        </div>
      )
    } else {
      return (
        <div style={blogStyle}>
          <div className='titleauthor' onClick={this.toggleVisibility} style={blogHeaderStyle}>
            {this.state.title} - {this.state.author}
          </div>
        </div>
      )
    }

  }
}

export default Blog