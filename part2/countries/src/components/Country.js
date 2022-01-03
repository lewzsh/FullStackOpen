import React, { useState, useEffect } from "react";
import axios from 'axios'

const wx_api_key = process.env.REACT_APP_WX_API_KEY

const Country = ({ country }) => {
    const [weather, setWeatherResponse] = useState('')

    const weatherHook = () => {
        console.log("calling wx hook")
        const wxURL = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${wx_api_key}`

        axios
          .get(wxURL)
          .then(result => {
            console.log("axios response", result.data)
            setWeatherResponse(result.data)
          })
    }
    useEffect(weatherHook, [])

    if (!weather) {
        return (<div/>)
    }

    return ( 
        <div>
            <h1>{country.name.common}</h1>

            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>

            <h3>Spoken languages</h3>
            <ul> 
                {Object.values(country.languages)
                    .map( lang => 
                        <li key={lang}>{lang}</li>
                    )
                }
            </ul>

            <div><img src={country.flags.png}/></div>

            <h3>Weather in {country.capital[0]}</h3>
            <div>
                <p><strong>temperature:</strong> {weather.main.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`}/>
                <p><strong>wind:</strong> {weather.wind.speed} meters/sec</p>
            </div>
        </div>
    )
}

export default Country