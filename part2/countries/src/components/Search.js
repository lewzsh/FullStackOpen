import React from 'react'

const Search = ({ countrySearch, searchHandler }) => {
    return(
        <p>
            find countries <input value={countrySearch} onChange={searchHandler}/>
        </p>
    )
}

export default Search