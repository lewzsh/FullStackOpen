import React, { useState, useEffect } from 'react'
import numbersService from './services/numbers'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerms, setNewFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState([null, ''])

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

  const timeoutMsg = () => {
    setTimeout(() => {
      setNotificationMsg([null, ''])
    }, 5000)
  }

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
        .then(createdPerson => {
          setNotificationMsg([`Added ${newName}`, 'success'])
          timeoutMsg()
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          const errJSON = JSON.stringify(error.response.data.error)
          setNotificationMsg([`New contact validation failed: ${errJSON}`, 'error'])
          timeoutMsg()
          console.log(error.response.data)
        })
    }
  }

  const updatePerson = (person, newNumber) => {
    const updatedP = { ...person, number: newNumber }

    numbersService
      .update(person.id, updatedP)
      .then(returnedPerson => {
        setNotificationMsg([`${person.name}'s number has been updated`, 'success'])
        timeoutMsg()
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNotificationMsg([`${person.name} no longer exists`, 'error'])
        timeoutMsg()
        setPersons(persons.filter(p => p.id !== person.id))
      })
  } 

  const deletePersonService = (id) => {
    numbersService
      .remove(id)
      .then(
        setPersons(persons.filter(p => p.id !== id))
      )
      .catch(error => {
        setNotificationMsg([`That person was already deleted`, 'error'])
        timeoutMsg()
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const filteredNames = persons.filter(person => 
      person.name.toLowerCase().includes(filterTerms.toLowerCase())
    )

  return (
    <div>

      <h2>Phonebook</h2>
      
      <Notification message={notificationMsg} />

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