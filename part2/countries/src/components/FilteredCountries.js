import React from "react"
import Country from './Country'

const FilteredCountries = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } 
    else if (countries.length > 1) {
        // Bonus To Do: 2.14 & 2.15
        return (
            <p>
                {countries.map(country => 
                    <span key={country.name.official}>
                        {country.name.common} <br/>
                    </span>
                )}
            </p>
        )
    } 
    else if (countries.length === 1) {
        return (
            <Country country={countries[0]} />  
        )
    } 
    else {
        return (
            <p>No results, try another filter</p>
        )
    }
}

export default FilteredCountries