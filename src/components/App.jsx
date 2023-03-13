import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=303fce593d40233a1c5b358eae120c1b`;

  function searchLocation(event) {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
      setLocation("");
    }
  }

  function handleChange(event) {
    setLocation(event.target.value);
  }

  return (
    <div className="app">
      <div className="input-location">
        <input
          name="location"
          value={location}
          onChange={handleChange}
          placeholder="Enter location"
          onKeyDown={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°c</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name ? (
          <div className="bottom">
            <div className="feels bottom-padding">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°c</p>
              ) : null}
              <p className="bottom-text">Feels like</p>
            </div>
            <div className="humidity bottom-padding">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p className="bottom-text">Humidity</p>
            </div>
            <div className="wind bottom-padding">
              {data.wind ? (
                <p className="bold">{(data.wind.speed * 3.6).toFixed()}km/h</p>
              ) : null}
              <p className="bottom-text">Winds</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
