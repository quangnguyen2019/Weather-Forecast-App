import { useEffect, useState } from 'react';

import './App.css';

import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import DayForecast from './components/DayForecast';
import AirPollution from './components/AirPollution';
import {
    PS_access_key,
    Openweathermap_key,
    IData,
    Units,
    replaceWhitespace,
} from './global';
import { HashLoader } from 'react-spinners';

function App() {
    const [data, setData] = useState<IData>({
        address: 'Ninh Hoa',
        unit: Units.C,
        weatherData: {
            lat: 0,
            lon: 0,
            current: {
                dt: 0,
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
            hourly: [{ dt: 0, temp: 0, pop: 0 }],
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
        let lat = 0;
        let lon = 0;
        let newAddress = '';

        // Get coordinates from search value
        const urlForwardGeocoding =
            `http://api.positionstack.com/v1/forward` +
            `?access_key=${PS_access_key}&limit=1` +
            `&query=${searchValue}`;

        await fetch(urlForwardGeocoding)
            .then((res) => res.json())
            .then((res) => {
                if (!res.data.length) return;

                const dataSeperated = res.data[0];
                [lat, lon] = [dataSeperated.latitude, dataSeperated.longitude];

                // store address into newAddress
                if (dataSeperated.county) {
                    newAddress = `${dataSeperated.county}, ${dataSeperated.region}, ${dataSeperated.country}`;
                } else {
                    newAddress = `${dataSeperated.region}, ${dataSeperated.country}`;
                }
            })
            .catch((err) => console.error(err));

        if (lat === 0 || lon === 0) return;
        // Get weather forecast data from obtained coordinates
        getWeatherDataFromCoord(lat, lon, unit, newAddress);
    };

    const getWeatherDataFromCoord = async (
        lat: number,
        lon: number,
        unit: Units,
        newAddress: string
    ) => {
        const urlForecastWeather =
            `https://api.openweathermap.org/data/2.5/onecall` +
            `?lat=${lat}&lon=${lon}&exclude=minutely` +
            `&units=${unit}&appid=${Openweathermap_key}`;

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
        getWeatherData(replaceWhitespace(data.address), data.unit);
    }, []);

    console.log('App render');

    return (
        <>
            {data.weatherData.lat === 0 ? (
                <div className="spinner">
                    <HashLoader color={'#5C9AF5'} size={60} />
                </div>
            ) : (
                <div className="App">
                    <div className="app-background"></div>
                    <div className="container app-container">
                        <Header
                            dataApp={data}
                            handleChangeUnit={handleChangeUnit}
                            getWeatherData={getWeatherData}
                            getWeatherDataFromCoord={getWeatherDataFromCoord}
                        />
                        <CurrentWeather dataApp={data} />
                        <DayForecast dataApp={data} />
                        <AirPollution dataApp={data} />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
