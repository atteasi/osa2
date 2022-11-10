import { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = (props) =>
{
  const { persons } = props

  return(
    <>
    {persons.map(person => 
      <p key={person.name}>{person.name} {person.number}</p>)
    }</>
 ) 
}

const Filter = (props) =>
{
  return(
    <form>
      <div>
        filter shown with <input value={props.value} onChange={props.onChange}></input>
      </div>
    </form>
  )
}

const PersonForm = (props) =>
{
  return (
    <form onSubmit={props.submit}>
      <div>
        name: <input value={props.inputName} onChange={props.changeName}></input>
      </div>
      <div>
        number: <input value={props.inputNumber} onChange={props.changeNumber}></input>
      </div>
      <div><button type="submit">add</button></div>
    </form>
  )
}
const App = () => {

  const [persons, setPersons] = useState([
    useEffect(() => {
      console.log('effect')
      axios      
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
          })
    }, [])
  ]) 
 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchedPersons, setSearchedPersons] = useState(persons)
  
  const addNumber = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if(persons.find(p => p.name === person.name)){
      alert(`${newName} is already added to phonebook`)
    } else {
      console.log(event.target)
      setPersons(persons.concat(person))
      
      setNewName('')
      console.log(persons)
    }
  } 

  const handleNoteChangeName = (event) => {    
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNoteChangeNumber = (event) => {    
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNoteChangeSearch = (event) => {    
    console.log(event.target.value)
    setSearchName(event.target.value)
    setSearchedPersons(persons.filter(person => person.name.includes(searchName)))
    console.log(searchedPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter input={searchName} onChange={handleNoteChangeSearch} />

      <h3>Add a new</h3>

      <PersonForm 
        inputName={newName} changeName ={handleNoteChangeName}
        inputNumber={newNumber} changeNumber ={handleNoteChangeNumber}
        submit = {addNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={searchedPersons} />
    </div>
  )
}

export default App
