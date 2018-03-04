import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      message: null,
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    blogService.getAll()
      .then(blogs =>
        this.setState({ blogs })
      )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    console.log('login with ', this.state.username, this.state.password)

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user, message: `kirjauduttu sisään käyttäjänä ${user.name}` })
      this.clearMessage()
    } catch (exception) {
      this.setState({
        message: 'käyttäjätunnus tai salasana virheellinen'
      })
      this.clearMessage()
    }
  }

  logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
      }

      const newBlog = await blogService.create(blogObject)
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: '',
        author: '',
        url: ''
      })
    } catch (exception) {
      this.setState({
        message: 'blogin lisääminen ei onnistunut'
      })
      this.clearMessage()
    }
  }

  clearMessage = () => setTimeout(() => this.setState({ message: null }), 5000)

  render() {
    return (
      <div className='wrapper'>
        <Notification message={this.state.message} />
        {this.state.user === null ?
          <div className='login'>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              login={this.login}
              handleChange={this.handleLoginFieldChange}
            />
          </div> :
          <div className='blogs'>
            <button onClick={this.logout}>kirjaudu ulos</button>
            <h2>blogs</h2>
            {this.state.blogs
              .sort((a, b) => a.likes - b.likes < 0)
              .map(blog =>
                <Blog key={blog.id} blog={blog} />
              )
            }
            <Togglable buttonLabel="uusi blogi" ref={component => this.blogForm = component}>
              <BlogForm
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                handleChange={this.handleBlogFieldChange}
                addBlog={this.addBlog}
              />
            </Togglable>
          </div>
        }
      </div>
    )
  }
}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    < div className="message" >
      {message}
    </div >
  )
}

export default App
