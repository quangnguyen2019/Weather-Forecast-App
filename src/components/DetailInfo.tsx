import { IData, Units } from '../global';
import { ReactComponent as SunIcon } from '../images/Icons/brightness-high.svg';
import { ReactComponent as MoonIcon } from '../images/Icons/moon-stars.svg';
import { ReactComponent as WindDirectionIcon } from '../images/Icons/arrow.svg';
import { ReactComponent as VisibilityIcon } from '../images/Icons/visibility.svg';
import { ReactComponent as WindIcon } from '../images/Icons/wind.svg';
import { ReactComponent as PressureIcon } from '../images/Icons/barometer.svg';
import { ReactComponent as UVIcon } from '../images/Icons/uv-index.svg';

interface IProps {
    dataApp: IData;
}

const getUVLevel = (uvi: number) => {
    if (uvi < 3) return 'Low';
    else if (uvi < 6) return 'Moderate';
    else if (uvi < 8) return 'High';
    else if (uvi < 11) return 'Very High';
    else return 'Extreme';
};

const DetailInfo = ({ dataApp }: IProps) => {
    const curWeatherData = dataApp.weatherData.current;

    return (
        <div className="detail-info">
            <div className="row">
                <div className="col">
                    <div className="detail-line-item">
                        <SunIcon width={22} height={22} fill={'#e6e604'} />
                        <div className="item-info">
                            <span className="title">Sunrise</span>
                            <span className="value">04:25 AM</span>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="detail-line-item">
                        <MoonIcon width={22} height={22} fill={'#1a6bba'} />
                        <div className="item-info">
                            <span className="title">Sunset</span>
                            <span className="value">04:25 PM</span>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="detail-line-item">
                        <VisibilityIcon width={22} height={22} fill={'#082541'} />
                        <div className="item-info">
                            <span className="title">Visibility</span>
                            <span className="value">
                                {curWeatherData.visibility / 1000} km
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="detail-line-item">
                        <WindIcon width={22} height={22} fill={'#05d75a'} />
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

                <div className="col">
                    <div className="detail-line-item">
                        <PressureIcon width={22} height={22} fill={'#082541'} />
                        <div className="item-info">
                            <span className="title">Pressure</span>
                            <span className="value">
                                {curWeatherData.pressure} hPa
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="detail-line-item">
                        <UVIcon width={22} height={22} fill={'#e6e604'} />
                        <div className="item-info">
                            <span className="title">UV Index</span>
                            <span className="value">{curWeatherData.uvi}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailInfo;
