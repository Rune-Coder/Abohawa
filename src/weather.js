import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './weather.module.css';

function Weather(props) {
    useEffect(() => {
        document.title = 'Get the precise weather updates around the globe | Abohawa';
    });

    const [weather, setWeather] = useState({});
    const [showDetails, setShowDetails] = useState({});

    useEffect(() =>{

        if(weather.name){
            const temperature = weather.main.temp - 273.15;//convert to celsius from kelvin
            const speed = weather.wind.speed * 3.6;//convert to km/h from m/s
            const feel_temp = weather.main.feels_like - 273.15;//convert to celsius from kelvin
            
            const data = {city: weather.name, temp: temperature.toFixed(2), 
                feels: feel_temp.toFixed(2), humidity: weather.main.humidity, 
                wind: speed.toFixed(2), weather: weather.weather[0].main};
            setShowDetails(data);
        }

    }, [weather]);

    function toSearch(event){
        var keyCode = event ? (event.which ? event.which : event.keyCode) : event.keyCode;
        const keyword = event.target.value;
        if(keyCode === 13 && keyword.trim() !== "")
        {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=ee68008917ecf09b2b94aa11586dd9f9`)
            .then((response) => { 
                setWeather(response.data);   
            }); 
        }
        
        return;
    }

    return(
        <div className={classes.app}>
            <div className={classes.search}>
                <input type= "text" placeholder='Search for Cities' onKeyDown={toSearch}></input>
            </div>
            {showDetails.city && <div className={classes.container}>
                <div className={classes.top}>
                    <div className={classes.location}>
                        <p>{showDetails.city}</p>
                    </div>
                    <div className={classes.temperature}>
                        <h1>{showDetails.temp} °C</h1>
                    </div>
                    <div className={classes.desc}>
                        <p>{showDetails.weather}</p>
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.feels}>
                        <p className={classes.bold}>{showDetails.feels} °C</p>
                        <p>Feels Like</p>
                    </div>
                    <div className={classes.humidity}>
                        <p className={classes.bold}>{showDetails.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                    <div className={classes.wind}>
                        <p className={classes.bold}>{showDetails.wind} KMPH</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Weather;