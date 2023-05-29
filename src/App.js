import hotBg from "./assest/HOTT.jpg";
import coldBg from "./assest/coldd.png"
import Descriptions from "./Components/Descriptions";
import { useEffect, useState } from "react";
import { getWeatherDataFormatted } from "./weatherService";

function App() {

  const [city, setCity] = useState('Paris'); 
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(hotBg)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherDataFormatted(city, units);
      setWeather(data);
      const threSold = units === 'metric' ? '20' : '60';
      if(data.temp<=threSold)
      {
        setBg(coldBg); 
      }
      else
      {
        setBg(hotBg);
      }
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) =>{
    const btn = e.currentTarget;
    const currentUnit = btn.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    btn.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial')
    console.log(currentUnit);
  }

  const enterKeyPressed = (e) =>{
    if(e.keyCode === 13 ){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {   
            weather && (
            <div className="container">
              <div className="section sections_inputs">
                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city name..."></input>
                <button onClick={(e) =>handleUnitsClick(e)}>°F</button>
              </div>
              <div className="section section_temprature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconUrl} alt="weatherIcon"></img>
                  <h3>{weather.description}</h3>
                </div>
                <div className="temprature">
                  <h1>{`${weather.temp.toFixed()} °${units==='metric' ? 'C' : 'F'}`}</h1>
                </div>
              </div>
              {/* bottom description  */}
              <Descriptions weather={weather} units={units}>

              </Descriptions>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
