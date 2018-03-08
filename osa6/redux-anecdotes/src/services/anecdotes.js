
import axios from 'axios'


const url = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content: content, votes: 0, id: getId() })

  return response.data
}

const update = async (anecdote) => {
  const updatedAnecdote = { content: anecdote.content, id: anecdote.id, votes: anecdote.votes + 1 }
  const response = await axios.put(`${url}/${anecdote.id}`, updatedAnecdote)

  return response.data
}

export default { getAll, createNew, update }