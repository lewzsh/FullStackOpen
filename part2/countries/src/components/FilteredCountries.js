import React from "react"
import Country from './Country'

const FilteredCountries = ({ countries, countryShown, showCountry }) => {
    if (countryShown) {
        const countryToShow = countries.find(c => c.name.official === countryShown.name.official)

        return (
            <Country country={countryToShow}/>  
        )
    }
    else if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } 
    else if (countries.length > 0) {
        return (
            <p>
                {countries.map(country => 
                    <span key={country.name.official}>
                        {country.name.common} <button onClick={() => showCountry(country)}>show</button><br/>
                    </span>
                )}
            </p>
        )
    }
    else {
        return (
            <p>No results, try another filter</p>
        )
    }
}

export default FilteredCountries