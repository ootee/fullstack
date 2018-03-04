import React from 'react';

class App extends React.Component {

  vote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  add = (event) => {
    event.preventDefault()
    this.props.store.dispatch({
      type: 'ADD',
      data: {
        content: event.target.anecdote.value
      }
    })
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState().sort((a, b) => a.votes - b.votes < 0)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.add}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }
}

export default App