import React from 'react'

const PersonForm = ({ addNewName, newName, newNameHandler, newNumber, newNumberHandler }) => {
    return (
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
    )
}

export default PersonForm