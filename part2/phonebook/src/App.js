import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerms, setNewFilter] = useState('')

  const newNameHandler = (event) => setNewName(event.target.value)
  const newNumberHandler = (event) => setNewNumber(event.target.value)
  const filterHandler = (event) => setNewFilter(event.target.value)

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const addNewName = (event) => {
    event.preventDefault()
    
    const newNameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.find(element => element.name === newName)) {
      alert(`${newName} already exists`)
    } else {
      setPersons(persons.concat(newNameObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const filteredNames = persons.filter(person => 
      person.name.toLowerCase().includes(filterTerms.toLowerCase())
    )

  return (
    <div>

      <h2>Phonebook</h2>
      
      <Filter 
        filterTerms={filterTerms}
        filterHandler={filterHandler}/>
        
      <h2>Add New</h2>
      
      <PersonForm 
        addNewName={addNewName} 
        newName={newName} 
        newNameHandler={newNameHandler}
        newNumber={newNumber}
        newNumberHandler={newNumberHandler}/>

      <h2>Numbers</h2>
      
      <Persons persons={filteredNames}/>
    
    </div>
  )
}

export default App