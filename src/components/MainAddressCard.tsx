import { MouseEvent } from 'react';
import classNames from 'classnames';

import { ReactComponent as TemperatureIcon } from '../images/Icons/temperature.svg';
import { ReactComponent as HumidityIcon } from '../images/Icons/humidity.svg';
import { ReactComponent as MapPositionIcon } from '../images/Icons/map-position.svg';
import { ReactComponent as XIcon } from '../images/Icons/x.svg';
import { IData, Units } from '../global';

interface IProps {
    dataApp: IData[];
    dropdowns: { isOpen: boolean }[];
    onClickDropdownBtn: (e: MouseEvent<HTMLButtonElement>) => void;
    onClickRemoveCard: (index: number) => void;
}

const MainAddressCard = (props: IProps) => {
    const { dataApp, onClickRemoveCard } = props;
    const curWeatherData = dataApp[0].weatherData.current;
    const today = dataApp[0].weatherData.daily[0];
    const currentHour = new Date(curWeatherData.dt * 1000).getHours();

    return (
        <div className="main-address-card">
            <div className="row gx-0">
                <p className="address mb-4 mb-xl-3">
                    <MapPositionIcon
                        width={20}
                        height={20}
                        fill={'#fff'}
                        style={{ marginRight: 8 }}
                    />
                    <span>{dataApp[0].address}</span>
                    <button
                        className={classNames('button-options', {
                            'button-disable': dataApp.length === 1,
                        })}
                        data-index="0"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickRemoveCard(0);
                        }}
                        disabled={dataApp.length === 1}
                    >
                        <XIcon width={18} height={18} fill={'#fff'} />
                    </button>
                </p>

                <div className="col-2 col-xl-12 current-image">
                    <img
                        src={`http://openweathermap.org/img/wn/${curWeatherData.weather[0].icon}@2x.png`}
                        alt=""
                    />
                </div>

                <div className="col-2 col-md-3 col-xl-12 current-temperature">
                    <span className="temperature-number">
                        {Math.round(curWeatherData.temp)}
                    </span>
                    <span>&deg;{dataApp[0].unit === Units.C ? 'C' : 'F'}</span>
                </div>

                <div className="col col-xl-12 current-description">
                    <p>{curWeatherData.weather[0].description}</p>
                    <p>
                        {currentHour < 17
                            ? 'The high will reach ' + Math.round(today.temp.max)
                            : 'The low will be ' + Math.round(today.temp.min)}
                        &deg;
                    </p>
                </div>
            </div>

            <div className="mt-4 d-none d-xl-block">
                <div className="row detail-item gx-5">
                    <div className="col">
                        <TemperatureIcon width={18} height={18} fill={'#fff'} />
                        <span> Feels </span>
                    </div>
                    <span className="col">
                        {Math.round(curWeatherData.feels_like)}&deg;
                    </span>
                </div>
                <div className="row detail-item gx-5 mt-2">
                    <div className="col">
                        <HumidityIcon width={18} height={18} fill={'#fff'} />
                        <span> Hum </span>
                    </div>
                    <span className="col">{curWeatherData.humidity}%</span>
                </div>
            </div>
        </div>
    );
};

export default MainAddressCard;
