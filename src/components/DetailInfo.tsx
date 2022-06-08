import { IData, Units, ColorLevels } from '../global';
import { ReactComponent as HumidityIcon } from '../images/Icons/humidity.svg';
import { ReactComponent as TemperatureIcon } from '../images/Icons/temperature.svg';
import { ReactComponent as WindDirectionIcon } from '../images/Icons/arrow.svg';
import { ReactComponent as VisibilityIcon } from '../images/Icons/visibility.svg';
import { ReactComponent as WindIcon } from '../images/Icons/wind.svg';
import { ReactComponent as PressureIcon } from '../images/Icons/barometer.svg';
import { ReactComponent as UVIcon } from '../images/Icons/uv-index.svg';

interface IProps {
    dataApp: IData;
}

const getUVLevel = (uvi: number) => {
    if (uvi < 3) return { title: 'Low', color: ColorLevels.Green };
    else if (uvi < 6) return { title: 'Moderate', color: ColorLevels.Yellow };
    else if (uvi < 8) return { title: 'High', color: ColorLevels.Orange };
    else if (uvi < 11) return { title: 'Very High', color: ColorLevels.Red };
    else return { title: 'Extreme', color: ColorLevels.Purple };
};

const DetailInfo = ({ dataApp }: IProps) => {
    const curWeatherData = dataApp.weatherData.current;
    const uviLevel = getUVLevel(curWeatherData.uvi);

    return (
        <div className="detail-info mt-xl-4">
            <div className="row gy-3 gx-3">
                <div className="col-4 col-md">
                    <div className="detail-line-item">
                        <VisibilityIcon width={21} height={21} />
                        <div className="item-info">
                            <span className="title">Visibility</span>
                            <span className="value">
                                {curWeatherData.visibility / 1000} km
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-4 col-md">
                    <div className="detail-line-item">
                        <WindIcon width={21} height={21} />
                        <div className="item-info">
                            <span className="title">Wind</span>
                            <span className="value d-flex align-items-center justify-content-center">
                                {dataApp.unit === Units.C
                                    ? Math.round(curWeatherData.wind_speed * 3.6)
                                    : Math.round(curWeatherData.wind_speed)}
                                {dataApp.unit === Units.C ? ' km/h' : ' mph'}

                                <WindDirectionIcon
                                    width={9}
                                    height={9}
                                    fill={'dodgerblue'}
                                    style={{
                                        marginLeft: 5,
                                        transform: `rotate(${curWeatherData.wind_deg}deg)`,
                                    }}
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-4 col-md">
                    <div className="detail-line-item">
                        <PressureIcon width={21} height={21} />
                        <div className="item-info">
                            <span className="title">Pressure</span>
                            <span className="value">
                                {curWeatherData.pressure} hPa
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-md">
                    <div className="detail-line-item">
                        <HumidityIcon width={21} height={21} />
                        <div className="item-info">
                            <span className="title">Humidity</span>
                            <span className="value">
                                {curWeatherData.humidity}%
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-md">
                    <div className="detail-line-item">
                        <TemperatureIcon width={25} height={25} />
                        <div className="item-info">
                            <span className="title">Feels Like</span>
                            <span className="value">
                                {Math.round(curWeatherData.feels_like)}&deg;
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-4 col-md">
                    <div className="detail-line-item">
                        <UVIcon width={25} height={25} />
                        <div className="item-info">
                            <span className="title">UV Index</span>
                            <span className="value uv-index-value">
                                {curWeatherData.uvi}
                                <span
                                    className="color-level"
                                    title={`Level : ${uviLevel.title}`}
                                    style={{ backgroundColor: uviLevel.color }}
                                ></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailInfo;
