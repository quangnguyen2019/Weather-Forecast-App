import { ReactComponent as TemperatureIcon } from '../images/Icons/temperature.svg';
import { ReactComponent as HumidityIcon } from '../images/Icons/humidity.svg';
import { ReactComponent as MapPositionIcon } from '../images/Icons/map-position.svg';
import { IData, Units } from '../global';

interface IProps {
    dataApp: IData;
}

const CurrentWeather = ({ dataApp }: IProps) => {
    const curWeatherData = dataApp.weatherData.current;
    const today = dataApp.weatherData.daily[0];
    const currentHour = new Date(curWeatherData.dt).getHours();

    return (
        <section className="current-weather">
            <div className="row gx-0">
                <p className="address mb-2">
                    <MapPositionIcon
                        width={20}
                        height={20}
                        fill={'#fff'}
                        style={{ marginRight: 8 }}
                    />
                    {dataApp.address}
                </p>
                <div className="col-12 current-image">
                    <img
                        src={`http://openweathermap.org/img/wn/${curWeatherData.weather[0].icon}@2x.png`}
                        alt=""
                    />
                </div>
                <div className="col-12 current-temperature">
                    <span className="temperature-number">
                        {Math.round(curWeatherData.temp)}&deg;
                    </span>
                    {/* <span> &deg;{dataApp.unit === Units.C ? 'C' : 'F'} </span> */}
                </div>
                <div className="col-12 current-description">
                    <p>{curWeatherData.weather[0].description}</p>
                    <p>
                        {currentHour < 17
                            ? 'The high will reach ' + Math.round(today.temp.max)
                            : 'The low will be ' + Math.round(today.temp.min)}
                        &deg;
                    </p>
                </div>
            </div>

            <div className="mt-3">
                <div className="row detail-item">
                    <div className="col">
                        <TemperatureIcon width={18} height={18} fill={'#fff'} />
                        <span> Feels </span>
                    </div>
                    <span className="col-auto"> | </span>
                    <span className="col">
                        {Math.round(curWeatherData.feels_like)}&deg;
                    </span>
                </div>
                <div className="row detail-item">
                    <div className="col">
                        <HumidityIcon width={18} height={18} fill={'#fff'} />
                        <span> Hum </span>
                    </div>
                    <span className="col-auto"> | </span>
                    <span className="col">{curWeatherData.humidity}%</span>
                </div>
            </div>
        </section>
    );
};

export default CurrentWeather;
