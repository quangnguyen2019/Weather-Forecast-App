import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as TemperatureIcon } from '../images/Icons/temperature.svg';
import { ReactComponent as HumidityIcon } from '../images/Icons/humidity.svg';
import { ReactComponent as MapPositionIcon } from '../images/Icons/map-position.svg';
import { ReactComponent as CaretDownIcon } from '../images/Icons/caret-down-fill.svg';
import { ReactComponent as TrashIcon } from '../images/Icons/trash3.svg';
import { IData, Units } from '../global';

interface IProps {
    dataApp: IData[];
    setDataApp: React.Dispatch<React.SetStateAction<IData[]>>;
}

const CurrentWeather = ({ dataApp, setDataApp }: IProps) => {
    const [dropdowns, setDropdowns] = useState(
        dataApp.map(() => ({ isOpen: false }))
    );

    const curWeatherData = dataApp[0].weatherData.current;
    const today = dataApp[0].weatherData.daily[0];
    const currentHour = new Date(curWeatherData.dt * 1000).getHours();

    const onClickCard = (e: React.MouseEvent<HTMLDivElement>) => {
        const currentWeatherEl =
            document.getElementsByClassName('current-weather')[0];

        // convert currentWeatherEl.children (array-like object) to Array.
        // use indexOf to get index of clicked card
        const index = Array.from(currentWeatherEl.children).indexOf(
            e.currentTarget
        );

        // Change position of clicked card (address) to top
        const tempData = dataApp.slice();
        const locationRepositioned = tempData.splice(index, 1)[0];
        tempData.splice(0, 0, locationRepositioned);
        setDataApp(tempData);
    };

    const onClickDropdownBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Disallow triggering onClick callback on parent element
        e.stopPropagation();

        let indexDropdown: any = e.currentTarget.getAttribute('data-index');
        // convert indexDropdown to number
        indexDropdown *= 1; // "34" * 1 => 34
        setDropdowns([
            ...dropdowns.slice(0, indexDropdown),
            { isOpen: !dropdowns[indexDropdown].isOpen },
            ...dropdowns.slice(indexDropdown + 1),
        ]);
    };

    const onClickRemoveCard = (index: number) => {
        const tempData = dataApp.slice();
        const tempDropdowns = dropdowns.slice();

        tempData.splice(index, 1);
        tempDropdowns.splice(index, 1);

        setDataApp(tempData);
        setDropdowns(tempDropdowns);
    };

    const handleClickOutside = ({ target }: MouseEvent) => {
        const arrButtonDropdowns = Array.from(
            document.querySelectorAll('.button-options')
        );

        let indexDropdown = -1;
        dropdowns.every((obj, index) => {
            if (obj.isOpen) {
                indexDropdown = index;
                return false;
            }
            return true;
        });

        if (
            indexDropdown !== -1 &&
            !arrButtonDropdowns[indexDropdown].contains(target as HTMLElement)
        ) {
            setDropdowns([
                ...dropdowns.slice(0, indexDropdown),
                { isOpen: false },
                ...dropdowns.slice(indexDropdown + 1),
            ]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    // update dropdowns state when dataApp changed
    useEffect(() => {
        if (dataApp.length > dropdowns.length) {
            setDropdowns([...dropdowns, { isOpen: false }]);
        }
    }, [dataApp]);

    return (
        <section className="current-weather">
            <div className="first-card">
                <div className="row gx-0">
                    <p className="address mb-3">
                        <MapPositionIcon
                            width={20}
                            height={20}
                            fill={'#fff'}
                            style={{ marginRight: 8 }}
                        />
                        {dataApp[0].address}
                        <button
                            className={classNames('button-options', {
                                'button-disable': dataApp.length === 1,
                            })}
                            data-index="0"
                            onClick={onClickDropdownBtn}
                            disabled={dataApp.length === 1}
                        >
                            <CaretDownIcon width={10} height={10} fill={'#fff'} />
                            {dropdowns[0].isOpen && (
                                <span
                                    className="button-remove"
                                    onClick={() => onClickRemoveCard(0)}
                                >
                                    <TrashIcon width={15} height={15} />
                                    <span>Remove</span>
                                </span>
                            )}
                        </button>
                    </p>
                    <div className="col-12 current-image">
                        <img
                            src={`http://openweathermap.org/img/wn/${curWeatherData.weather[0].icon}@2x.png`}
                            alt=""
                        />
                    </div>
                    <div className="col-12 current-temperature">
                        <span className="temperature-number">
                            {Math.round(curWeatherData.temp)}
                        </span>
                        <span>
                            &deg;{dataApp[0].unit === Units.C ? 'C' : 'F'}
                        </span>
                    </div>
                    <div className="col-12 current-description">
                        <p>{curWeatherData.weather[0].description}</p>
                        <p>
                            {currentHour < 17
                                ? 'The high will reach ' +
                                  Math.round(today.temp.max)
                                : 'The low will be ' + Math.round(today.temp.min)}
                            &deg;
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="row detail-item gx-5">
                        <div className="col">
                            <TemperatureIcon
                                width={18}
                                height={18}
                                fill={'#fff'}
                            />
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

            {dataApp.slice(1).map((data, index) => {
                const currendData = data.weatherData.current;
                return (
                    <div
                        className="following-card mt-2"
                        key={index}
                        onClick={onClickCard}
                    >
                        <div className="row gx-0 align-items-center">
                            <div className="col">
                                <div className="row detail-item gx-3">
                                    <div className="col">
                                        <TemperatureIcon
                                            width={18}
                                            height={18}
                                            fill={'#fff'}
                                        />
                                        <span> Feels </span>
                                    </div>
                                    <span className="col">
                                        {Math.round(currendData.feels_like)}
                                        &deg;
                                    </span>
                                </div>
                                <div className="row detail-item gx-3 mt-2">
                                    <div className="col">
                                        <HumidityIcon
                                            width={16}
                                            height={16}
                                            fill={'#fff'}
                                        />
                                        <span> Hum </span>
                                    </div>
                                    <span className="col">
                                        {currendData.humidity}%
                                    </span>
                                </div>
                            </div>

                            <div className="col-5">
                                <p className="address address--smaller mb-1">
                                    <MapPositionIcon
                                        width={17}
                                        height={17}
                                        fill={'#fff'}
                                        style={{ marginRight: 6 }}
                                    />
                                    <span title={data.address.split(',')[0]}>
                                        {data.address.split(',')[0]}
                                    </span>
                                    <button
                                        className="button-options"
                                        data-index={index + 1}
                                        onClick={onClickDropdownBtn}
                                    >
                                        <CaretDownIcon
                                            width={10}
                                            height={10}
                                            fill={'#fff'}
                                        />
                                        {dropdowns[index + 1]?.isOpen && (
                                            <span
                                                className="button-remove"
                                                onClick={() =>
                                                    onClickRemoveCard(index + 1)
                                                }
                                            >
                                                <TrashIcon
                                                    width={15}
                                                    height={15}
                                                />
                                                <span>Remove</span>
                                            </span>
                                        )}
                                    </button>
                                </p>
                                <span className="temperature-number-smaller">
                                    {Math.round(currendData.temp)}
                                    &deg;
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default CurrentWeather;
