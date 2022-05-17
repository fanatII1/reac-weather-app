import './App.css';
import { useState } from 'react'
/*now, we are going to create a react-weather app.
*/
const api = {
  key: "a8e748880bbd48704f26c81c2781b956",
  baseURL: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({}); //object, because the returned data will be an object
  /*we want when user enters the value, to store the users value*/
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  /*we want when the user presses Enter, to make sure that the data of the specific city is fetched.
  then we want to store the data of that city in state.
  */
  const WeatherData = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.baseURL}weather?q=${search}&appid=${api.key}`)
        .then(data => data.json())
        .then(city => {
          console.log(city)
          setSearch('')
          setWeather(city)
        })
    }
  }

  const currentDate = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();

    return `${day} ${date} ${month} ${year}`

  }

  return (
    <div className="App">
      <h2>International Weather</h2>
      <div className="wrapper">
        <input type="text" id="search-field" placeholder='Search...' onChange={handleChange} onKeyPress={WeatherData} />

        {(typeof weather.main != "undefined") ? (

          <div className='weather-box'>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <h2> {currentDate(new Date())} </h2>

            <div id="weather">

              <div className="details" id="degrees">{(weather.main.temp - 273.15).toFixed(2)}°C</div>
              <div className="details" id="clouds">{weather.weather[0].main}</div>

            </div>
          </div>

        ) : (" ")}

      </div>
    </div>
  );
}

export default App;
