import { useEffect, useState } from "react";
import "./App.css";
import clear from './photos/clear.jpeg'
import cloud from './photos/cloudy.jpeg'
import mist from './photos/mist.jpeg'
import rain from './photos/rain.jpg'

export const App = () => {
  
  const [weatherData, setWeatherData] = useState([{}]);
  const [inputValue, setInputValue] = useState("");

  const apiKey = "3003ac3f1fff3e36e765e6298dbae9df";



  const getWeather = () => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => { setWeatherData(data) })
    setInputValue('')

  }
  console.log(weatherData)
  console.log(typeof (weatherData.main))


  const enterInput = (e) => {
    console.log('enter' + e.key)
    if (e.key === 'Enter') {
      getWeather()
    }
  }


  //showing related picture
  const showPic = () => {
    if (weatherData.weather[0].main === 'Clear') {
      return <img src={clear} alt="Clear weather" />
    } else if (weatherData.weather[0].main === 'Clouds') {
      return <img src={cloud} alt="cloudy" />
    } else if (weatherData.weather[0].main === 'Mist') {
      return <img src={mist} alt="cloudy" />
    } else if (weatherData.weather[0].main === 'Rain') {
      return <img src={rain} alt="cloudy" />
    }
  }

  return (
    <div className="weatherApp_container">
      <h1>Weather App</h1>
      <input className="search_input" onKeyDown={enterInput} onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text" placeholder="Enter the city name" />
      <button className="searchBtn" onClick={getWeather}>Get Data</button>
      {typeof weatherData.main === 'undefined' ? (<h3>Wellcome to my App</h3>) :
        // render if city found 
        (<div>
          <h3>{weatherData.name}</h3>
          <h5>Country : '{weatherData.sys.country}'</h5>
          <h3 className="temp">{Math.round(weatherData.main.temp - 273.15)} °C</h3>
          <h3>{weatherData.weather[0].main}<br />{showPic()} </h3>
        </div>
        )
      }
      {weatherData.cod === '404' ? (<h3>city not found</h3>) : (<h3></h3>)}
      <h3></h3>
    </div>
  );
};

export default App
