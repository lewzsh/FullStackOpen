import React from 'react'

const Person = ({ person, deletePerson }) => {
    const confirmDelete = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            deletePerson()
        }
    }

    return (
        <li>{person.name} {person.number} <button onClick={confirmDelete}>delete</button></li>
    )
}

const Persons = ({ persons, deletePersonService }) => {
    return (
        <ul>
            {persons.map(person => 
                <Person 
                    key={person.id} 
                    person={person}
                    deletePerson={() => deletePersonService(person.id)} />
            )}
        </ul>
    )
}

export default Persons