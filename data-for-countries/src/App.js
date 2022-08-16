import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({country}) => {
  const [showDetail, setShowDetail] = useState(false)

  const el = showDetail ? 
  <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital[0]}</p>
    <p>area {country.area}</p>
  </div>
  : <span>{country.name.common}</span>
  return (
    <div>
      {el} 
      <button onClick={() => setShowDetail(!showDetail)}>{showDetail ? 'hide' : 'show'}</button>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')
  const [countriesWithSearchText, setCountriesWithSearchText] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      const countryData = response.data
      setCountries(countryData)
    })
  }, [])

  const handleChange = (event) => {
    setSearchText(event.target.value)
    setCountriesWithSearchText(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  let countryEl = ''

    if (countriesWithSearchText.length === 1) {
      countryEl = countriesWithSearchText.map(country => 
        <div key={country.name.common}>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
        </div>)
    } else if (countriesWithSearchText.length <= 10) {
      countryEl = countriesWithSearchText.map(country => <Country key={country.name.common} country={country}/>)
    } else if (countriesWithSearchText.length > 10) {
      countryEl = <p>Too many matches, specify another filter</p>
    }

  return (
    <div>
      <form>
        <div>find countries
          <input onChange={handleChange}
                 value={searchText}
          />
        </div>
      </form>
      {countryEl}
    </div>
  );
}

export default App;
