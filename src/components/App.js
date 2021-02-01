import '../styles/App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const key = '';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/';
    const fullApiUrl = `${baseUrl}weather?q=${query}&units=metric&APPID=${key}`;
    
    const search = async (evt) => {
        if (evt.key === "Enter"){
            const response = await axios.get(fullApiUrl, {})
            setWeather(response.data);
        }
    }
    
    const dateGenerator = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={( typeof weather.main != "undefined" ) ? (( weather.main.temp > 16 ) ? 'app warm' : 'app cold') : 'app'}>
            <main>
                <div className="search-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <input 
                                    type="text" 
                                    className="search-bar" 
                                    placeholder="Search for a place..."
                                    onChange={e => setQuery(e.target.value)}
                                    value={query}
                                    onKeyPress={search}>
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
                {( typeof weather.main != 'undefined' ) ? (
                    <div>
                        <div className="location-box">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-12">
                                        <div className="main-title">{weather.name}, {weather.sys.country}</div>
                                        <div className="date">{ dateGenerator(new Date()) }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="weather-box">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-lg-12">
                                        <div className="weather-box">
                                            <div className="temp mt-5 mb-5">
                                                {Math.round(weather.main.temp)}°
                                            </div>
                                            {weather.main.temp > 20 ? 
                                                <h1 className="temperature-tips">Get ready for a hot day, hydrate yourself!</h1>
                                            : 
                                                <h1 className="temperature-tips">Get ready for a cold day, remember to get your coat!</h1>
                                            }
                                            <div className="weather mt-5 mb-5">
                                                <h2 className="main-title">Sky</h2>
                                                <div className="temperature-tips">
                                                    {weather.weather[0].main}
                                                </div>
                                            </div>
                                            <div className="description mt-5">
                                                <h2 className="main-title">Sky Condition</h2>
                                                <div className="temperature-tips">
                                                    {weather.weather[0].description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    )
}

export default App
