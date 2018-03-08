import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class AnecdoteFilter extends React.Component {
  handleChange = () => (e) => {
    this.props.filterChange(e.target.value)
  }

  render() {
    return (
      <div>
        Filter <input onChange={this.handleChange()} />
      </div>
    )
  }
}

export default connect(
  (state) => ({ filter: state.filter }),
  { filterChange }
)(AnecdoteFilter)