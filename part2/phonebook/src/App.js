import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerms, setNewFilter] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    
    const newNameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(element => element.name === newName)) {
      alert(`${newName} already exists`)
    } else {
      setPersons(persons.concat(newNameObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const newNameHandler = (event) => {
    setNewName(event.target.value)
  }

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const filterHandler = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredNames = persons.filter(person => 
      person.name.toLowerCase().includes(filterTerms.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={filterTerms} onChange={filterHandler}/></p>
      <h2>Add New</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={newNameHandler}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={newNumberHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredNames.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App