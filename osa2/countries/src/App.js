import React from 'react'
import countriesService from './services/countries'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      newName: '',
      nameFilter: ''
    }
  }
  componentDidMount() {
    countriesService
      .getAll()
      .then(countries => {
        this.setState({ countries })
      })
  }
  handleFilterChange = (event) => this.setState({ nameFilter: event.target.value })

  render() {
    return (
      <div>
        <Search
          state={this.state}
          handleFilterChange={this.handleFilterChange}
        />
        <Countries
          state={this.state}
        />
      </div>
    )
  }
}

const Countries = (props) => {
  const list = props.state.countries.filter(c => c.name.toLowerCase().includes(props.state.nameFilter.toLowerCase()))
  if (list.length > 10) {
    return (
      <div>
        Too many matches, narrow your search.
    </div>
    )
  } else if (list.length === 1) {
    console.log(list);

    return (
      <Country list={list} />
    )
  } else {
    return (
      <div>
        {list.map((country) => <div key={country.name}>{country.name}</div>)}
      </div>
    )
  }
}
const Country = (props) => {
  return (
    <div>
      <h1>{props.list[0].name} {props.list[0].nativeName}</h1>
      Capital: <strong>{props.list[0].capital}</strong><br />
      Population: <strong>{props.list[0].population}</strong><br />
      <img src={props.list[0].flag} width="320" border="1" alt="Flag of the country" />
    </div>
  )
}
const Search = (props) => {
  return (
    <div>
      Type below to search for countries
    <div>
        <input
          value={props.state.nameFilter}
          onChange={props.handleFilterChange}
        />
      </div>
    </div>
  )
}

export default App;
