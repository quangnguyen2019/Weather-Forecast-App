import { MouseEvent } from 'react';

import { ReactComponent as TemperatureIcon } from '../images/Icons/temperature.svg';
import { ReactComponent as HumidityIcon } from '../images/Icons/humidity.svg';
import { ReactComponent as MapPositionIcon } from '../images/Icons/map-position.svg';
import { ReactComponent as XIcon } from '../images/Icons/x.svg';
import { IData } from '../global';

interface IProps {
    dataApp: IData[];
    dropdowns: { isOpen: boolean }[];
    onClickDropdownBtn: (e: MouseEvent<HTMLButtonElement>) => void;
    onClickRemoveCard: (index: number) => void;
    onClickCard: (e: MouseEvent<HTMLDivElement>) => void;
}

const ExtraAddressCard = (props: IProps) => {
    const { dataApp, onClickRemoveCard, onClickCard } = props;

    return (
        <div className="extra-address-card-list row gx-2 gy-2 gy-md-0 gy-xl-2">
            {dataApp.slice(1).map((data, index) => {
                const currendData = data.weatherData.current;
                return (
                    <div
                        className="col-4 col-md-6 col-lg-4 col-xl-12"
                        key={index}
                    >
                        <div
                            className="extra-address-card "
                            key={index}
                            // starting position of the extra address card is 1 => index + 1
                            data-index={index + 1}
                            onClick={onClickCard}
                        >
                            <div className="row gx-0 align-items-center">
                                <div className="col d-none d-xl-block">
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

                                <div className="col col-xl-5 d-flex align-items-center d-md-block">
                                    <p className="address address--smaller mb-md-3 mb-xl-1">
                                        <MapPositionIcon
                                            width={17}
                                            height={17}
                                            fill={'#fff'}
                                        />
                                        <span title={data.address.split(',')[0]}>
                                            {data.address.split(',')[0]}
                                        </span>
                                        <button
                                            className="button-remove d-none d-md-flex"
                                            data-index={index + 1}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onClickRemoveCard(index + 1);
                                            }}
                                        >
                                            <XIcon
                                                width={18}
                                                height={18}
                                                fill={'#fff'}
                                            />
                                        </button>
                                    </p>
                                    <div className="d-flex d-xl-none justify-content-center">
                                        <img
                                            className="extra-card-image"
                                            src={`https://openweathermap.org/img/wn/${currendData.weather[0].icon}@2x.png`}
                                            alt=""
                                        />
                                    </div>
                                    <span className="temperature-number-smaller">
                                        {Math.round(currendData.temp)}
                                        &deg;
                                    </span>

                                    {/* only visible when screen size is below 768px */}
                                    <button
                                        className="button-remove d-md-none"
                                        data-index={index + 1}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClickRemoveCard(index + 1);
                                        }}
                                    >
                                        <XIcon
                                            width={18}
                                            height={18}
                                            fill={'#fff'}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExtraAddressCard;
