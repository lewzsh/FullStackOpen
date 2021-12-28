import React from 'react'

const Filter = ({ filterTerms, filterHandler }) => {
    return (
        <p>
            filter shown with <input value={filterTerms} onChange={filterHandler}/>
        </p>
    )
}

export default Filter