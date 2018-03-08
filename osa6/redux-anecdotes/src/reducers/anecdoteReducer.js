import anecdoteServcice from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  console.log(action.type)
  switch (action.type) {
  case 'CREATE':
    return [...state, { content: action.content, id: getId(), votes: 0 }]
  case 'VOTE': {
    const old = state.filter(a => a.id !== action.anecdote.id)
    const voted = state.find(a => a.id === action.anecdote.id)
    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServcice.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServcice.createNew(content)
    console.log(newAnecdote)
    dispatch({
      type: 'CREATE',
      content
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await(anecdoteServcice.update(anecdote))
    console.log(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      anecdote
    })
  }
}



export default anecdoteReducer