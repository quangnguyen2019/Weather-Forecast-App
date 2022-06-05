import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

import './App.css';

import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import DayForecast from './components/DayForecast';
import WeatherChart from './components/WeatherChart';
import AirPollution from './components/AirPollution';
import SearchBox from './components/SeachBox';
import DetailInfo from './components/DetailInfo';
import {
    PS_access_key,
    Openweathermap_key,
    IData,
    Units,
    replaceWhitespace,
} from './global';

function App() {
    const [data, setData] = useState<IData[]>([
        {
            address: 'Ninh Hoa',
            unit: Units.C,
            weatherData: {
                lat: 0,
                lon: 0,
                current: {
                    dt: 0,
                    sunrise: 0,
                    sunset: 0,
                    dew_point: 0,
                    uvi: 0,
                    feels_like: 0,
                    humidity: 0,
                    pressure: 0,
                    temp: 0,
                    wind_speed: 0,
                    wind_deg: 0,
                    visibility: 0,
                    weather: [{ description: '', icon: '' }],
                },
                hourly: [
                    { dt: 0, temp: 0, pop: 0, weather: [{ description: '' }] },
                ],
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
        },
    ]);
    const [isCurWeatherShowingLeft, setIsCurWeatherShowingLeft] = useState(false);

    const handleChangeUnit = async (newUnit: Units) => {
        getDataMultipleAddress(data, newUnit);
    };

    // Get data for only 1 address
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
                if (
                    dataSeperated.county &&
                    dataSeperated.county !== dataSeperated.region
                ) {
                    newAddress = `${dataSeperated.county}, ${dataSeperated.region}`;
                } else {
                    newAddress = `${dataSeperated.region}, ${dataSeperated.country}`;
                }
            })
            .catch((err) => console.error(err));

        // Check error when lat === 0 || lon === 0
        if (lat === 0 || lon === 0) return;

        // Check address already exists?
        let isExisted = checkAddressExists(newAddress);
        if (!isExisted) {
            // Get weather forecast data from obtained coordinates
            getWeatherDataFromCoord(lat, lon, unit, newAddress);
        }
    };

    const checkAddressExists = (newAddress: string) => {
        let isExisted = false;

        data.forEach((obj, index) => {
            if (obj.address === newAddress) {
                // location already exists
                isExisted = true;

                const tempData = [
                    obj,
                    ...data.slice(0, index),
                    ...data.slice(index + 1),
                ];
                setData(tempData);
            }
        });

        return isExisted;
    };

    // Get data for only 1 address
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
                // Delete initial value ({ lat: 0, lon: 0, ... })
                // Replace new value
                if (data.length === 1 && data[0].weatherData.lat === 0) {
                    setData([
                        {
                            ...data[0],
                            address: newAddress,
                            weatherData: res,
                        },
                    ]);
                    return;
                }

                setData((prevData) => [
                    {
                        unit: unit,
                        address: newAddress,
                        weatherData: res,
                    },
                    ...prevData,
                ]);

                // Set Local Storage
                localStorage.dataWeather = JSON.stringify([
                    {
                        unit: unit,
                        address: newAddress,
                        weatherData: res,
                    },
                    ...data,
                ]);
            })
            .catch((err) => console.error(err));
    };

    // Get data for multiple addresses
    const getDataMultipleAddress = async (dataArr: IData[], inputUnit: Units) => {
        const createUrlForecast = (lat: number, lon: number, unit: Units) => {
            return (
                `https://api.openweathermap.org/data/2.5/onecall` +
                `?lat=${lat}&lon=${lon}&exclude=minutely` +
                `&units=${unit}&appid=${Openweathermap_key}`
            );
        };

        const responses = await Promise.all(
            dataArr.map((obj) =>
                fetch(
                    createUrlForecast(
                        obj.weatherData.lat,
                        obj.weatherData.lon,
                        inputUnit
                    )
                )
            )
        );

        const newDataByUnit = await Promise.all(
            responses.map((res) => res.json())
        );

        const newDataApp = newDataByUnit.map((obj, index) => ({
            address: dataArr[index].address,
            unit: inputUnit,
            weatherData: obj,
        }));

        setData(newDataApp);

        // Set Local Storage
        localStorage.dataWeather = JSON.stringify(newDataApp);
    };

    useEffect(() => {
        const dataLocal: IData[] = JSON.parse(localStorage.dataWeather);
        dataLocal
            ? getDataMultipleAddress(dataLocal, dataLocal[0].unit)
            : getWeatherData(replaceWhitespace(data[0].address), data[0].unit);

        // Show currentWeather component on left side if screen size is less than 1200px
        window.addEventListener('resize', () => {
            if (window.matchMedia('(max-width: 1199px)').matches) {
                setIsCurWeatherShowingLeft(true);
            } else {
                setIsCurWeatherShowingLeft(false);
            }
        });
    }, []);

    return (
        <>
            {data[0].weatherData.lat === 0 ? (
                <div className="spinner">
                    <HashLoader color={'#5C9AF5'} size={60} />
                </div>
            ) : (
                <div className="App">
                    <div className="container-fluid app-container">
                        <div className="row h-100">
                            <div className="col-12 col-xl-9 left-part py-4 px-5">
                                <Header
                                    dataApp={data[0]}
                                    handleChangeUnit={handleChangeUnit}
                                />

                                {isCurWeatherShowingLeft && (
                                    <div className="row d-xl-none mb-3">
                                        <div className="col">
                                            <CurrentWeather
                                                dataApp={data}
                                                setDataApp={setData}
                                            />
                                        </div>
                                    </div>
                                )}

                                <DetailInfo dataApp={data[0]} />

                                <div className="row my-1">
                                    <div className="col">
                                        <DayForecast dataApp={data[0]} />
                                    </div>
                                </div>

                                <div className="row gx-2">
                                    <div className="col-6">
                                        <WeatherChart dataApp={data[0]} />
                                    </div>
                                    <div className="col-6">
                                        <AirPollution dataApp={data[0]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-0 col-xl-3 right-part py-4 px-4">
                                <SearchBox
                                    dataApp={data[0]}
                                    getWeatherData={getWeatherData}
                                    getWeatherDataFromCoord={
                                        getWeatherDataFromCoord
                                    }
                                    checkAddressExists={checkAddressExists}
                                />

                                {!isCurWeatherShowingLeft && (
                                    <CurrentWeather
                                        dataApp={data}
                                        setDataApp={setData}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
