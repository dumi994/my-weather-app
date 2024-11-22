"use client";
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import SearchComponent from './SearchComponent'
import 'weather-icons/css/weather-icons.css';

/* ICONS */
 
const MainComponent = (props) => {
  /* DATI METEO */
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData24h, setWeatherData24h] = useState(null);

  /* CITTA' */
  const [cityInput, setCityInput ] = useState(null);
  /* COORDINATE CITTA' */
  const [coords, setCoords] = useState(null);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  /* API */
  const geocodingApi = `https://api.opencagedata.com/geocode/v1/json?q=${cityInput}&key=6b9952462dda458ab2a6be21805c864e`
  const weatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m&timezone=GMT`
  const dailyWeatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=GMT`


  /* FETCHO DATI PER CITTA' */
  useEffect(() => {
    /* CONTROLLO Che l'input sia true */
    if (cityInput) { 
      const fetchCityCoords = async () => {
        try {
          const resp = await axios.get(geocodingApi);
          setCoords(resp.data); 
        } catch (er) {
          console.error("Errore nella chiamata:", er);
        }
      };
      fetchCityCoords();
    }
  }, [cityInput]);

  /* SETTO COORDINATE  */
  useEffect(() => {
    if (coords && coords.results.length > 0) {
      setLat(coords.results[0].geometry.lat);
      setLong(coords.results[0].geometry.lng);
    }
  }, [coords]);

  /* FETCHO DATI CON LE COORDINATE GIUSTE */
  useEffect(() => {

    /* CONTROLLO CHE CI SIANO LE COORDINATE */
    if (lat && long) { 
      /* FETCHO CURRENT DATA */
      const fetchData = async () => {
        try {
          const resp = await axios.get(weatherApi);
          setWeatherData(resp.data);
        } catch (er) {
          console.error("Errore nella chiamata:", er);
        }
      };

      /* FETCHO 24H DATA */
      const fetch24hData = async () => {
        try {
          const resp = await axios.get(dailyWeatherApi);
          setWeatherData24h(resp.data);
        } catch (er) {
          console.error("Errore nella chiamata:", er);
        }
      };
      fetch24hData();
      fetchData();
    }
  }, [lat, long]);
  /* FETCHO PER i DATI DELLE 24h */
  useEffect(() => {

    /* CONTROLLO CHE CI SIANO LE COORDINATE */
    if (lat && long) { 
      
    }
  }, [lat, long]);
  /* LOG PER VERIFICARE I DATI */
  useEffect(() => {
    /* if (weatherData) {
      console.log("Weather Data:", weatherData);
    } */
    if (coords) {
      console.log("Coordinate:", coords.results[0].geometry);
    }
    if (weatherData24h) {
      console.log("Weather Data24h:", weatherData24h);
    }
  }, [weatherData, coords,weatherData24h]);

  /* FUNZIONE DI CALLBACK PER RECUPERARE LA CITTà DALL'INPUT */
  const handleCityChange = (city) => {
    setCityInput(city);
  };

  const cellStyle = {
    width: `${100 / 8}%`, // Imposta una larghezza dinamica
    padding: '8px',
    border: '1px solid #ddd',
    fontSize:"12px"
  };

  /*PRENDO LE ORE CHE RIMANGONO FINO A MEZZANOTTE DEL GIORNO DI OGGI*/
  const now = new Date();
  //const currentDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}`
  const currentDay = now.toISOString().slice(0, 13); // "YYYY-MM-DDTHH"
  const currentHour = now.getHours();
  const [datePart, hourPart] = currentDay.split("T");
  console.log(datePart, hourPart, currentHour );
  

  /* ICONE */
  const getWeatherIcon = (code, time) => {
    const now = new Date().getHours();
     
    if (now <= 6 && now >= 19) {
    // GIORNO
    switch (code) {
      case 0:
        return '/weather-icons/soleggiato.png';
      case 1:
        return '/weather-icons/giorno-parz-nuvoloso.png';
      case 2:
        return '/weather-icons/nuvoloso.png';
      case 3:
        return '/weather-icons/pioggia.png';
      case 4:
        return '/weather-icons/neve.png';
      case 5:
        return '/weather-icons/temporale.png';
      case 6:
        return '/weather-icons/nebbia.png';
      case 45:
        return '/weather-icons/nebbia-densa.png';
      case 51:
        return '/weather-icons/pioggia-leggera.png';
      case 61:
        return '/weather-icons/neve-pioggia.png';
      case 63:
        return '/weather-icons/neve-debole.png';
      case 71:
        return '/weather-icons/neve-fitta.png';
      case 80:
        return '/weather-icons/rovesci-leggeri.png';
      case 81:
        return '/weather-icons/rovesci-intensi.png';
      default:
        return '/weather-icons/default.png';
    }
    } else {
      // NOTTE
      switch (code) {
        case 0:
          return '/weather-icons/notte-sereno.png';
        case 1:
          return '/weather-icons/notte-parz-nuvoloso.png';
        case 2:
          return '/weather-icons/nuvoloso.png';
        case 3:
          return '/weather-icons/pioggia.png';
        case 4:
          return '/weather-icons/neve.png';
        case 5:
          return '/weather-icons/temporale.png';
        case 6:
          return '/weather-icons/nebbia.png';
        case 45:
          return '/weather-icons/nebbia-densa.png';
        case 51:
          return '/weather-icons/pioggia-leggera.png';
        case 61:
          return '/weather-icons/neve-pioggia.png';
        case 63:
          return '/weather-icons/neve-debole.png';
        case 71:
          return '/weather-icons/neve-fitta.png';
        case 80:
          return '/weather-icons/rovesci-leggeri.png';
        case 81:
          return '/weather-icons/rovesci-intensi.png';
        default:
          return '/weather-icons/default.png';
      }
    }
  };


  return (
    <>
      
      <SearchComponent onCityChange={handleCityChange}/>
        <div>
        {/* VERIFICO CHE I DATI SIANO RPESENTI */}
        {weatherData && weatherData24h ? (
          <>
          <div className="weather-table">
          
          <table className="table">
            <thead>
              {/* DATI METEOROLOGICI DEL MOMENTO */}

              <tr>
                <th  style={cellStyle}>Ora</th>
                <th  style={cellStyle}>Tempo</th>
                <th  style={cellStyle}>Temperatura </th>
                <th  style={cellStyle}>T percepita </th>
                <th  style={cellStyle}>Precipitazioni</th>
                <th  style={cellStyle}>Vento <small>(km/h)</small></th>
                <th  style={cellStyle}>Umidità relativa <small>(%)</small></th>
                <th  style={cellStyle}>Pressione <small>(mbar)</small></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                
                <td>{weatherData.current.time.split('T')[1]}</td>
                  <td>
                  <img
                    src={getWeatherIcon(weatherData?.current?.weather_code, new Date(weatherData?.current?.time).getHours())}
                    alt="Weather Icon"
                   
                  />
                </td>
                <td>{weatherData?.current?.temperature_2m} °C</td>
                <td>{weatherData?.current?.apparent_temperature} °C</td>
                <td>{weatherData?.current?.precipitation} mm</td>
                <td>{weatherData?.current?.wind_speed_10m} km/h</td>
            
                <td>{weatherData?.current?.relative_humidity_2m} %</td>
                <td>{weatherData?.current?.surface_pressure || "N/A"} mbar</td>
              </tr>
                {/* DATI METEOROLOGICI DELLA GIORNATA*/}

              {
                //VERIFICO CHE OGNI ELEMENTO NON SIA null / undefined
             
                weatherData24h?.hourly?.time.map((el, i)=>(
                  //SPLITTO DATA ("2024-11-02T00:00") PER "T" E CONFRONTO IL PRIMO ELEMENTO ("2024-11-02") CON LA DATA ODIERNA
                  el.split("T")[0] === datePart 
                  &&
                  //SPLITTO DI NUOVO LA DATA E PRENDO IL SECONDO ELEMENTO (00:00) IN PRIMA POSIZIONE (00)
                  //VERIFICO CHE SIA SUPERIORE O UGUALE ALLA ORA ATTUALE
                  el.split("T")[1].split(':')[0] >= currentHour
                  //SPLITTO DI NUOVO LA DATA E PRENDO IL PRIMO ELEMENTO E CONTROLLO SE è DIVERSA DALLA DATA ATTUALE E SE C'è L'ORA 00
                  //||  el.split("T")[0] !== datePart && el.split("T")[1].split(':')[0] === 0
                   ?
                  <tr key={i}>
                    <td>{ el.split("T")[1]} </td> {/* Mostra solo l'ora */}
                    <td> <img src={getWeatherIcon(weatherData24h.hourly.weather_code[i])} />  {weatherData24h.hourly.weathercode?.[i] }</td>
                    <td>{weatherData24h.hourly.temperature_2m?.[i] ?? "N/A"} °C</td>
                    <td>{weatherData24h.hourly.apparent_temperature?.[i] ?? "N/A"} °C</td>
                    <td>{weatherData24h.hourly.precipitation?.[i] ?? "N/A"} mm</td>
                    <td>{weatherData24h.hourly.wind_speed_10m?.[i] ?? "N/A"} km/h</td>
                    <td>{weatherData24h.hourly.relative_humidity_2m?.[i] ?? "N/A"} %</td>
                    <td>{weatherData24h.hourly.surface_pressure?.[i] ?? "N/A"} mbar</td>
                  </tr>
                 :
                 null
                ))
                
              }

              
            </tbody>
          </table>
        </div>

          </>
        ) : (
          <p>Caricamento dei dati meteo...</p>
        )}
      </div>
    </>
  )
}

export default MainComponent