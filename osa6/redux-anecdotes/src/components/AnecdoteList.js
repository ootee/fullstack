import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  vote = (anecdote) => async () => {
    this.props.anecdoteVote(anecdote)
    this.props.notify(`You voted "${anecdote.content}"`, 5)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes} votes
                <button onClick={this.vote(anecdote)}>
                  vote
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
}

const mapDispatchToProps = {
  anecdoteVote,
  notify
}


const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)