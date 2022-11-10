import { useState, useEffect} from 'react'
import axios from 'axios';

const App = () =>{
  
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(r => {
        console.log('tiedot haettu')
        console.log(r.data)
        setCountries(r.data)
      })
  }, [])
  const [searchedCountries, setSearchedCountries] = useState([])
  const [search, newSearch] = useState('')
  const handleNoteChange = (event) => {
      console.log(event.target.value)
      newSearch(event.target.value)
      
      for(const country of countries){
        if(country.name.common.includes(search)){
          setSearchedCountries(searchedCountries.concat(country))
        }
      }
      console.log(searchedCountries)
  }

  return(
    <div>
      <form>
        find countries <input value={search} onChange={handleNoteChange}></input>
      </form>
      {searchedCountries.map(country =>
       <p key = {country.name.common}>{country.name.common}</p>)}
    </div>
  )
}

export default App
