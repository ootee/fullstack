import React from 'react'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      nameFilter: '',
      message: null
    }
  }
  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }
  addPerson = (event) => {
    event.preventDefault()
    const nameToBeAdded = this.state.newName.trim()
    const numberToBeAdded = this.state.newNumber.trim()
    if (this.state.persons.find(p => p.name === nameToBeAdded) == null) {
      const personObject = {
        name: nameToBeAdded,
        number: numberToBeAdded
      }
      personService
        .create(personObject)
        .then(persons => {
          this.setState({
            persons: this.state.persons.concat(persons),
            newName: '',
            newNumber: '',
            nameFilter: '',
            message: `Henkilön ${nameToBeAdded} lisäys onnistui.`
          })
          this.clearMessage()
        })
        .catch(error => {
          console.log('Fail');
        })
    } else if (this.state.persons.find(p => p.name === nameToBeAdded).number !== numberToBeAdded) {
      if (window.confirm(`${nameToBeAdded} on jo listassa. Haluatko päivittää uuden numeron?`)) {
        const person = this.state.persons.find(p => p.name === nameToBeAdded)
        const changedPerson = { ...person, number: numberToBeAdded }
        personService
          .update(person.id, changedPerson)
          .then(changedPerson => {
            const persons = this.state.persons.filter(p => p.id !== changedPerson.id)
            this.setState({
              persons: persons.concat(changedPerson),
              newName: '',
              newNumber: '',
              nameFilter: '',
              message: `Henkilön ${nameToBeAdded} tietojen muutos onnistui.`
            })
            this.clearMessage()
          })
          .catch(error => {
            personService
              .create(changedPerson)
              .then(persons => {
                const persons2 = this.state.persons.filter(p => p.id !== changedPerson.id)
                this.setState({
                  persons: persons2.concat(changedPerson),
                  newName: '',
                  newNumber: '',
                  nameFilter: '',
                  message: `Henkilön ${nameToBeAdded} tietojen muutos onnistui.`
                })
                this.clearMessage()
              })
          })
      }
    } else {
      this.setState({
        message: "Nimi on jo listassa!"
      })
      this.clearMessage()
    }
  }
  handleDelete = (id) => {
    if (window.confirm("Haluatko varmasti poistaa?")) {
      personService
        .del(id)
        .then(response => {
          const persons = this.state.persons.filter(p => p.id !== id)
          this.setState({
            persons: persons,
            newName: '',
            newNumber: '',
            nameFilter: '',
            message: `Henkilön tiedot on poistettu luettelosta.`,
          })
          this.clearMessage()
        })
        .catch(error => {
          this.setState({
            message: "Henkilöä ei löytynyt. Ehkä hänen tietonsa olivat jo poistettu."
          })
        })
    }
  }
  clearMessage = () => setTimeout(() => this.setState({ message: null }), 2000);
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  handleFilterChange = (event) => {
    this.setState({ nameFilter: event.target.value })
  }
  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.message} />
        <Form
          state={this.state}
          addPerson={this.addPerson}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange} />
        <h2>Numerot</h2>
        <Filter
          state={this.state}
          handleFilterChange={this.handleFilterChange}
        />
        <Persons state={this.state} delete={this.handleDelete} />
      </div>
    )
  }
}
const Filter = (props) => {
  return (
    <div>Rajaa näytettävät
    <div>
        <input
          value={props.state.nameFilter}
          onChange={props.handleFilterChange}
        />
      </div>
    </div>
  )
}
const Form = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        <div>Nimi</div>
        <input
          value={props.state.newName}
          onChange={props.handleNameChange}
        />
        <div>Numero</div>
        <input
          value={props.state.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">Lisää</button>
      </div>
    </form>
  )
}
const Persons = (props, del) => {

  if (props.state.nameFilter === '') {
    return (
      <table>
        <tbody>
          {props.state.persons
            .map(person => <Person
              id={person.id}
              key={person.id}
              name={person.name}
              number={person.number}
              delete={props.delete}
            />
            )}
        </tbody>
      </table>
    )
  } else return (
    <table>
      <tbody>
        {props.state.persons.filter(
          person => person.name
            .toLowerCase()
            .includes(props.state.nameFilter
              .toLowerCase()
            )
        ).map(person => <Person
          id={person.id}
          key={person.id}
          name={person.name}
          number={person.number}
          delete={props.delete}
        />)}
      </tbody>
    </table>
  )
}
const Person = (props) => {
  const id = props.id
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
      <td><button onClick={() => props.delete(id)}>Poista</button></td>
    </tr>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

export default App