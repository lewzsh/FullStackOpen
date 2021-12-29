import React from "react";

const Country = ({ country }) => {
    return ( 
        <div>
            <h1>{country.name.common}</h1>

            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>

            <h2>languages</h2>
            <ul> 
                {Object.values(country.languages)
                    .map( lang => 
                        <li key={lang}>{lang}</li>
                    )
                }
            </ul>

            <div><img src={country.flags.png}/></div>
        </div>
    )
}

export default Country