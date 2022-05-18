import { ReactComponent as WindDirectionIcon } from '../images/Icons/arrow.svg';

import { IData, Units } from '../commonInterface';

interface IProps {
    dataApp: IData;
}

const CurrentWeather = ({ dataApp }: IProps) => {
    const curWeatherData = dataApp.weatherData.current;

    return (
        <section className="current-weather">
            <div className="row gx-0">
                <p className="address mb-4"> {dataApp.address} </p>
                <div className="col-2 col-md-1">
                    <img
                        src={`http://openweathermap.org/img/wn/${curWeatherData.weather[0].icon}@2x.png`}
                        alt=""
                    />
                </div>
                <div className="col-2 col-md-1 current-temperature mx-3">
                    <span className="temperature-number">
                        {Math.round(curWeatherData.temp)}
                    </span>
                    <span> &deg;{dataApp.unit === Units.C ? 'C' : 'F'} </span>
                </div>
                <div className="col-6 current-description">
                    <p>{curWeatherData.weather[0].description}</p>
                    <p>
                        The high will reach{' '}
                        {Math.round(dataApp.weatherData.daily[0].temp.max)}&deg;
                    </p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-2 detail-item">
                    <span>Feels like</span>
                    <span>{curWeatherData.feels_like}&deg;</span>
                </div>
                <div className="col-2 detail-item">
                    <span>Humidity</span>
                    <span>{curWeatherData.humidity}%</span>
                </div>
                <div className="col-2 detail-item">
                    <span>Visibility</span>
                    <span>{curWeatherData.visibility}km</span>
                </div>
                <div className="col-2 detail-item">
                    <span>Wind</span>
                    <span className="d-flex align-items-center">
                        {curWeatherData.wind_speed}km/h
                        <WindDirectionIcon
                            width={11}
                            height={11}
                            style={{
                                marginLeft: 10,
                                transform: `rotate(${curWeatherData.wind_deg}deg)`,
                            }}
                        />
                    </span>
                </div>
                <div className="col-2 detail-item">
                    <span>Pressure</span>
                    <span>{curWeatherData.pressure}mb</span>
                </div>
                <div className="col-2 detail-item">
                    <span>Dew Point</span>
                    <span>{curWeatherData.dew_point}&deg;</span>
                </div>
            </div>
        </section>
    );
};

export default CurrentWeather;
