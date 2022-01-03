import React, { useState, useEffect } from 'react'
import axios from 'axios'
import numbersService from './services/numbers'
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

  useEffect(() => { 
    numbersService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      }) 
  }, [])

  console.log(persons)

  const addNewName = (event) => {
    event.preventDefault()
    
    const newNameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const personExists = persons.find(element => element.name === newName)

    if (personExists) {
      if (window.confirm(`${newName} already exists, update number?`)) {
        updatePerson(personExists, newNameObject.number)
      }
    } else {
      numbersService
        .create(newNameObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updatePerson = (person, newNumber) => {
    const updatedP = { ...person, number: newNumber }

    numbersService
      .update(person.id, updatedP)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert(`${person.name} was already deleted`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
  } 

  const deletePersonService = (id) => {
    numbersService
      .remove(id)
      .then(
        setPersons(persons.filter(p => p.id !== id))
      )
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
      
      <Persons 
        persons={filteredNames}
        deletePersonService={deletePersonService} />
    
    </div>
  )
}

export default App