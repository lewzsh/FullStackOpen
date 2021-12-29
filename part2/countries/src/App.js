import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Search from './components/Search'
import FilteredCountries from './components/FilteredCountries';


function App() {
  const [countries, setCountries] = useState([])
  const [countrySearch, setSearch] = useState('')

  const searchHandler = (event) => setSearch(event.target.value)

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(result => {
        setCountries(result.data)
      })
  }
  useEffect(hook, [])

  const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
    )

  return (
    <div>
      <Search countrySearch={countrySearch} searchHandler={searchHandler}/>
      <div>
        <FilteredCountries countries={filteredCountries} />
      </div>
    </div>
  );
}

export default App;
