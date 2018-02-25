const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  let mostLikes = 0
  let mostLiked = null
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikes) {
      mostLikes = blogs[i].likes
      mostLiked = blogs[i]
    }
  }
  return mostLiked
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}