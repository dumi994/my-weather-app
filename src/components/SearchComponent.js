import React, { useState } from 'react';
import BookmarksComponent from './BookmarksComponent';

const SearchComponent = ({onCityChange, weatherData}) => {
  const [inputCity, setInputCity] = useState("");
  const [bookmarkedCityes, setBookmarkedCityes] = useState([])
    
   const handleInputChange = (e) =>{
    setInputCity(e.target.value)
   }
   const handleSearch = () =>{
    onCityChange(inputCity)
   }
   /* quando clicco la città dei preferiti cambia state */

   const toggleBookmark = (city) => {
      setBookmarkedCityes((prevCities) =>
         prevCities.includes(city)
            ? prevCities.filter((c) => c !== city) // Rimuovi se già esiste
            : [...prevCities, city] // Aggiungi se non esiste
      );
   };

   const capitalizeFirstWord = (str) => {
    const words = str.split(" ");
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    return words.join(" ");
  };
 
  return (
    <div className="">
      <h2>Scopri il meteo della tua città</h2>
      <div className="d-flex justify-content-center">
        <div className="d-flex align-items-center bg-white" style={{borderRadius:"5px 0 0 5px"}}>
            <input 
              type="text" 
              className="form-control  mr-sm-2" 
              id="cityInput" 
              placeholder="Cerca la tua città" 
              value={inputCity}
              onChange={handleInputChange}
              style={{border:"none" }}
            />
            {inputCity.length != 0 && weatherData ? <BookmarksComponent selectedCity={inputCity} bookmarkedCityes={bookmarkedCityes}  toggleBookmark={toggleBookmark}/> : <div style={{width:"40px"}}></div>}
        </div>
        <button type="submit" className="btn btn-primary" style={{borderRadius:"0 5px 5px 0"}} onClick={handleSearch} >Cerca</button>
      </div>
       <div style={{display:"flex", justifyContent:"center", margin:"30px 10px"}}>

      {
        bookmarkedCityes.length >= 1 ? 

        bookmarkedCityes.map((el, k)=>(
          <span
           key={k} 
           onClick={()=>{
              setInputCity(el); // Imposta la città selezionata
              handleSearch(); // Esegui la ricerca
           }} 
           style={
            {
              margin:"0 5px",
              display:"block",
              borderRadius:"5px",
              padding:"2px 3px",
              minWidth:"100px",
              fontSize:"12px",
              textAlign:"center",
              minHeight:"10px",  
              backgroundColor:"red"}}
           >
            {capitalizeFirstWord(el)}
          </span>
        ))
         : null
      }
        </div>

    </div>
  )
}

export default SearchComponent