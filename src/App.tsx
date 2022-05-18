import React, { useEffect, useState } from 'react';

import './App.css';

import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import DayForecast from './components/DayForecast';

import { IData, Units } from './commonInterface';

const ps_access_key = 'e783d1497d866cc660e2f1ffa5e7f0fa';
const openweathermap_key = 'a3de72c34d5f784fd455b6a1dac06004';

function App() {
    const [data, setData] = useState<IData>({
        address: '',
        unit: Units.C,
        weatherData: {
            current: {
                dew_point: 0,
                feels_like: 0,
                humidity: 0,
                pressure: 0,
                temp: 0,
                wind_speed: 0,
                wind_deg: 0,
                visibility: 0,
                weather: [{ description: '', icon: '' }],
            },
            daily: [
                {
                    dt: 0,
                    temp: {
                        max: 0,
                        min: 0,
                    },
                    weather: [{ description: '', icon: '' }],
                },
            ],
        },
    });

    const handleChangeUnit = (newUnit: Units) => {
        setData((prevData) => ({
            ...prevData,
            unit: newUnit,
        }));
        getWeatherData(data.address, newUnit);
    };

    const getWeatherData = async (searchValue: string, unit: Units) => {
        let lat = '';
        let lon = '';
        let newAddress = '';

        // Get coordinates from search value
        const urlForwardGeocoding =
            `http://api.positionstack.com/v1/forward` +
            `?access_key=${ps_access_key}&limit=1` +
            `&query=${searchValue}`;

        await fetch(urlForwardGeocoding)
            .then((res) => res.json())
            .then((res) => {
                if (!res.data.length) return;

                const dataSeperated = res.data[0];
                [lat, lon] = [dataSeperated.latitude, dataSeperated.longitude];
                // store address into newAddress
                newAddress = `${dataSeperated.name}, ${dataSeperated.region}`;
            })
            .catch((err) => console.error(err));

        if (lat === '' || lon === '') return;
        // Get weather forecast data from obtained coordinates
        const urlForecastWeather =
            `https://api.openweathermap.org/data/2.5/onecall` +
            `?lat=${lat}&lon=${lon}&exclude=minutely,hourly` +
            `&units=${unit}&appid=${openweathermap_key}`;

        console.log(urlForecastWeather);
        await fetch(urlForecastWeather)
            .then((res) => res.json())
            .then((res) => {
                setData((prevData) => ({
                    ...prevData,
                    address: newAddress,
                    weatherData: res,
                }));
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getWeatherData('Ninh Hoa', data.unit);
    }, []);

    return (
        <div className="App">
            <div className="app-background"></div>
            <div className="container app-container">
                <Header
                    dataApp={data}
                    handleChangeUnit={handleChangeUnit}
                    getWeatherData={getWeatherData}
                />
                <CurrentWeather dataApp={data} />
                <DayForecast dataApp={data} />
            </div>
        </div>
    );
}

export default App;
